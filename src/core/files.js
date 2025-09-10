import fs from 'fs-extra';
import path from 'node:path';
import { renderString } from './render.js';

export async function pathExists(p) {
  return fs.pathExists(p);
}

export async function ensureEmptyDir(dir) {
  await fs.ensureDir(dir);
  const files = await fs.readdir(dir);
  return files.length === 0;
}

export async function isDirEmpty(dir) {
  try {
    const files = await fs.readdir(dir);
    return files.length === 0;
  } catch {
    return true;
  }
}

export async function emptyDir(dir) {
  await fs.emptyDir(dir);
}

export async function copyDirectory(src, dest) {
  await fs.copy(src, dest);
}

export async function copyTemplateWithTransforms(srcDir, destDir, ctx) {
  await fs.ensureDir(destDir);
  const entries = await fs.readdir(srcDir, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(srcDir, entry.name);
    // Special transform: turn package.json.tpl into package.json with placeholder replacement
    const destName = entry.name === 'package.json.tpl' ? 'package.json' : entry.name;
    const destPath = path.join(destDir, destName);

    if (entry.isDirectory()) {
      await copyTemplateWithTransforms(srcPath, destPath, ctx);
    } else if (entry.isFile()) {
      if (entry.name === 'package.json.tpl') {
        const content = await fs.readFile(srcPath, 'utf8');
        const rendered = renderString(content, { appName: ctx.appName });
        await fs.writeFile(destPath, rendered, 'utf8');
      } else {
        await fs.copy(srcPath, destPath);
      }
    }
  }
}

