const object = {};

Object.entries(import.meta.globEager("@/features//UI/icons/*.vue")).forEach(
  ([path, component]) => {
    const name = path
      .split("/")
      .pop()
      .replace(/\.\w+$/, "");

    object[name] = component;
  }
);

console.log(object);

export default { ...object };
