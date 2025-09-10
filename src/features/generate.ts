import { askOptions } from './prompts.js';
import { makePackageJson } from '../templates/package-json/index.js';
import { writeJson } from '../core/fs.js';
import { log } from '../core/logger.js';

export type GenerateArgs = Partial<{
  projectName: string;
  dir: string;
  withIcons: boolean;
}>;

export async function generatePackageJson(args: GenerateArgs = {}) {
  const opts = await askOptions(args);
  const pkgObj = makePackageJson(opts);
  const file = await writeJson(opts.dir, 'package.json', pkgObj);
  log.success(`Создан ${file}`);
  return { file, options: opts };
}
