/**
 * App-wide i18n provider.
 *
 * - Loads message catalogs from `shared/i18n/messages`.
 * - Sets `locale` from `localStorage[LOCAL_STORAGE.lang]`, falls back to `ru`.
 * - Exposes `$t` globally for quick translations.
 *
 * Usage
 * - Mount the returned i18n in the Vue app provider.
 * - Switch language at runtime: `i18n.global.locale.value = 'en'`.
 */
import { MESSAGES } from "@/shared/i18n/messages";
import { LOCAL_STORAGE } from "@/shared/utils/constants";
import { createI18n } from "vue-i18n";

const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem(LOCAL_STORAGE.lang) || "en",
  fallbackLocale: "en",
  messages: MESSAGES,
});

window.$t = i18n.global.t.bind(i18n.global);

export default i18n;
