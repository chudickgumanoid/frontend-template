/**
 * Application factory and bootstrap wiring.
 *
 * Responsibilities
 * - Creates the Vue app instance with `App.vue`.
 * - Attaches core providers/plugins:
 *   - i18n (global translations)
 *   - Vue Query (HTTP caching) with a shared `queryClient`
 *   - Pinia (state management)
 *   - Router (navigation)
 *   - @vueuse/head (document head manager)
 *   - `v-maska` directive (input masks)
 * - Registers shared UI components globally via `registerComponents(app)`.
 * - Sets default Day.js locale to Russian (`ru`).
 *
 * Export
 * - `application`: the configured app instance ready to be mounted in `main.js`.
 */
import { queryClient } from "@/shared/api/queryClient";
import { VueQueryPlugin } from "@tanstack/vue-query";
import { createHead } from "@vueuse/head";
import dayjs from "dayjs";
import { vMaska } from "maska";
import { createPinia } from "pinia";
import { createApp } from "vue";
import App from "./App.vue";
import "virtual:svg-icons-register";
import { registerComponents } from "./providers/components/registerComponents";
import i18n from "./providers/i18n";
import router from "./providers/router";
import "./style/main.css";

dayjs.locale("ru");

const app = createApp(App);
const pinia = createPinia();
const head = createHead();

registerComponents(app);

export const application = app
  .use(i18n)
  .use(VueQueryPlugin, { queryClient })
  .use(pinia)
  .use(router)
  .directive("maska", vMaska)
  .use(head);
