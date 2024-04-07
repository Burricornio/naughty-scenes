<template>
  <TurnOfComponent />
  <SceneComponent
    :scene="sceneStore.getCurrentScene"
    :prevButtonDisabled="prevButtonDisabled"
    @select-next-scene="selectNextScene"
    @select-previous-scene="selectPreviousScene"
  />
</template>

<script setup lang="ts">
import { useGameStore } from '@/stores/useGame'
import { useModeStore } from '@/stores/useMode'
import { useSceneStore } from '@/stores/useScene'
import SceneComponent from '@/components/SceneContainer/Scene/SceneComponent.vue'
import TurnOfComponent from '@/components/SceneContainer/TurnOfComponent.vue'
import { computed } from 'vue'

// STORE
const sceneStore = useSceneStore()
const gameStore = useGameStore()
const modeStore = useModeStore()

// COMPUTED
const prevButtonDisabled = computed(() => {
  if (modeStore.getIsActorMode) {
    return true
  }
  return sceneStore.getSceneIndex === 0
})

// METHODS
function selectNextScene(): void {
  if (sceneStore.getCurrentScene) {
    sceneStore.pushPlayedSceneId(sceneStore.getCurrentScene.id)
  }
  sceneStore.increaseIndex()
  if (sceneStore.getSceneIndex === sceneStore.getScenesLength) {
    gameStore.addNewGamePlayed()
  }
  if (sceneStore.getScenes[sceneStore.getSceneIndex]) {
    sceneStore.setCurrentScene(sceneStore.getScenes[sceneStore.getSceneIndex])
  } else {
    sceneStore.setCurrentScene(null)
  }
}

function selectPreviousScene(): void {
  sceneStore.decreaseIndex()
  sceneStore.setCurrentScene(sceneStore.getScenes[sceneStore.getSceneIndex])
  sceneStore.popPlayedSceneId()
}
</script>
