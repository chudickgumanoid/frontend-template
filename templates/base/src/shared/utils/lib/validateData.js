/**
 * Проверяет объект на наличие значений `null` или `undefined` и выводит ошибки в консоль.
 *
 * @param {object} obj - Объект, который нужно проверить на наличие значений `null` или `undefined`.
 * @param {string} [parentPath] - Путь к текущему объекту в формате строк, используемый для сообщения об ошибке.
 */
export function checkForNullValues(obj) {
  const stack = [{ obj, parentPath: "" }];

  while (stack.length > 0) {
    const { obj, parentPath } = stack.pop();

    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const currentPath = parentPath ? `${parentPath}.${key}` : key;
        const value = obj[key];

        if (value === null || typeof value === "undefined") {
          console.error(
            `Поле "${currentPath}" имеет значение null или undefined`
          );
        }

        // Если значение - объект, добавляем его в стек для дальнейшей проверки
        if (typeof value === "object" && value !== null) {
          stack.push({ obj: value, parentPath: currentPath });
        }
      }
    }
  }
}
