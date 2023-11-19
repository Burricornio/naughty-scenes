<template>
  <div>
    <p v-if="count > 0">Cuenta atrás: {{ count }}</p>
    <p v-else>¡Tiempo terminado!</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useCountdownStore } from '@/stores/useCountdownStore'

// STORE
const countdownStore = useCountdownStore()

const count = ref(3)

// WATCH
watch(
  () => count.value,
  () => {
    if (count.value === 0) {
      countdownStore.setCountdownStatus(false)
    }
  }
)

onMounted(() => {
  const timer = setInterval(() => {
    if (count.value > 0) {
      count.value--
    } else {
      clearInterval(timer)
    }
  }, 1000)
})
</script>
