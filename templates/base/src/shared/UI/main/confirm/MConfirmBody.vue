<template>
  <div class="pt-1 pb-2">
    <slot>{{ text }}</slot>
  </div>
</template>

<script setup>
defineProps({
  text: {
    type: String,
    default: "",
  },
});
</script>
