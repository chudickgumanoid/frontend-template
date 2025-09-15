<template>
  <div
    class="flex flex-col justify-center items-center h-full min-h-screen relative overflow-hidden"
  >
    <main class="bg-white">
      <div class="bg-white !py-8 !px-6 rounded-2xl shadow-card !min-w-[368px]">
        <div class="flex justify-center items-center w-full">
          <div>Auth Layout</div>
        </div>

        <router-view />
      </div>
    </main>
  </div>
</template>

<script setup></script>

<style scoped></style>
