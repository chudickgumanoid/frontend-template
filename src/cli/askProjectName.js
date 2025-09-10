import inquirer from 'inquirer';
import { PROMPTS } from '../constants/meta.js';
import { isKebabCase, nonEmpty } from '../utils/validate.js';

export async function askProjectName(initial) {
  const questions = [
    {
      type: 'input',
      name: 'projectName',
      message: PROMPTS.projectName.message,
      default: initial || undefined,
      validate: (value) => {
        if (!nonEmpty(value)) return 'Project name must not be empty';
        if (!isKebabCase(value)) return 'Must be kebab-case: lowercase letters, digits and hyphens';
        return true;
      }
    }
  ];

  const { projectName } = await inquirer.prompt(questions);
  return projectName;
}

export async function askConfirmOverwrite() {
  const { overwrite } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'overwrite',
      message: 'Target directory is not empty. Overwrite?',
      default: false
    }
  ]);
  return overwrite;
}

export async function askUseI18n(defaultValue = true) {
  const { useI18n } = await inquirer.prompt([
    {
      type: 'list',
      name: 'useI18n',
      message: PROMPTS.useI18n.message,
      choices: PROMPTS.useI18n.choices,
      default: defaultValue ? 0 : 1
    }
  ]);
  return useI18n;
}
