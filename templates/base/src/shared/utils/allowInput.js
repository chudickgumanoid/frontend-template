export const onlyNumbers = (value) => {
  return !value || /^\d+$/.test(value);
};

export const onlyNumbersWithlength = (length) => {
  return function (value) {
    if (value.length > length) return false;

    return !value || /^\d+$/.test(value);
  };
};

export function validateNumberInput(value) {
  return /^[-+]?\d*(?:\.\d*)?$/.test(value);
}
