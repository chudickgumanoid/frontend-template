<template>
  <div class="flex flex-col min-h-screen relative overflow-hidden">
    <div class="container">
      <header class="flex justify-end py-3">
        <LangSwitcher />
      </header>
      <main class="flex-1 overflow-auto">
        <h1 class="text-2xl font-bold">Client Layout</h1>
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import LangSwitcher from '@/widgets/lang/LangSwitcher.vue'
</script>

<style scoped>
.container {
  max-width: 1080px;
  margin: 0 auto;
}
</style>
