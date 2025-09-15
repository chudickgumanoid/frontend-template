<template>
  <n-modal
    v-model:show="isShow"
    @close="handleCancel"
    preset="dialog"
    :show-icon="false"
    class="max-w-[500px]"
  >
    <template #header>
      <slot name="header">
        <div class="flex items-center gap-2">
          <m-text
            variant="h1"
            class="!text-primary !text-center"
          >
            {{ props.title }}
          </m-text>
        </div>
      </slot>
    </template>

    <template #default>
      <slot name="body">
        <p>{{ props.text }}</p>
      </slot>
    </template>

    <template #action>
      <slot
        name="footer"
        :onConfirm="handleConfirm"
        :onCancel="handleCancel"
      >
        <div class="flex justify-stretch gap-3 w-full">
          <n-button
            @click="onCancel"
            class="flex-1 w-full"
            size="large"
            color="#666768"
          >
            {{ t("cancel") }}
          </n-button>

          <n-button
            @click="handleConfirm"
            class="flex-1 w-full"
            type="error"
            size="large"
          >
            {{ t("submit") }}
          </n-button>
        </div>
      </slot>
    </template>
  </n-modal>
</template>

<script setup>
import { ref } from "vue";
import { useI18n } from "vue-i18n";

const props = defineProps({
  title: {
    type: String,
    default: "Confirmation",
  },
  text: {
    type: String,
    default: "Are you sure?",
  },
  formRef: Object,
});

const { t } = useI18n();

const isShow = ref(false);
let resolvePromise = null;

const open = () => {
  isShow.value = true;

  return new Promise((resolve) => {
    resolvePromise = resolve;
  });
};

const handleConfirm = async () => {
  if (props.formRef) {
    props.formRef.validate((errors) => {
      if (!errors) {
        isShow.value = false;
        resolvePromise?.(true);
      }
    });
  } else {
    isShow.value = false;
    resolvePromise?.(true);
  }
};

const handleCancel = () => {
  isShow.value = false;
  resolvePromise?.(false);
};

defineExpose({
  open,
});
</script>
