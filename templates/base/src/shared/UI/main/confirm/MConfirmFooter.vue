<template>
  <div class="flex justify-stretch gap-3 w-full">
    <slot
      name="default"
      :onConfirm="onConfirm"
      :onCancel="onCancel"
    >
      <n-button
        @click="onCancel"
        class="flex-1 w-full"
        size="large"
        type="info"
      >
        {{ cancelText }}
      </n-button>

      <n-button
        @click="onConfirm"
        class="flex-1 w-full"
        :type="confirmType"
        size="large"
      >
        {{ confirmText }}
      </n-button>
    </slot>
  </div>
</template>

<script setup>
defineProps({
  confirmText: {
    type: String,
    default: "Accept",
  },
  cancelText: {
    type: String,
    default: "Cancel",
  },
  onConfirm: {
    type: Function,
    required: true,
  },
  onCancel: {
    type: Function,
    required: true,
  },
  confirmType: {
    type: String,
    default: "default",
  },
});
</script>
