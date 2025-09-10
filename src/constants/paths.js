import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CLI root (project root where this file lives is src/constants)
export const CLI_ROOT = path.resolve(__dirname, '../../');

export const TEMPLATES_ROOT = path.resolve(CLI_ROOT, 'templates');

export function getTemplatePath(templateName = 'base') {
  return path.resolve(TEMPLATES_ROOT, templateName);
}

