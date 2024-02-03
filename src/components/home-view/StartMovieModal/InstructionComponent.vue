<template>
  <div class="instruction-container">
    <p class="instruction-text">{{ intructionText }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useModalsStore } from '@/stores/useModalsStore'
import { Step } from './steps/types/stepsTypes'

// STORE
const modalsStore = useModalsStore()

// COMPUTED
const intructionText = computed<string>(() => {
  switch (modalsStore.currentStep) {
    case Step.INSERT_PLAYER_NAMES:
      return 'Introduce el nombre de los actores'
    case Step.SELECT_MOVIE_MODE:
      return 'Selecciona el modo de película'
    default:
      return ''
  }
})
</script>

<style lang="scss" scoped>
.instruction-container {
  @include flex($flex-direction: column);
  margin-top: 20px;

  .instruction-text {
    color: $modal-color;
    font-size: 20px;
    font-weight: bold;
    margin: 10px;
    text-transform: uppercase;
    padding-top: 10px;
  }
}
</style>
