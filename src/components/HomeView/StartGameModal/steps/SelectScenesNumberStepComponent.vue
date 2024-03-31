<template>
  <section class="select-scenes-number-container">
    <SelectScenesNumberInputComponent
      class="select-input"
      :scenesNumber="numberOfScenes"
      @change-scenes-number-length="selectRandomScenes"
    />
    <button :disabled="disabledBtn" @click="startGame">{{ text.begin }}</button>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useSceneStore } from '@/stores/useScene'
import { useGameStore } from '@/stores/useGame'
import SelectScenesNumberInputComponent from '@/components/SelectScenesNumberInputComponent.vue'
import { useI18n } from 'vue-i18n'
import { useCountdownStore } from '@/stores/useCountdownStore'
import router from '@/router'

const initialScenesNumber = 3

// STORE
const sceneStore = useSceneStore()
const countdownStore = useCountdownStore()
const gameStore = useGameStore()

// DATA
const numberOfScenes = ref(initialScenesNumber)
const selectedSceneLength = ref(initialScenesNumber)

// TEXT
const { t } = useI18n()

const text = {
  begin: t('button.begin')
}

// COMPUTED
const disabledBtn = computed(() => {
  return (
    Boolean(!selectedSceneLength.value) ||
    selectedSceneLength.value > sceneStore.getDefaultScenesNumberLength
  )
})

// METHODS
function selectRandomScenes(selectedScenesNumber: number) {
  selectedSceneLength.value = selectedScenesNumber
}

function startGame() {
  sceneStore.setActorModeScenesNumber(selectedSceneLength.value)
  countdownStore.setCountdownStatus(true)
  router.push({ name: gameStore.getGameModeName })
}
</script>

<style lang="scss" scoped>
.select-scenes-number-container {
  @include flex($flex-direction: column);

  .select-input {
    width: 100%;
    margin-top: 20px;
  }

  button {
    align-self: flex-end;
  }
}
</style>
