import { APP_NAME_PLACEHOLDER } from '../constants/meta.js';

export function renderString(template, context) {
  let out = template;
  if (Object.prototype.hasOwnProperty.call(context, 'appName')) {
    const re = new RegExp(APP_NAME_PLACEHOLDER.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
    out = out.replace(re, String(context.appName));
  }
  return out;
}

