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
