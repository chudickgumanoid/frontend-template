<template>
  <section class="py-8">
    <n-card>
      <n-result
        status="success"
        title="Template is ready"
        description="Start building from the Home page."
      >
        <template #footer>
          <div class="flex items-center gap-3 justify-center">
            <n-button type="primary" @click="goHome">Go to Home</n-button>
            <span class="text-gray-500">Redirecting in {{ seconds }}s…</span>
          </div>
        </template>
      </n-result>
    </n-card>
  </section>
</template>

<script setup>
import { NCard, NResult, NButton } from 'naive-ui'
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ROUTES } from '@/shared/utils/constants'

const router = useRouter()
const seconds = ref(3)
let timer

function goHome() {
  router.replace(ROUTES.HOME.path)
}

onMounted(() => {
  timer = setInterval(() => {
    if (seconds.value <= 1) {
      clearInterval(timer)
      goHome()
    } else {
      seconds.value -= 1
    }
  }, 1000)
})

onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
})
</script>

<style scoped>
.text-gray-500 { color: #6b7280; }
</style>
