import { customRef, reactive } from "vue";
import { deepMerge } from "../deepMerge";
import { extractData } from "../exctractData";

/**
 * Создает реактивный объект с учетом динамической вложенности и правил обработки данных.
 * @param {object} targetRules - Правила для извлечения данных.
 * @param {object} [value] - Начальные данные.
 * @returns {object} - Реактивный объект.
 */
export function useDataRefWithRules(targetRules, value) {
  return customRef((track, trigger) => {
    return {
      get() {
        track();

        return reactive(value);
      },
      set(newVal) {
        if (typeof newVal !== "object" || newVal === null) {
          value = newVal; // Просто присваиваем значение, если оно не объект
        } else {
          // Извлекаем данные согласно правилам
          const extractedData = extractData(newVal, targetRules);

          // Обновляем значения в реактивном объекте
          deepMerge(value, extractedData);
        }

        trigger();
      },
    };
  });
}
