/**
 * Словарь чисел от 0 до 1000, для преобразования в текст.
 */
const numbersToWords = {
  0: "ноль",
  1: "один",
  2: "два",
  3: "три",
  4: "четыре",
  5: "пять",
  6: "шесть",
  7: "семь",
  8: "восемь",
  9: "девять",
  10: "десять",
  11: "одиннадцать",
  12: "двенадцать",
  13: "тринадцать",
  14: "четырнадцать",
  15: "пятнадцать",
  16: "шестнадцать",
  17: "семнадцать",
  18: "восемнадцать",
  19: "девятнадцать",
  20: "двадцать",
  30: "тридцать",
  40: "сорок",
  50: "пятьдесят",
  60: "шестьдесят",
  70: "семьдесят",
  80: "восемьдесят",
  90: "девяносто",
  100: "сто",
  200: "двести",
  300: "триста",
  400: "четыреста",
  500: "пятьсот",
  600: "шестьсот",
  700: "семьсот",
  800: "восемьсот",
  900: "девятьсот",
};

/**
 * Массив единичных и множественных форм для различных порядков чисел (миллионы, тысячи, миллиарды).
 * @type {Array<{value: number, singular: string, plural: string, many: string, feminine?: boolean}>}
 */
const orders = [
  { value: 1e9, singular: "миллиард", plural: "миллиарда", many: "миллиардов" },
  { value: 1e6, singular: "миллион", plural: "миллиона", many: "миллионов" },
  {
    value: 1e3,
    singular: "тысяча",
    plural: "тысячи",
    many: "тысяч",
    feminine: true,
  },
];

/**
 * Массив корректировок для разных родов чисел.
 */
const genderAdjustments = {
  masculine: { 1: "один", 2: "два" },
  feminine: { 1: "одна", 2: "две" },
};

/**
 * Получение правильной формы склонения для числительных в зависимости от числа.
 * @param {number} number - Число для склонения.
 * @param {string} singular - Форма единственного числа.
 * @param {string} plural - Форма родительного падежа для чисел, оканчивающихся на 2-4.
 * @param {string} many - Форма множественного числа.
 * @returns {string} - Склоненная форма.
 */
const getDeclension = (number, singular, plural, many) => {
  const mod100 = number % 100;
  const mod10 = number % 10;

  if (mod100 > 10 && mod100 < 20) {
    return many;
  }

  if (mod10 === 1) {
    return singular;
  }

  if (mod10 >= 2 && mod10 <= 4) {
    return plural;
  }

  return many;
};

/**
 * Преобразование целой части числа в текстовое представление.
 * @param {number} n - Число для преобразования.
 * @param {string} [gender] - Род (можно использовать 'masculine' или 'feminine').
 * @returns {string} - Текстовое представление целой части числа.
 */
function numberToWordsInteger(n, gender = "masculine") {
  if (n === 0) return numbersToWords[n];

  let result = "";

  for (const { value, singular, plural, many, feminine } of orders) {
    if (n >= value) {
      const count = Math.floor(n / value);
      const adjustedCount = numberToWordsInteger(
        count,
        feminine ? "feminine" : "masculine"
      );

      result += `${adjustedCount} ${getDeclension(count, singular, plural, many)} `;
      n %= value;
    }
  }

  if (n >= 100) {
    const hundreds = Math.floor(n / 100) * 100;

    result += `${numbersToWords[hundreds]} `;
    n %= 100;
  }

  if (n >= 20) {
    const tens = Math.floor(n / 10) * 10;

    result += `${numbersToWords[tens]} `;
    n %= 10;
  }

  if (n > 0) {
    result += genderAdjustments[gender][n] || numbersToWords[n];
  }

  return result.trim();
}

/**
 * Преобразование дробной части числа в текстовое представление.
 * @param {number} fractionalPart - Дробная часть числа.
 * @returns {string} - Текстовое представление дробной части числа.
 */
function numberToWordsFraction(fractionalPart) {
  const digits = fractionalPart.toString().split("").map(Number);
  let result = "";

  for (const digit of digits) {
    result += `${numbersToWords[digit]} `;
  }

  const declension = getDeclension(fractionalPart, "тиын", "тиына", "тиынов");

  return `${result.trim()} ${declension}`;
}

/**
 * Преобразование числа в текстовое представление с учетом дробной части и параметра отображения "тенге".
 * @param {number|string} n - Число (целое или дробное).
 * @param {boolean} [showTenge] - Параметр для отображения слова "тенге" (по умолчанию true).
 * @returns {string} - Текстовое представление числа с учетом слова "тенге".
 */
export const getPluralNumber = (n, showTenge = false) => {
  if (!n) return "";

  if (typeof n === "string") n = Number.parseFloat(n);

  const [integerPart, fractionalPart] = n.toString().split(".").map(Number);

  let result = numberToWordsInteger(integerPart, "masculine");

  if (fractionalPart !== undefined) {
    const fractionalWords = numberToWordsFraction(fractionalPart);

    result += ` тенге ${fractionalWords}`;
  } else if (showTenge) {
    result += " тенге";
  }

  return result.trim();
};
