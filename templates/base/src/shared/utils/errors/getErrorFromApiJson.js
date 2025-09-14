import { deepFind } from "../lib/deepFind";

export const translateApi = (message) => {
  const objectTranslate = {};

  return objectTranslate[message] || message;
};

export const getErrorFromApiJson = (
  e,
  customMessage = "Неизвестный тип ошибки"
) => {
  if (typeof e == "string") {
    return e;
  }

  const error = deepFind(e, "response.data.error");

  if (typeof error == "object") {
    if (error.errors) return translateApi(Object.values(error.errors)[0]);

    if (!error.message) return translateApi(Object.values(error)[0]);

    return translateApi(error.message);
  }

  // eslint-disable-next-line valid-typeof
  if (typeof error == "array") {
    return translateApi(error[0]);
  }

  if (typeof error == "string") {
    return translateApi(error);
  }

  return customMessage;
};

export const getError = (e, customMessage = "Неизвестный тип ошибки") => {
  try {
    if (typeof e == "string") {
      return e;
    }

    const error = deepFind(e, "response.data");

    if (error.errors.message) {
      return error.errors.message;
    }

    return customMessage;
  } catch {
    return "Неизвестный тип ошибки";
  }
};

export const getErrorFromApiJsonOnlyObject = (e) => {
  const error = deepFind(e, "response.data.errors");

  if (typeof error == "object") {
    return error;
  }

  // eslint-disable-next-line valid-typeof
  if (typeof error == "array") {
    return error;
  }

  return {};
};
