import { phoneMaska } from "./phoneFormatter";

export const requiredRules = (message, attrs = {}) => {
  return {
    required: true,
    message: message || "Обязательный параметр",
    trigger: attrs["trigger"] || ["input", "blur"],
  };
};

export const validateNumber = (min, max, message) => {
  return function (role, value) {
    value = value.toString().length;

    if (value > max) {
      return new Error(message || `Не больше ${max} символов`);
    }

    if (value < min) {
      return new Error(message || `Не меньше ${min} символов`);
    }

    return true;
  };
};

export const validatePhoneNumber = (min, max, message) => {
  return function (role, value) {
    value = phoneMaska(value);

    if (value > max) {
      return new Error(message || `Не больше ${max} символов`);
    }

    if (value < min) {
      return new Error(message || `Не меньше ${min} символов`);
    }

    return true;
  };
};

export const validateStringLength = (min, max, message) => {
  return function (role, value) {
    if (!value) return true;

    if (value.toString().length > max) {
      return new Error(message || `Не больше ${max} символов`);
    }

    if (value.toString().length < min) {
      return new Error(message || `Не меньше ${min} символов`);
    }

    return true;
  };
};

export const validateRequired = (role, value) => {
  if (!value) {
    return new Error(window.$t(`errors.required`));
  }

  return true;
};

export const validateEmail = (role, value) => {
  if (!value) {
    return true;
  }

  if (!/^[^\s@]+@[^\s@]+\.[a-z]{2,6}$/.test(value)) {
    return new Error(`Не верный формат email`);
  }

  return true;
};

export const validateEmailWithoutReq = (role, value) => {
  if (value == null || value === "") return true;

  if (!/^[^\s@]+@[^\s@]+\.[a-z]{2,3}$/.test(value)) {
    return new Error(`Не верный формат email`);
  }

  return true;
};

export const validatePhone = (role, value) => {
  if (!/^8\d{10}$/.test(value)) {
    return new Error(`Не верный формат телефона -> Пример: 87001112233`);
  }

  return true;
};

export const requiredRulesAndValidator = (validator, attrs = {}) => {
  return {
    required: true,

    trigger: attrs["trigger"] || ["input", "blur"],
    validator,
  };
};

const validateArrayValidations = (arrayValidation) => {
  return (role, value) => {
    let result = true;

    for (let i = 0; i < arrayValidation.length; i++) {
      const el = arrayValidation[i];

      if (el == null) {
        return;
      }

      result = el(role, value);

      if (result.message) {
        break;
      }
    }

    if (typeof result == "boolean") {
      return result;
    }

    return new Error(result.message);
  };
};

export const validatorsRules = (validators, attrs = { required: true }) => {
  validators = validators || [];

  return {
    required: attrs["required"],
    trigger: attrs["trigger"] || ["input", "blur"],
    validator: validateArrayValidations([...validators]),
  };
};

export const validateApiErrorsFunc = (errors, key) => {
  const oldValue = "";

  return function (role, value) {
    key = key || role.field?.split(".")?.reverse()[0];

    const error =
      errors.value?.errors || errors._rawValue?.errors || errors?.errors || {};

    if (
      oldValue !== value &&
      errors.value != null &&
      errors.value !== undefined
    ) {
      delete errors.value[key];
    }

    const message = error.message;

    const errorCode = error?.code;

    if (errorCode && errorCode.includes(key) && message) {
      return new Error(message);
    }

    return true;
  };
};
