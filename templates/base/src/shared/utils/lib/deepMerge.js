export function deepMerge(target, source) {
  const stack = [{ target, source }];

  while (stack.length > 0) {
    const { target, source } = stack.pop();

    for (const key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        if (
          typeof source[key] === "object" &&
          source[key] !== null &&
          typeof target[key] === "object" &&
          target[key] !== null
        ) {
          stack.push({ target: target[key], source: source[key] });
        } else {
          target[key] = source[key];
        }
      }
    }
  }

  return target;
}
