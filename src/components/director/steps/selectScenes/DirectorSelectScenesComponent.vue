<template>
  <div class="selected-scenes-container">
    <div class="selected-length">
      <p>Selecciona las escenas que quieras rodar</p>
      <span class="selected-number">{{ numberOfSelectedScenes }}</span>
    </div>

    <div v-if="allScenes.length">
      <DirectorScenesContainerComponent :scenes="allScenes" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { Scene } from '@/stores/useScene/types'
import { useSceneStore } from '@/stores/useScene'
import DirectorScenesContainerComponent from '@/components/director/steps/selectScenes/DirectorScenesContainerComponent.vue'

// STORE
const sceneStore = useSceneStore()

// COMPUTED
const allScenes = computed<Scene[]>(() => sceneStore.getScenes)
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
</script>

<style lang="scss" scoped>
.selected-scenes-container {
  background-color: $white;
  width: 100%;
  flex: 1;
  .selected-length {
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
</style>
