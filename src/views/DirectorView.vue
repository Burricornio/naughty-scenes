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
import { ref, onMounted } from 'vue'
import AccordionContainerComponent from '@/components/AccordionContainer.vue'
import SelectScenesNumberInputComponent from '@/components/SelectScenesNumberInputComponent.vue'
import { AccordionScene, useSceneStore } from '@/stores/useSceneStore'

// STORE
const sceneStore = useSceneStore()

// DATA
const numberOfScenes = 3

const scenes = ref<AccordionScene[]>([])

// HOOKS
onMounted(() => {
  selectRandomScenes(numberOfScenes)
})

// METHODS
function selectRandomScenes(numberOfScenes: number): void {
  sceneStore.selectRandomScenes(numberOfScenes)
  scenes.value = sceneStore.getScenes as AccordionScene[]
}
</script>

<style lang="scss" scoped>
.director-view {
  @include flex($flex-direction: column);
  margin-bottom: 20px;
}
</style>
