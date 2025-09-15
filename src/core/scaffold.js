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

      // 1) Clean Vite config: drop i18n manual chunk and any accidental vue-i18n alias
      const viteConfigPath = path.join(targetDir, 'vite.config.js');
      if (await fs.pathExists(viteConfigPath)) {
        let viteCfg = await fs.readFile(viteConfigPath, 'utf8');
        // Remove manualChunks entry for i18n to avoid creating an empty chunk
        viteCfg = viteCfg.replace(/^[\t ]*i18n:\s*\[['\"]vue-i18n['\"]\],?\s*\r?\n/m, '');
        // Remove any alias mapping for 'vue-i18n' if present
        viteCfg = viteCfg.replace(/^[\t ]*['\"]vue-i18n['\"]:\s*fileURLToPath\(new URL\([^)]*\)\),?\s*\r?\n/m, '');
        await fs.writeFile(viteConfigPath, viteCfg, 'utf8');
      }

      // 2) Remove LangSwitcher import and usage from AppLayoutClient.vue
      const appLayoutClientPath = path.join(targetDir, 'src/widgets/layouts/AppLayoutClient.vue');
      if (await fs.pathExists(appLayoutClientPath)) {
        let layoutClient = await fs.readFile(appLayoutClientPath, 'utf8');
        layoutClient = layoutClient
          .replace(/^\s*<LangSwitcher\s*\/?>\s*\r?\n/m, '')
          .replace(/^\s*import\s+LangSwitcher\s+from\s+['\"]@\/widgets\/lang\/LangSwitcher\.vue['\"];?\s*\r?\n/m, '');
        await fs.writeFile(appLayoutClientPath, layoutClient, 'utf8');
      }

      // 3) Strip i18n import/usage from HomePage.vue and inline title
      const homePagePath = path.join(targetDir, 'src/pages/home/ui/HomePage.vue');
      if (await fs.pathExists(homePagePath)) {
        let homePage = await fs.readFile(homePagePath, 'utf8');
        homePage = homePage
          .replace(/\{\{\s*t\((['"])home\.title\1\)\s*\}\}/g, 'Home')
          .replace(/^\s*import\s*\{\s*useI18n\s*\}\s*from\s*['\"]vue-i18n['\"];?\s*\r?\n/m, '')
          .replace(/^\s*const\s*\{\s*t\s*\}\s*=\s*useI18n\(\)\s*;?\s*\r?\n/m, '');
        await fs.writeFile(homePagePath, homePage, 'utf8');
      }

      // 4) Strip i18n from AppLayout.vue: remove i18n props and computed
      const appLayoutPath = path.join(targetDir, 'src/widgets/layouts/AppLayout.vue');
      if (await fs.pathExists(appLayoutPath)) {
        let appLayout = await fs.readFile(appLayoutPath, 'utf8');
        appLayout = appLayout
          // remove i18n usage
          .replace(/^\s*import\s*\{\s*useI18n\s*\}\s*from\s*['\"]vue-i18n['\"];?\s*\r?\n/m, '')
          .replace(/^\s*const\s*\{\s*locale\s*\}\s*=\s*useI18n\(\)\s*;?\s*\r?\n/m, '')
          // remove computed localeComp block entirely
          .replace(/const\s+localeComp\s*=\s*computed\(\(\)\s*=>\s*\{[\s\S]*?\}\);\s*\r?\n/m, '')
          // drop date-locale and locale props from template
          .replace(/^\s*:date-locale=.*\r?\n/m, '')
          .replace(/^\s*:locale=.*\r?\n/m, '')
          // drop naive-ui locale imports
          .replace(/^\s*import\s*\{\s*dateEnUS\s*,\s*dateRuRU\s*,\s*enUS\s*,\s*ruRU\s*\}\s*from\s*['\"]naive-ui['\"];?\s*\r?\n/m, '')
          // remove computed from Vue import list if present (keep others)
          .replace(/(import\s*\{[^}]*?)\bcomputed\s*,?\s*/m, '$1');
        await fs.writeFile(appLayoutPath, appLayout, 'utf8');
      }

      // 5) Strip i18n from MConfirm.vue (replace translations with static text)
      const mConfirmPath = path.join(targetDir, 'src/shared/UI/main/confirm/MConfirm.vue');
      if (await fs.pathExists(mConfirmPath)) {
        let mConfirm = await fs.readFile(mConfirmPath, 'utf8');
        mConfirm = mConfirm
          .replace(/\{\{\s*t\((['"])cancel\1\)\s*\}\}/g, 'Cancel')
          .replace(/\{\{\s*t\((['"])submit\1\)\s*\}\}/g, 'Submit')
          .replace(/^\s*import\s*\{\s*useI18n\s*\}\s*from\s*['\"]vue-i18n['\"];?\s*\r?\n/m, '')
          .replace(/^\s*const\s*\{\s*t\s*\}\s*=\s*useI18n\(\)\s*;?\s*\r?\n/m, '');
        await fs.writeFile(mConfirmPath, mConfirm, 'utf8');
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
