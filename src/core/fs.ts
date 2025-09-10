import fs from 'fs-extra';
import { join } from 'pathe';

export const writeJson = async (dir: string, name: string, data: unknown) => {
  await fs.ensureDir(dir);
  const file = join(dir, name);
  await fs.writeJson(file, data, { spaces: 2 });
  return file;
};
