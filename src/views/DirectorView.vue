<template>
  <div class="director-view">
    <h1>Director mode</h1>
    <div>
      <p>SELECT YOUR SCENES</p>
      <p>Selecciona las escenas que quieras rodar</p>
      <span>{{ numberOfSelectedScenes }}</span>
    </div>
    <!-- <SelectScenesNumberInputComponent
      :scenesNumber="numberOfScenes"
      @change-scenes-number-length="selectRandomScenes"
    /> -->
    <div v-if="scenes.length">
      <SelectScenesContainerComponent
        :scenes="scenes"
        @calculate-director-movie-length="changeInputLength"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed, ref } from 'vue'
import SelectScenesContainerComponent from '@/components/SelectScenesContainer.vue'
// import SelectScenesNumberInputComponent from '@/components/SelectScenesNumberInputComponent.vue'
import { Scene, useSceneStore } from '@/stores/useSceneStore'

// STORE
const sceneStore = useSceneStore()

// DATA
// const numberOfScenes = 3
const numberOfSelectedScenes = ref<number>(0)

const scenes = computed<Scene[]>(() => sceneStore.getScenes)

function changeInputLength(movieLength: number) {
  numberOfSelectedScenes.value = movieLength
}

// HOOKS
onMounted(() => {
  selectRandomScenes(sceneStore.getDefaultScenesNumberLength)
})

// METHODS
function selectRandomScenes(numberOfScenes: number): void {
  sceneStore.selectRandomScenes(numberOfScenes)
}
</script>

<style lang="scss" scoped>
.director-view {
  @include flex($flex-direction: column);
  width: 1500px;
  margin-bottom: 20px;
}
</style>
