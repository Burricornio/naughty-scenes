<template>
  <button class="go-home-button-container" @click="goToHome">
    <span>Ir a inicio</span>
    <Icon class="icon" icon="material-symbols:home" />
  </button>
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
  padding: 10px;
  margin-left: 20px;

  .icon {
    margin-left: 4px;
    font-size: 25px;
  }
}
</style>
