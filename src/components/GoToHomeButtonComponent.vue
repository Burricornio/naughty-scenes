<template>
  <div class="go-home-button-container">
    <button @click="goToHome" title="inicio">
      <!-- <span>Ir a inicio</span> -->
      <Icon class="icon" icon="material-symbols:home" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { Icon } from '@iconify/vue'
import { useResetStore } from '@/stores/useResetStore'

// STORE
const { resetGame } = useResetStore()

// ROUTER
const router = useRouter()

// METHODS
function goToHome() {
  resetGame()
  router.push({ name: 'Home' })
}
</script>

<style lang="scss" scoped>
.go-home-button-container {
  @include flex;
  @include round-button;
  position: relative;
}
</style>
