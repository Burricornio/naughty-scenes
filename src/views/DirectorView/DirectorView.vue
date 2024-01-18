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
      <div v-if="scenes.length">
        <SelectScenesContainerComponent :scenes="scenes" />
      </div>
    </div>
    <!-- STEP 2 -->
    <OrderCurrentDirectorMovieAccordion
      v-if="step === DirectorStep.ORDER_SCENES"
    />
    <!-- STEP 3 -->
    <div v-if="step === DirectorStep.CONFIGURE_MOVIE">
      A configurar pelicula
    </div>
    <AddNewSceneModal />
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed, ref } from 'vue'
import { DirectorStep } from '@/views/DirectorView/types/directorViewTypes'
import AddNewSceneModal from '@/components/AddNewSceneModal.vue'
import SelectScenesContainerComponent from '@/components/SelectScenesContainer.vue'
import OrderCurrentDirectorMovieAccordion from '@/components/OrderCurrentDirectorMovieAccordion.vue'
// import SelectScenesNumberInputComponent from '@/components/SelectScenesNumberInputComponent.vue'
import { Scene, useSceneStore } from '@/stores/useSceneStore'
import useModal from '@/composables/useModal'
import HeaderViewComponent from '@/components/HeaderViewComponent.vue'

// STORE
const sceneStore = useSceneStore()
const { openAddNewSceneModal } = useModal()

// DATA
const step = ref<number>(DirectorStep.SELECT_SCENES)

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

function addNewScene() {
  openAddNewSceneModal()
}

function setStep(stepNumber: DirectorStep) {
  step.value = stepNumber
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
