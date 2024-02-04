<template>
  <section class="director-steps">
    <div class="steps-container">
      <button @click="setStep(DirectorStep.SELECT_SCENES)">
        SELECT YOUR SCENES
      </button>
      <button :disabled="numberOfSelectedScenes === 0" @click="setStep(2)">
        ORDER YOUR SCENES
      </button>
      <button @click="setStep(DirectorStep.CONFIGURE_MOVIE)">
        CONFIGURE MOVIE
      </button>
      <button @click="addNewScene">ADD YOUR OWN SCENE</button>
      <button @click="playMovie">START MOVIE</button>
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
      <div v-if="scenes.length">
        <SelectScenesContainerComponent :scenes="scenes" />
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
import useModal from '@/composables/useModal'
import { EmittedEvent } from '@/events'
import { useCountdownStore } from '@/stores/useCountdownStore'
import BannerComponent from '@/components/BannerComponent.vue'

// PROPS
const props = defineProps<{
  changeStartedMovieFlag: () => void
}>()

// STORE
const sceneStore = useSceneStore()
const { openAddNewSceneModal } = useModal()
const { setCountdownStatus } = useCountdownStore()

// DATA
const step = ref<number>(DirectorStep.SELECT_SCENES)
const sortedScenes = ref<Scene[]>([])

// COMPUTED
const scenes = computed<Scene[]>(() => sceneStore.getScenes)
const numberOfSelectedScenes = computed<number>(
  () => sceneStore.getSelectedScenesLength
)

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
  emit(EmittedEvent.UPDATE_DIRECTOR_MOVIE, sortedScenes.value)
}

// METHODS
function addNewScene() {
  openAddNewSceneModal()
}

function setStep(stepNumber: DirectorStep) {
  step.value = stepNumber
}

function updateMovie(scenes: Scene[]) {
  sortedScenes.value = scenes
}

function playMovie() {
  sceneStore.playMovie(sortedScenes.value)
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
