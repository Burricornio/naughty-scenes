<template>
  <CountdownComponent v-if="countdownStore.showCountdown" />
  <div class="view-container" v-else>
    <HeaderViewComponent title="IMPRO MODE" />
    <SceneContainerComponent />
    <BannerComponent />
    <MovieEndedComponent @repeat-again="onRepeatAgain" />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useCountdownStore } from '@/stores/useCountdownStore'
import { useSceneStore } from '@/stores/useSceneStore'
import BannerComponent from '@/components/BannerComponent.vue'
import CountdownComponent from '@/components/CountdownComponent.vue'
import HeaderViewComponent from '@/components/HeaderViewComponent.vue'
import MovieEndedComponent from '@/components/MovieEndedComponent.vue'
import SceneContainerComponent from '@/components/SceneContainer/SceneContainerComponent.vue'
import { GameMode, useMovieStore } from '@/stores/useMovieStore'

// STORE
const sceneStore = useSceneStore()
const countdownStore = useCountdownStore()
const { setGameMode } = useMovieStore()
const { setViewTimer } = useMovieStore()

// HOOKS
onMounted(() => {
  setGameMode(GameMode.IMPRO)
  if (!sceneStore.getScenesLength) {
    selectRandomScenes()
  }
  setViewTimer(false)
})

// METHODS
function selectRandomScenes() {
  sceneStore.selectScenes({
    numberOfScenes: sceneStore.getDefaultScenesNumberLength,
    shuffle: true
  })
}

function onRepeatAgain(repeatSameGameFlag: boolean) {
  countdownStore.setCountdownStatus(true)
  if (repeatSameGameFlag) {
    sceneStore.playMovie(sceneStore.getScenes)
  } else {
    sceneStore.$reset()
    selectRandomScenes()
  }
}
</script>
