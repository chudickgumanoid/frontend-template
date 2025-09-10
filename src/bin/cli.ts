import { generatePackageJson } from '../features/generate.js';
import { log } from '../core/logger.js';

const args = new Map<string, string | boolean>();
for (let i = 2; i < process.argv.length; i++) {
  const a = process.argv[i];
  if (a.startsWith('--')) {
    const [k, v] = a.split('=');
    args.set(k, v ?? true);
  }
}

if (args.has('--help')) {
  console.log(`
frontend-template

  Генерация базового package.json.
  Флаги:
    --name=<string>   имя проекта
    --dir=<path>      целевая директория (по умолчанию .)
    --icons=<bool>    добавить поддержку иконок (true/false)

  Примеры:
    frontend-template --name=my-app --dir=. --icons=true
  `);
  process.exit(0);
}

const name = (args.get('--name') as string) || undefined;
const dir = (args.get('--dir') as string) || undefined;
const iconsRaw = args.get('--icons');
const withIcons = typeof iconsRaw === 'string' ? iconsRaw === 'true' : undefined;

try {
  await generatePackageJson({
    projectName: name,
    dir,
    withIcons
  });
} catch (e: any) {
  log.error(e?.message ?? String(e));
  process.exit(1);
}
