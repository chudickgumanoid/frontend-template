/**
 * Извлекает данные из исходного объекта в соответствии с правилами, поддерживая вложенные структуры.
 * Если для ключа не указаны правила, сохраняет исходное значение.
 *
 * @param {object} source - Исходный объект, из которого извлекаются данные.
 * @param {object} rules - Правила для извлечения данных. Ключи — это поля исходного объекта, значения — пути к данным или вложенные правила.
 * @param {string} [parentPath] - Путь к текущему объекту в формате строки для логирования ошибок.
 * @returns {object} Результирующий объект, содержащий извлеченные данные.
 */
export function extractData(
  source,
  rules,
  parentPath = "",
  modificator = null
) {
  const result = {};
  const stack = [{ source, rules, result, parentPath }];

  while (stack.length > 0) {
    const { source, rules, result, parentPath } = stack.pop();

    for (const [key, rule] of Object.entries(rules)) {
      const currentPath = parentPath ? `${parentPath}.${key}` : key;

      if (typeof rule === "string") {
        // Обрабатываем простые строки (поля)
        if (source[rule] === undefined) {
          console.error(
            `Поле ${rule} не найдено в объекте по пути "${currentPath}"`
          );
        } else {
          let value = source[rule];

          if (modificator && typeof modificator === "function") {
            value = modificator(value);
          }

          result[key] = value;
        }
      } else if (typeof rule === "object" && rule !== null) {
        // Обрабатываем вложенные объекты
        if (rule.path) {
          // Разбиваем путь на части, если есть точечная нотация
          const pathParts = rule.path.split(".");
          let nestedSource = source;

          // Проходим по каждой части пути, чтобы найти вложенный объект
          for (const part of pathParts) {
            nestedSource = nestedSource ? nestedSource[part] : undefined;

            if (nestedSource === undefined) {
              console.error(
                `Путь ${rule.path} не найден в объекте по пути "${currentPath}"`
              );
              break;
            }
          }

          if (nestedSource !== undefined && nestedSource !== null) {
            result[key] = {};
            stack.push({
              source: nestedSource,
              rules: rule.children,
              result: result[key],
              parentPath: currentPath,
            });
          }
        }
      }
    }
  }

  return result;
}
