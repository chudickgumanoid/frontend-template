<template>
  <svg
    aria-hidden="true"
    :width="size"
    :height="size"
  >
    <use :href="`#icon-${name}`" />
  </svg>
</template>

<script setup>
defineProps({
  name: { type: String, required: true },
  size: { type: [String, Number], default: "24px" },
});
</script>
