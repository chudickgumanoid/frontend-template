export function isKebabCase(str) {
  if (!str || typeof str !== 'string') return false;
  const re = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  return re.test(str);
}

export function nonEmpty(str) {
  return Boolean(str && String(str).trim().length > 0);
}

