<template>
  <section class="director-steps">
    <div class="steps-container">
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
    <!-- STEP 1 -->
    <div
      class="selected-scenes-info-bar"
      v-if="step === DirectorStep.SELECT_SCENES"
    >
      <div class="info-text">
        <p>Selecciona las escenas que quieras rodar</p>
        <span class="selected-number">{{ numberOfSelectedScenes }}</span>
      </div>

      <!-- <SelectScenesNumberInputComponent
        :scenesNumber="numberOfScenes"
        @change-scenes-number-length="selectRandomScenes"
      /> -->
      <div v-if="allScenes.length">
        <SelectScenesContainerComponent :scenes="allScenes" />
      </div>
    </div>
    <!-- STEP 2 -->
    <OrderCurrentDirectorMovieAccordion
      v-if="step === DirectorStep.ORDER_SCENES"
      @update-director-movie="updateMovie"
    />
    <!-- STEP 3 -->
    <div v-if="step === DirectorStep.CONFIGURE_MOVIE">
      A configurar pelicula
    </div>
  </section>
  <BannerComponent />
  <AddNewSceneModal />
</template>

<script setup lang="ts">
import { onMounted, computed, ref } from 'vue'
import { DirectorStep } from '@/views/DirectorView/types/directorViewTypes'
import AddNewSceneModal from '@/components/AddNewSceneModal.vue'
import SelectScenesContainerComponent from '@/components/SelectScenesContainer.vue'
import OrderCurrentDirectorMovieAccordion from '@/components/OrderCurrentDirectorMovieAccordion.vue'
import { Scene, useSceneStore } from '@/stores/useSceneStore'
import { EmittedEvent } from '@/events'
import { useCountdownStore } from '@/stores/useCountdownStore'
import BannerComponent from '@/components/BannerComponent.vue'

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
const { setCountdownStatus } = useCountdownStore()

// DATA
const step = ref<number>(DirectorStep.SELECT_SCENES)
const selectedScenes = computed<Scene[]>(() => sceneStore.getSelectedScenes)

// COMPUTED
const allScenes = computed<Scene[]>(() => sceneStore.getScenes)
const numberOfSelectedScenes = computed<number>(
  () => sceneStore.getSelectedScenesLength
)
const stepButtons = computed<StepButton[]>(() => [
  {
    stepNumber: DirectorStep.SELECT_SCENES,
    text: 'SELECT YOUR SCENES',
    action: () => setStep(DirectorStep.SELECT_SCENES),
    disabled: false
  },
  {
    stepNumber: DirectorStep.ORDER_SCENES,
    text: 'ORDER YOUR SCENES',
    action: () => setStep(DirectorStep.ORDER_SCENES),
    disabled: numberOfSelectedScenes.value === 0
  },
  {
    stepNumber: DirectorStep.CONFIGURE_MOVIE,
    text: 'CONFIGURE MOVIE',
    action: () => setStep(DirectorStep.CONFIGURE_MOVIE),
    disabled: numberOfSelectedScenes.value === 0
  },
  {
    stepNumber: DirectorStep.START_MOVIE,
    text: 'PLAY MOVIE',
    action: () => playMovie(),
    disabled: numberOfSelectedScenes.value === 0
  }
])

// HOOKS
onMounted(() => {
  sceneStore.selectScenes({
    numberOfScenes: sceneStore.getDefaultScenesNumberLength,
    shuffle: false
  })
})

// EMITS
const emit = defineEmits([EmittedEvent.UPDATE_DIRECTOR_MOVIE])

function setDirectorMovie() {
  emit(EmittedEvent.UPDATE_DIRECTOR_MOVIE, selectedScenes.value)
}

// METHODS
function setStep(stepNumber: DirectorStep) {
  step.value = stepNumber
}

function updateMovie(scenes: Scene[]) {
  sceneStore.updateScenesOrder(scenes)
}

function playMovie() {
  sceneStore.playMovie(selectedScenes.value)
  sceneStore.unselectAllScenes()
  setDirectorMovie()
  props.changeStartedMovieFlag()
  setCountdownStatus(true)
}
</script>

<style lang="scss" scoped>
.director-steps {
  @include flex($flex-direction: column);
  width: 100%;
  flex: 1;

  .steps-container {
    @include flex($justify-content: space-between);

    .step-button {
      margin: 10px 40px;

      &:disabled {
        @include borders($width: 2px);
        color: $white;
      }

      &.current-step {
        background-color: $white;
        color: $main-color;
        cursor: initial;
      }
    }
  }

  .selected-scenes-info-bar {
    background-color: $white;
    width: 100%;
    flex: 1;
    .info-text {
      @include flex;
      color: $main-color;
      padding: 20px;

      p {
        color: $main-color;
      }

      .selected-number {
        margin-left: 8px;
      }
    }
  }
}
</style>
