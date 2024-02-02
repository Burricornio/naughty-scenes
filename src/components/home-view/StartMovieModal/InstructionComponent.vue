<template>
  <div class="instruction-container">
    <h1>- PASO {{ modalsStore.currentStep }} -</h1>
    <p>{{ intructionText }}.</p>
  </div>
  <hr />
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
      return 'Introduce el nombre de los participantes'
    case Step.SELECT_MOVIE_MODE:
      return 'Selecciona el modo de película que quieres'
    default:
      return ''
  }
})
</script>

<style lang="scss" scoped>
.instruction-container {
  @include flex($flex-direction: column);
  margin-top: 30px;

  p {
    margin: 10px;
  }
}
</style>
