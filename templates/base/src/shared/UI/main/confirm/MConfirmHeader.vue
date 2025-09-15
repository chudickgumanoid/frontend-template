<template>
  <div class="flex items-center gap-2">
    <slot name="icon" />
    <slot>{{ title }}</slot>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: "Подтверждение",
  },
});
</script>
