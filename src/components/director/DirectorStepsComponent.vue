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

      <div v-if="allScenes.length">
        <SelectScenesContainerComponent :scenes="allScenes" />
      </div>
    </div>
    <!-- STEP 2 -->
    <OrderCurrentDirectorMovieAccordion
      v-if="step === DirectorStep.ORDER_SCENES"
      :key="orderDirectorMovieKey"
      @update-director-movie="updateMovie"
      @reload-component="onReloadComponent"
    />
    <!-- STEP 3 -->
    <div v-if="step === DirectorStep.CONFIGURE_MOVIE">
      <DirectorSetUpComponent />
    </div>
  </section>
  <BannerComponent />
  <AddNewSceneModal />
</template>

<script setup lang="ts">
import { onMounted, computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useCountdownStore } from '@/stores/useCountdownStore'
import { Scene } from '@/stores/useScene/types'
import { useSceneStore } from '@/stores/useScene'
import { EmittedEvent } from '@/events'
import { DirectorStep } from '@/views/DirectorView/types/directorViewTypes'
import AddNewSceneModal from '@/components/AddNewSceneModal.vue'
import SelectScenesContainerComponent from '@/components/SelectScenesContainer.vue'
import OrderCurrentDirectorMovieAccordion from '@/components/OrderCurrentDirectorMovieAccordion.vue'
import DirectorSetUpComponent from '@/components/director/DirectorSetUpComponent.vue'
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

// TEXTS
const { t } = useI18n()
const text = {
  selectScenes: t('component.director-steps.select_scenes'),
  orderScenes: t('component.director-steps.order_scenes'),
  configureMovie: t('component.director-steps.configure_movie'),
  playMovie: t('component.director-steps.play_movie')
}

// DATA
const step = ref<number>(DirectorStep.SELECT_SCENES)
const selectedScenes = computed<Scene[]>(() => sceneStore.getSelectedScenes)
const orderDirectorMovieKey = ref<number>(0)

// COMPUTED
const allScenes = computed<Scene[]>(() => sceneStore.getScenes)
const numberOfSelectedScenes = computed<number>(
  () => sceneStore.getSelectedScenesLength
)
const stepButtons = computed<StepButton[]>(() => [
  {
    stepNumber: DirectorStep.SELECT_SCENES,
    text: text.selectScenes,
    action: () => setStep(DirectorStep.SELECT_SCENES),
    disabled: false
  },
  {
    stepNumber: DirectorStep.ORDER_SCENES,
    text: text.orderScenes,
    action: () => setStep(DirectorStep.ORDER_SCENES),
    disabled: numberOfSelectedScenes.value === 0
  },
  {
    stepNumber: DirectorStep.CONFIGURE_MOVIE,
    text: text.configureMovie,
    action: () => setStep(DirectorStep.CONFIGURE_MOVIE),
    disabled: numberOfSelectedScenes.value === 0
  },
  {
    stepNumber: DirectorStep.START_MOVIE,
    text: text.playMovie,
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

function onReloadComponent() {
  orderDirectorMovieKey.value += 1
}
</script>

<style lang="scss" scoped>
.director-steps {
  @include flex($flex-direction: column, $justify-content: flex-start);
  @include borders($width: 10px, $color: $white);
  width: 100%;
  background-color: $white;
  flex: 1;
  box-sizing: border-box;

  .steps-container {
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
