<template>
  <div class="director-view">
    <HeaderViewComponent title="ACTOR MODE" />
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
    </div>
    <!-- STEP 1 -->
    <div v-if="step === DirectorStep.SELECT_SCENES">
      <p>Selecciona las escenas que quieras rodar</p>
      <span>{{ numberOfSelectedScenes }}</span>
      <!-- <SelectScenesNumberInputComponent
        :scenesNumber="numberOfScenes"
        @change-scenes-number-length="selectRandomScenes"
      /> -->
      <div v-if="directorScenes.length">
        <SelectScenesContainerComponent
          :directorScenes="directorScenes"
          :unselectSceneIds="unselectSceneIds"
          @update-director-movie="updateMovie"
        />
      </div>
    </div>
    <!-- STEP 2 -->
    <OrderCurrentDirectorMovieAccordion
      v-if="step === DirectorStep.ORDER_SCENES"
      @unselect-scenes="onUnselectScenes"
    />
    <!-- STEP 3 -->
    <div v-if="step === DirectorStep.CONFIGURE_MOVIE">
      A configurar pelicula
    </div>
    <AddNewSceneModal
      @increase-selected-scenes-length="onIncreaseSelectedSecensLength"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed, ref, watch } from 'vue'
import { DirectorStep } from '@/views/DirectorView/types/directorViewTypes'
import AddNewSceneModal from '@/components/AddNewSceneModal.vue'
import SelectScenesContainerComponent from '@/components/SelectScenesContainer.vue'
import OrderCurrentDirectorMovieAccordion from '@/components/OrderCurrentDirectorMovieAccordion.vue'
// import SelectScenesNumberInputComponent from '@/components/SelectScenesNumberInputComponent.vue'
import {
  DirectorScene,
  useDirectorSceneStore
} from '@/stores/useDirectorSceneStore'
import { useSceneStore } from '@/stores/useSceneStore'
import useModal from '@/composables/useModal'
import HeaderViewComponent from '@/components/HeaderViewComponent.vue'

// STORE
const directorSceneStore = useDirectorSceneStore()
const sceneStore = useSceneStore()
const { openAddNewSceneModal } = useModal()

// DATA
const step = ref<number>(DirectorStep.SELECT_SCENES)
const numberOfSelectedScenes = ref<number>(0)
const unselectSceneIds = ref<number[]>([])

// COMPUTED
const directorScenes = computed<DirectorScene[]>(
  () => directorSceneStore.getDirectorScenes
)

// WATCH
watch(
  () => step.value,
  (value) => {
    if (value !== DirectorStep.SELECT_SCENES) {
      unselectSceneIds.value = []
    }
  }
)

// HOOKS
onMounted(() => {
  selectRandomScenes(sceneStore.getDefaultScenesNumberLength)
})

// METHODS
function selectRandomScenes(numberOfScenes: number): void {
  sceneStore.selectRandomScenes(numberOfScenes)
}

function updateMovie(movie: DirectorScene[]) {
  const onlySelectedScenes = movie.filter(
    (scene: DirectorScene) => scene.selected
  )
  directorSceneStore.updateCurrentMovie(onlySelectedScenes)
  numberOfSelectedScenes.value = movie.filter(
    (scene: DirectorScene) => scene.selected
  ).length
}

function addNewScene() {
  openAddNewSceneModal()
}

function setStep(stepNumber: DirectorStep) {
  step.value = stepNumber
}

function onUnselectScenes(ids: number[]) {
  ids.forEach((id: number) => unselectSceneIds.value.push(id))
  numberOfSelectedScenes.value = numberOfSelectedScenes.value - ids.length
}

function onIncreaseSelectedSecensLength() {
  numberOfSelectedScenes.value += 1
}
</script>

<style lang="scss" scoped>
.director-view {
  @include flex($flex-direction: column);
  width: 1500px;
  margin-bottom: 20px;

  .steps-container {
    @include flex;
    width: 100%;
    background: $white;
    padding: 10px;
    margin-bottom: 10px;
  }
}
</style>
