import prompts from 'prompts';
import { OptionsSchema, type Options } from './config.js';

export async function askOptions(partial?: Partial<Options>): Promise<Options> {
  const answers = await prompts([
    {
      type: prev => (partial?.projectName ? null : 'text'),
      name: 'projectName',
      message: 'Имя проекта:',
      initial: 'my-app'
    },
    {
      type: prev => (partial?.dir ? null : 'text'),
      name: 'dir',
      message: 'Каталог для генерации:',
      initial: '.'
    },
    {
      type: prev => (partial?.withIcons !== undefined ? null : 'toggle'),
      name: 'withIcons',
      message: 'Добавить поддержку иконок?',
      initial: true,
      active: 'да',
      inactive: 'нет'
    }
  ], {
    onCancel: () => { throw new Error('Отменено пользователем'); }
  });

  const merged = { ...partial, ...answers };
  return OptionsSchema.parse(merged);
}
