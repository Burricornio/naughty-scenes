<template>
  <div class="instruction-container">
    <p class="instruction-text">{{ intructionText }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useModalsStore } from '@/stores/useModalsStore'
import { Step } from './steps/types/stepsTypes'

// STORE
const modalsStore = useModalsStore()

// TEXT
const { t } = useI18n()

const text = {
  enterPlayersName: t('component.instruction_title.enter_player_names'),
  selectGameMode: t('component.instruction_title.select_game_mode'),
  selectScenesNumber: t('component.instruction_title.select_scenes_number')
}

// COMPUTED
const intructionText = computed<string>(() => {
  switch (modalsStore.currentStep) {
    case Step.INSERT_PLAYER_NAMES:
      return text.enterPlayersName
    case Step.SELECT_MOVIE_MODE:
      return text.selectGameMode
    case Step.SELECTE_SCENES_NUMBER:
      return text.selectScenesNumber
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
