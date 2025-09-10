import { queryClient } from "@/shared/api/queryClient";
import { VueQueryPlugin } from "@tanstack/vue-query";
import { createHead } from "@vueuse/head";
import dayjs from "dayjs";
import { vMaska } from "maska";
import { createPinia } from "pinia";
import "virtual:svg-icons-register";
import { createApp } from "vue";
import App from "./App.vue";
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

