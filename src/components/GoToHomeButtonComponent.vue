<template>
  <div class="go-home-button-container">
    <button class="go-home-button" @click="goToHome" title="inicio">
      <Icon class="icon" icon="material-symbols:home" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useResetStore } from '@/stores/useResetStore'
import { Icon } from '@iconify/vue'

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
