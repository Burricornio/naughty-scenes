<template>
  <ModalComponent :open="open" @close-modal="closeStartMovieModal">
    <InstructionComponent />
    <StepOneComponent
      v-if="modalsStore.currentStep === Step.INSERT_PLAYER_NAMES"
    />
    <StepTwoComponent
      v-if="modalsStore.currentStep === Step.SELECT_MOVIE_MODE"
    />
  </ModalComponent>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import useModal from '@/composables/useModal'
import { Step } from '@/components/home-view/StartMovieModal/steps/types/stepsTypes'
import { useResetStore } from '@/stores/useResetStore'
import { useModalsStore } from '@/stores/useModalsStore'
import InstructionComponent from '@/components/home-view/StartMovieModal/InstructionComponent.vue'
import ModalComponent from '@/components/ModalComponent.vue'
import StepOneComponent from '@/components/home-view/StartMovieModal/steps/StepOneComponent.vue'
import StepTwoComponent from '@/components/home-view/StartMovieModal/steps/StepTwoComponent.vue'

// STORE
const { resetGame } = useResetStore()
const modalsStore = useModalsStore()

const { open, closeModal } = useModal()

// HOOKS
onMounted(() =>
  modalsStore.setStartMovieModalCurrentStep(Step.INSERT_PLAYER_NAMES)
)

onUnmounted(() => {
  if (open.value) {
    closeModal()
  }
})

function closeStartMovieModal() {
  resetGame()
  closeModal()
}
</script>
