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
import { usePageTitle } from "@/shared/hooks/usePageTitle";
import kk from "date-fns/locale/kk";
import { createLocale, dateRuRU, ruRU } from "naive-ui";
import { computed, markRaw, ref, watchEffect } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";
import AppLayoutAuth from "./AppLayoutAuth.vue";
import AppLayoutClient from "./AppLayoutClient.vue";
import { ObserverNotification, ObserverLoader } from "@/shared/UI/observer";

const layout = ref();
const route = useRoute();
const { locale } = useI18n();

const datekzKZ = { name: "kk-KZ", locale: kk };

usePageTitle();

const kzKZ = createLocale(
  {
    name: "kk-KZ",
    global: {
      undo: "Алдыңғы әрекетін болдырмау",
      redo: "Қайтару",
      confirm: "Растау",
    },
    Popconfirm: {
      positiveText: "Растау",
      negativeText: "Болдырмау",
    },
    Cascader: {
      placeholder: "Таңдау",
      loading: "Жүктелуде",
      loadingRequiredMessage: (label) =>
        `${label} аталған деттерді таңдау алдында жүктеу қажет`,
    },
    Time: {
      dateFormat: "dd-MM-yyyy",
      dateTimeFormat: "dd-MM-yyyy HH:mm:ss",
    },
    DatePicker: {
      yearFormat: "yyyy",
      monthFormat: "MMM",
      dayFormat: "eeeeee",
      clear: "Тазалау",
      now: "Қазір",
      confirm: "Растау",
      selectTime: "Сағатты таңдау",
      selectDate: "Күнді таңдау",
      datePlaceholder: "Күнді таңдау",
      datetimePlaceholder: "Күн және уақытты таңдау",
      monthPlaceholder: "Айды таңдау",
      yearPlaceholder: "Жылды таңдау",
      startDatePlaceholder: "Басталу күні",
      endDatePlaceholder: "Аяқталу күні",
      startDatetimePlaceholder: "Басталу уақыты",
      endDatetimePlaceholder: "Аяқталу уақыты",
      monthBeforeYear: true,
      firstDayOfWeek: 1,
      today: "Бүгін",
    },
    DataTable: {
      checkTableAll: "Барлықты таңдау",
      uncheckTableAll: "Барлықты бас тарту",
      confirm: "Растау",
      clear: "Тазалау",
    },
    Transfer: {
      sourceTitle: "Қайси",
      targetTitle: "Неше",
    },
    Empty: {
      description: "Деректер жоқ",
    },
    Select: {
      placeholder: "Таңдау",
    },
    TimePicker: {
      placeholder: "Уақытты таңдау",
      positiveText: "OK",
      negativeText: "Болдырмау",
      now: "Қазір",
    },
    Pagination: {
      goto: "Бару",
      selectionSuffix: "бет",
    },
    DynamicTags: {
      add: "Қосу",
    },
    Log: {
      loading: "Жүктелуде",
    },
    Input: {
      placeholder: "Кірістіру",
    },
    InputNumber: {
      placeholder: "Кірістіру",
    },
    DynamicInput: {
      create: "Жасау",
    },
    ThemeEditor: {
      title: "Тақырып редакторы",
      clearAllVars: "Барлық өрістерді тазалау",
      clearSearch: "Іздеу тазалау",
      filterCompName: "Компонент аты бойынша сүзу",
      filterVarName: "Өрісте аты бойынша сүзу",
      import: "Импорттау",
      export: "Экспорттау",
      restore: "Қалпына келтіру",
    },
  },
  ruRU
);

const localeComp = computed(() => {
  if (locale.value === "kz") {
    return {
      code: "kk",
      dateFormat: datekzKZ,
      locale: kzKZ,
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
