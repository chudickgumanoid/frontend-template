import { NEllipsis, NTag } from "naive-ui";
import { h } from "vue";

export const renderLabel = (option) => {
  return h(NEllipsis, option.label);
};

export const STORES_COLOR_MAP = {
  active: "success",
  pending_activation: "info",
  moderate: "default",
  pending_payment: "default",
  deactivated: "error",
};

export const PRIZE_COLOR_MAP = {
  active: "success",
  pending_activation: "info",
  moderate: "default",
  pending_payment: "default",
  deactivated: "error",
};

export const WINNERS_COLOR_MAP = {
  true: "success",
  false: "info",
};

export const RAFFLES_COLOR_MAP = {
  active: "success",
  moderation: "info",
  finished: "default",
  declined: "error",
  draft: "warning",
};

export const BONUS_COLOR_MAP = {
  active: "success",
  moderation: "info",
  unactive: "default",
  finished: "default",
  declined: "error",
  draft: "warning",
};

/**
 * @param {string} status - Текущий статус (например, "active")
 * @param {Function} translate - Функция перевода статуса (например, RAFFLES_STATUS)
 */
export const renderTag = (status, translate, customMap = {}) => {
  const type = customMap[status] || "default";

  return h(
    NTag,
    { type, bordered: false, strong: true },
    { default: () => translate(status) }
  );
};
