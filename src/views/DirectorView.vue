<template>
  <div class="director-view">
    <h1>Director mode</h1>
    <SelectScenesNumberInputComponent
      :scenesNumber="numberOfScenes"
      @change-scenes-number-length="selectRandomScenes"
    />
    <div v-if="scenes.length">
      <AccordionContainerComponent :scenes="scenes" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import AccordionContainerComponent from '@/components/AccordionContainer.vue'
import SelectScenesNumberInputComponent from '@/components/SelectScenesNumberInputComponent.vue'
import { Scene, useSceneStore } from '@/stores/useSceneStore'

// STORE
const sceneStore = useSceneStore()

// DATA
const numberOfScenes = 3

const scenes = computed<Scene[]>(() => sceneStore.getScenes)

// HOOKS
onMounted(() => {
  selectRandomScenes(numberOfScenes)
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
