<template>
  <h2
    class="turn-text"
    v-if="!sceneStore.allScenesPlayed && sceneStore.getCurrentScene"
  >
    {{ text.turn }}:
    <span class="player-name">{{ playerTurn }}</span>
  </h2>
  <SceneComponent
    :scene="sceneStore.getCurrentScene"
    :prevButtonDisabled="sceneStore.getSceneIndex === 0"
    @select-next-scene="selectNextScene"
    @select-previous-scene="selectPreviousScene"
  />
  <BannerComponent />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useMovieStore } from '@/stores/useMovieStore'
import { useSceneStore } from '@/stores/useSceneStore'
import SceneComponent from '@/components/SceneComponent.vue'
import BannerComponent from '@/components/BannerComponent.vue'

// STORE
const sceneStore = useSceneStore()
const movieStore = useMovieStore()

// TEXTS
const { t } = useI18n()
const text = { allPlayed: t('all_played'), turn: t('turn') }

const playerTurn = computed<string>(() => {
  const playerNames = Object.values(movieStore.getPlayerNames)
  return playerNames[sceneStore.getSceneIndex % playerNames.length]
})

// METHODS
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

<style lang="scss">
.turn-text {
  @include flex;
  width: 100%;
  background: $white;
  height: 54px;
  color: $main-color;
  font-weight: bold;
  margin: 0;

  .player-name {
    color: $black;
    margin-left: 5px;
    text-transform: uppercase;
  }
}
</style>
