<template>
  <div class="inline-flex items-center gap-2">
    <n-select
      @update:value="onChange"
      size="small"
      :value="model"
      :options="options"
      style="width: 110px"
    />
  </div>
</template>

<script setup>
import { LOCAL_STORAGE } from "@/shared/utils/constants";
import { NSelect } from "naive-ui";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const { locale } = useI18n();

const options = [
  { label: "English", value: "en" },
  { label: "Русский", value: "ru" },
];

const model = computed(() => locale.value);

function onChange(val) {
  locale.value = val;
  localStorage.setItem(LOCAL_STORAGE.lang, val);
}
</script>

<style scoped></style>
