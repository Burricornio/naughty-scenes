<template>
  <TurnOfComponent />
  <SceneComponent
    :scene="sceneStore.getCurrentScene"
    :prevButtonDisabled="sceneStore.getSceneIndex === 0"
    @select-next-scene="selectNextScene"
    @select-previous-scene="selectPreviousScene"
  />
</template>

<script setup lang="ts">
import { useGameStore } from '@/stores/useGame'
import { useSceneStore } from '@/stores/useSceneStore'
import SceneComponent from '@/components/SceneComponent.vue'
import TurnOfComponent from '@/components/SceneContainer/TurnOfComponent.vue'

// STORE
const sceneStore = useSceneStore()
const gameStore = useGameStore()

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
