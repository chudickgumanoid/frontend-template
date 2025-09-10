export const APP_NAME_PLACEHOLDER = '__APP_NAME__';

export const UI = {
  bannerTitle: 'chdck',
  bannerSubtitle: 'Vite + Vue 3 frontend template',
  steps: {
    createDirs: 'Creating directories',
    generateFiles: 'Generating files',
    applyOptions: 'Applying options',
    done: 'Done'
  },
  colors: {
    info: 'cyan',
    success: 'green',
    error: 'red'
  }
};

export const PROMPTS = {
  projectName: {
    message: 'Enter project name (kebab-case):'
  },
  overwriteConfirm: {
    message: 'Target directory is not empty. Overwrite?'
  },
  useI18n: {
    message: 'Use i18n?',
    choices: [
      { name: 'Yes', value: true },
      { name: 'No', value: false }
    ]
  }
};

export const README = {
  usagePnpm: 'pnpm dlx create-chdck-template',
  usageNpx: 'npx create-chdck-template@latest'
};
