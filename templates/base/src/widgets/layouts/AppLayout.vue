<template>
  <m-async-provider>
    <n-config-provider
      :theme-overrides="themeConfig"
      :date-locale="localeComp.dateFormat"
      :locale="localeComp.locale"
    >
      <n-loading-bar-provider>
        <n-notification-provider>
          <n-dialog-provider>
            <n-message-provider>
              <ObserverLoader />

              <ObserverNotification />

              <component :is="layout">
                <router-view />
              </component>
            </n-message-provider>
          </n-dialog-provider>
        </n-notification-provider>
      </n-loading-bar-provider>
    </n-config-provider>
  </m-async-provider>
</template>

<script setup>
import { themeConfig } from "@/app/providers/theme/themeConfig";
import { ObserverLoader, ObserverNotification } from "@/shared/UI/observer";
import { dateEnUS, dateRuRU, enUS, ruRU } from "naive-ui";
import { computed, markRaw, ref, watchEffect } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";
import AppLayoutAuth from "./AppLayoutAuth.vue";
import AppLayoutClient from "./AppLayoutClient.vue";

const layout = ref();
const route = useRoute();
const { locale } = useI18n();

const localeComp = computed(() => {
  if (locale.value === "en") {
    return {
      code: "en",
      dateFormat: dateEnUS,
      locale: enUS,
    };
  }

  return {
    code: "ru",
    dateFormat: dateRuRU,
    locale: ruRU,
  };
});

watchEffect(async () => {
  try {
    const layouts = [
      {
        name: "AppLayoutClient",
        layout: AppLayoutClient,
      },
      {
        name: "AppLayoutAuth",
        layout: AppLayoutAuth,
      },
    ];
    const metaLayout = route.meta.layout;

    const component = layouts.find((e) => metaLayout === e.name);

    if (component === undefined) {
      throw "component undefined";
    }

    layout.value = markRaw(component.layout || AppLayoutClient);
  } catch {
    layout.value = markRaw(AppLayoutClient);
  }
});
</script>
