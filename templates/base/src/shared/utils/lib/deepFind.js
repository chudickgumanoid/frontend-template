export function deepFind(obj, path, defaultReturn = undefined) {
  if (!obj || !path) return defaultReturn;

  path = path || "";
  const paths = path.split(".");
  let current = obj;
  let i;

  for (i = 0; i < paths.length; ++i) {
    const path = paths[i];

    if (path.includes("[")) {
      let index = path.replace(/.+\[/g, "").replace("]", "");

      index = Number(index);

      const normalPath = path.replace(/\[.+\]/, "");
      const newCurrent = current[normalPath][index];

      if (newCurrent === undefined) {
        return defaultReturn;
      } else {
        current = newCurrent;
      }

      continue;
    }

    if (current[paths[i]] === undefined) {
      return defaultReturn;
    } else {
      current = current[paths[i]];
    }
  }

  return current;
}

window.deepFind = deepFind;
