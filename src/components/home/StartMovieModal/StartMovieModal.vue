<template>
  <ModalComponent :open="open" @close-modal="closeStartMovieModal">
    <InstructionComponent />
    <StepOneComponent
      v-if="modalsStore.currentStep === Step.INSERT_PLAYER_NAMES"
    />
  </ModalComponent>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import useModal from '@/composables/useModal'
import { Step } from '@/components/home/StartMovieModal/steps/types/stepsTypes'
import { useResetStore } from '@/stores/useResetstore'
import { useModalsStore } from '@/stores/useModalsStore'
import InstructionComponent from '@/components/home/StartMovieModal/InstructionComponent.vue'
import ModalComponent from '@/components/ModalComponent.vue'
import StepOneComponent from '@/components/home/StartMovieModal/steps/StepOneComponent.vue'

// STORE
const resetStore = useResetStore()
const modalsStore = useModalsStore()

const { open, closeModal } = useModal()

// HOOKS
onMounted(() =>
  modalsStore.setStartMovieModalCurrentStep(Step.INSERT_PLAYER_NAMES)
)

function closeStartMovieModal() {
  resetStore.resetState()
  closeModal()
}
</script>
