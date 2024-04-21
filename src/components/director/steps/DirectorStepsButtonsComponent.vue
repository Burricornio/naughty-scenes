<template>
  <div class="steps-buttons-container">
    <button
      v-for="(button, index) in stepButtons"
      :key="index"
      class="step-button"
      :class="{ 'current-step': step === button.stepNumber }"
      @click="button.action"
      :disabled="button.disabled"
    >
      {{ button.text }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useCountdownStore } from '@/stores/useCountdownStore'
import { useDirectorStore } from '@/stores/useDirector'
import { Scene } from '@/stores/useScene/types'
import { useSceneStore } from '@/stores/useScene'
import { EmittedEvent } from '@/events'
import { DirectorStep } from '@/views/DirectorView/types/directorViewTypes'

interface StepButton {
  stepNumber: DirectorStep
  text: string
  action: () => void
  disabled: boolean
}

// PROPS
const props = defineProps<{
  changeStartedMovieFlag: () => void
}>()

// STORE
const sceneStore = useSceneStore()
const directorStore = useDirectorStore()
const { setCountdownStatus } = useCountdownStore()

// TEXTS
const { t } = useI18n()
const text = {
  selectScenes: t('component.director-steps.select_scenes'),
  orderScenes: t('component.director-steps.order_scenes'),
  configureMovie: t('component.director-steps.configure_movie'),
  playMovie: t('component.director-steps.play_movie')
}

// DATA
const selectedScenes = computed<Scene[]>(() => sceneStore.getSelectedScenes)

// COMPUTED
const step = computed(() => directorStore.getDirectorStep)
const numberOfSelectedScenes = computed<number>(
  () => sceneStore.getSelectedScenesLength
)
const stepButtons = computed<StepButton[]>(() => [
  {
    stepNumber: DirectorStep.SELECT_SCENES,
    text: text.selectScenes,
    action: () => directorStore.setDirectorStep(DirectorStep.SELECT_SCENES),
    disabled: false
  },
  {
    stepNumber: DirectorStep.ORDER_SCENES,
    text: text.orderScenes,
    action: () => directorStore.setDirectorStep(DirectorStep.ORDER_SCENES),
    disabled: numberOfSelectedScenes.value === 0
  },
  {
    stepNumber: DirectorStep.CONFIGURE_MOVIE,
    text: text.configureMovie,
    action: () => directorStore.setDirectorStep(DirectorStep.CONFIGURE_MOVIE),
    disabled: numberOfSelectedScenes.value === 0
  },
  {
    stepNumber: DirectorStep.START_MOVIE,
    text: text.playMovie,
    action: () => playMovie(),
    disabled: numberOfSelectedScenes.value === 0
  }
])

// EMITS
const emit = defineEmits([EmittedEvent.UPDATE_DIRECTOR_MOVIE])

function setDirectorMovie() {
  emit(EmittedEvent.UPDATE_DIRECTOR_MOVIE, selectedScenes.value)
}

// METHODS
function playMovie() {
  directorStore.setDirectorStep(DirectorStep.SELECT_SCENES)
  sceneStore.playMovie(selectedScenes.value)
  sceneStore.unselectAllScenes()
  setDirectorMovie()
  props.changeStartedMovieFlag()
  setCountdownStatus(true)
}
</script>

<style lang="scss" scoped>
.steps-buttons-container {
  @include flex($justify-content: space-between);
  background-color: $black;
  width: 100%;
  border-radius: 4px;

  .step-button {
    margin: 10px 40px;
    color: $director-color;
    background-color: $white;
    border-color: $director-color;

    &:hover {
      background-color: $director-color;
      color: $white;
    }

    &:disabled {
      @include borders($width: 2px, $color: $black);
      color: $disabled-text;
      background-color: $disabled-color;
    }

    &.current-step {
      background-color: $director-color;
      color: $white;
      cursor: initial;
      border-color: $director-color;
    }
  }
}
</style>
