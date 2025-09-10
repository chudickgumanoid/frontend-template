import type { Options } from '../../features/config.js';

export function makePackageJson(opts: Options) {
  const deps: Record<string, string> = {};
  if (opts.withIcons) {
    // пример: сразу добавим условную либу для иконок
    deps['@iconify/vue'] = '^4.1.2';
  }

  return {
    name: opts.projectName,
    version: '0.1.0',
    private: true,
    type: 'module',
    scripts: {
      dev: 'vite',
      build: 'vite build',
      preview: 'vite preview'
    },
    dependencies: {
      vue: '^3.5.0',
      ...deps
    },
    devDependencies: {
      vite: '^5.4.0',
      typescript: '^5.5.4'
    }
  };
}
