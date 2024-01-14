<template>
  <div class="director-view">
    <h1>Director mode</h1>
    <div class="steps-container">
      <button @click="setStep(1)">SELECT YOUR SCENES</button>
      <button :disabled="numberOfSelectedScenes === 0" @click="setStep(2)">
        ORDER YOUR SCENES
      </button>
      <button @click="setStep(3)">CONFIGURE MOVIE</button>
    </div>
    <!-- STEP 1 -->
    <div v-if="step === 1">
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
      v-if="step === 2"
      @unselect-scenes="onUnselectScenes"
    />
    <!-- STEP 3 -->
    <div v-if="step === 3">A configurar pelicula</div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed, ref, watch } from 'vue'
import SelectScenesContainerComponent from '@/components/SelectScenesContainer.vue'
import OrderCurrentDirectorMovieAccordion from '@/components/OrderCurrentDirectorMovieAccordion.vue'
// import SelectScenesNumberInputComponent from '@/components/SelectScenesNumberInputComponent.vue'
import {
  DirectorScene,
  useDirectorSceneStore
} from '@/stores/useDirectorSceneStore'
import { useSceneStore } from '@/stores/useSceneStore'

// STORE
const directorSceneStore = useDirectorSceneStore()
const sceneStore = useSceneStore()

// DATA
const step = ref<number>(1)
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
    if (value !== 1) {
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

// TODO TIPAR PASOS
function setStep(stepNumber: number) {
  step.value = stepNumber
}

function onUnselectScenes(ids: number[]) {
  ids.forEach((id: number) => unselectSceneIds.value.push(id))
  numberOfSelectedScenes.value = numberOfSelectedScenes.value - ids.length
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
