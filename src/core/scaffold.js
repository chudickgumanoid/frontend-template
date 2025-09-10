import path from 'node:path';
import process from 'node:process';
import fs from 'fs-extra';
import { getTemplatePath } from '../constants/paths.js';
import { spinner, printFinalInstructions, printError } from '../ui/print.js';
import { UI } from '../constants/meta.js';
import { askProjectName, askConfirmOverwrite, askUseI18n } from '../cli/askProjectName.js';
import { isDirEmpty, emptyDir, copyTemplateWithTransforms } from './files.js';

export default async function scaffold({ initialName, force = false } = {}) {
  let cleanupOnAbort = false;
  let targetDir = null;
  const cleanupAndExit = async () => {
    try {
      if (cleanupOnAbort && targetDir) {
        await fs.remove(targetDir);
      }
    } catch {}
    try {
      process.off('SIGINT', onSigint);
      process.off('SIGTERM', onSigterm);
    } catch {}
    printError('\nAborted by user. Cleanup completed.');
    process.exit(0);
  };
  const onSigint = () => { cleanupAndExit(); };
  const onSigterm = () => { cleanupAndExit(); };

  // Register early so Ctrl+C at prompts exits cleanly
  process.once('SIGINT', onSigint);
  process.once('SIGTERM', onSigterm);

  const projectName = await askProjectName(initialName);
  const useI18n = await askUseI18n(true);
  targetDir = path.resolve(process.cwd(), projectName);

  const exists = await fs.pathExists(targetDir);
  if (exists) {
    const empty = await isDirEmpty(targetDir);
    if (!empty) {
      if (!force) {
        const confirm = await askConfirmOverwrite();
        if (!confirm) {
          throw new Error('Operation cancelled by user.');
        }
      }
      await emptyDir(targetDir);
      cleanupOnAbort = true; // we prepared a staging dir, safe to remove on abort
    }
  } else {
    await fs.ensureDir(targetDir);
    cleanupOnAbort = true; // created by us, safe to remove on abort
  }

  // Register signal handlers once the target dir is staged
  process.once('SIGINT', onSigint);
  process.once('SIGTERM', onSigterm);

  const createSpinner = spinner(UI.steps.createDirs).start();
  try {
    await fs.ensureDir(targetDir);
    createSpinner.succeed(UI.steps.createDirs);
  } catch (e) {
    createSpinner.fail(UI.steps.createDirs);
    throw e;
  }

  const genSpinner = spinner(UI.steps.generateFiles).start();
  try {
    const templatePath = getTemplatePath('base');
    await copyTemplateWithTransforms(templatePath, targetDir, { appName: projectName });
    genSpinner.succeed(UI.steps.generateFiles);
  } catch (e) {
    genSpinner.fail(UI.steps.generateFiles);
    throw e;
  }

  const optsSpinner = spinner(UI.steps.applyOptions).start();
  try {
    if (!useI18n) {
      await fs.remove(path.join(targetDir, 'src/app/providers/i18n'));
      await fs.remove(path.join(targetDir, 'src/shared/i18n'));
      await fs.remove(path.join(targetDir, 'src/widgets/lang'));
      const pkgPath = path.join(targetDir, 'package.json');
      const pkgRaw = await fs.readFile(pkgPath, 'utf8');
      const pkg = JSON.parse(pkgRaw);
      if (pkg.dependencies && pkg.dependencies['vue-i18n']) {
        delete pkg.dependencies['vue-i18n'];
      }
      await fs.writeFile(pkgPath, JSON.stringify(pkg, null, 2) + '\n', 'utf8');

      const appIndexPath = path.join(targetDir, 'src/app/index.js');
      if (await fs.pathExists(appIndexPath)) {
        let appIndex = await fs.readFile(appIndexPath, 'utf8');
        appIndex = appIndex.replace(/^[\t ]*import\s+i18n\s+from\s+['\"]\.\/providers\/i18n(?:[^'\"]*)?['\"];?[\t ]*\r?\n/m, '');
        appIndex = appIndex.replace(/^\s*\.use\(\s*i18n\s*\)\s*\r?\n/m, '');
        appIndex = appIndex.replace(/\.use\(\s*i18n\s*\)/g, '');
        await fs.writeFile(appIndexPath, appIndex, 'utf8');
      }
    }
    optsSpinner.succeed(UI.steps.applyOptions);
  } catch (e) {
    optsSpinner.fail(UI.steps.applyOptions);
    throw e;
  }

  spinner(UI.steps.done).succeed(UI.steps.done);
  printFinalInstructions(projectName);

  // Cleanup signal handlers on success
  try {
    process.off('SIGINT', onSigint);
    process.off('SIGTERM', onSigterm);
  } catch {}
}
