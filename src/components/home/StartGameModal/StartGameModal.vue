<template>
  <ModalComponent :open="open" @close-modal="closeStartGameModal">
    <InstructionTitleComponent />
    <EnterPlayersNameStepComponent
      v-if="modalsStore.currentStep === Step.INSERT_PLAYER_NAMES"
    />
    <ChooseGameModeStepComponent
      v-if="modalsStore.currentStep === Step.SELECT_MOVIE_MODE"
    />
    <SelectScenesNumberStepComponent
      v-if="modalsStore.currentStep === Step.SELECTE_SCENES_NUMBER"
    />
  </ModalComponent>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import useModal from '@/composables/useModal'
import { Step } from '@/components/home/StartGameModal/steps/types/stepsTypes'
import { useResetStore } from '@/stores/useResetStore'
import { useModalsStore } from '@/stores/useModalsStore'
import InstructionTitleComponent from '@/components/home/StartGameModal/InstructionTitleComponent.vue'
import ModalComponent from '@/components/ModalComponent.vue'
import EnterPlayersNameStepComponent from '@/components/home/StartGameModal/steps/EnterPlayersNameStepComponent.vue'
import ChooseGameModeStepComponent from '@/components/home/StartGameModal/steps/ChooseGameModeStepComponent.vue'
import SelectScenesNumberStepComponent from '@/components/home/StartGameModal/steps/SelectScenesNumberStepComponent.vue'

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

function closeStartGameModal() {
  resetGame()
  closeModal()
}
</script>
@/components/home/StartGameModal/steps/types/stepsTypes
