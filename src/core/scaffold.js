import path from 'node:path';
import process from 'node:process';
import fs from 'fs-extra';
import { getTemplatePath } from '../constants/paths.js';
import { spinner, printInfo, printSuccess } from '../ui/print.js';
import { UI } from '../constants/meta.js';
import { askProjectName, askConfirmOverwrite } from '../cli/askProjectName.js';
import { isDirEmpty, emptyDir, copyTemplateWithTransforms } from './files.js';

export default async function scaffold({ initialName, force = false } = {}) {
  const projectName = await askProjectName(initialName);
  const targetDir = path.resolve(process.cwd(), projectName);

  // Prepare target directory
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
    }
  } else {
    await fs.ensureDir(targetDir);
  }

  // Step 1: Create dirs (mostly prepared above)
  const createSpinner = spinner(UI.steps.createDirs).start();
  try {
    await fs.ensureDir(targetDir);
    createSpinner.succeed(UI.steps.createDirs);
  } catch (e) {
    createSpinner.fail(UI.steps.createDirs);
    throw e;
  }

  // Step 2: Generate files
  const genSpinner = spinner(UI.steps.generateFiles).start();
  try {
    const templatePath = getTemplatePath('base');
    await copyTemplateWithTransforms(templatePath, targetDir, { appName: projectName });
    genSpinner.succeed(UI.steps.generateFiles);
  } catch (e) {
    genSpinner.fail(UI.steps.generateFiles);
    throw e;
  }

  // Step 3: Done
  spinner(UI.steps.done).succeed(UI.steps.done);

  // Final instructions
  printSuccess('\nProject created successfully!');
  printInfo(`\nNext steps:\n`);
  printInfo(`  cd ${projectName}`);
  printInfo(`  pnpm i    # or npm i / yarn`);
  printInfo(`  pnpm dev  # start Vite`);
}
