<template>
  <h2 v-if="!allScenesPlayed && sceneStore.getCurrentScene">
    {{ text.turn }}: {{ playerTurn }}
  </h2>
  <SceneComponent
    :scene="sceneStore.getCurrentScene"
    :prevButtonDisabled="sceneStore.getSceneIndex === 0"
    @select-next-scene="selectNextScene"
    @select-previous-scene="selectPreviousScene"
  />
  <p v-if="allScenesPlayed">¡Has jugado todas las escenas!</p>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useMovieStore } from '@/stores/useMovieStore'
import { useSceneStore } from '@/stores/useSceneStore'
import SceneComponent from '@/components/SceneComponent.vue'

// STORE
const sceneStore = useSceneStore()
const movieStore = useMovieStore()

// TEXTS
const { t } = useI18n()
const text = { allPlayed: t('all_played'), turn: t('turn') }

// COMPUTED
const allScenesPlayed = computed<boolean>(() =>
  Boolean(
    sceneStore.getScenesLength &&
      sceneStore.getPlayedSceneIds.length === sceneStore.getScenesLength
  )
)

const playerTurn = computed<string>(() => {
  const playerNames = Object.values(movieStore.getPlayerNames)
  return playerNames[sceneStore.getSceneIndex % playerNames.length]
})

// // METHODS
function selectNextScene(): void {
  if (sceneStore.getCurrentScene) {
    sceneStore.pushPlayedSceneId(sceneStore.getCurrentScene.id)
  }
  sceneStore.increaseIndex()
  if (sceneStore.getSceneIndex === sceneStore.getScenesLength) {
    movieStore.addNewGamePlayed()
  }
  sceneStore.setCurrentScene(sceneStore.getScenes[sceneStore.getSceneIndex])
}

function selectPreviousScene(): void {
  sceneStore.decreaseIndex()
  sceneStore.setCurrentScene(sceneStore.getScenes[sceneStore.getSceneIndex])
  sceneStore.popPlayedSceneId()
}
</script>
