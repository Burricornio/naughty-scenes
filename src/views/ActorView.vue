<template>
  <CountdownComponent v-if="countdownStore.showCountdown" />
  <div v-else>
    <HeaderViewComponent title="ACTOR MODE" />
    <SceneContainerComponent />
    <SceneMiniaturesComponent
      v-if="!sceneStore.allScenesPlayed"
      :scenes="sceneStore.getScenes"
      :playedSceneIds="sceneStore.getPlayedSceneIds"
      :currentScene="sceneStore.getCurrentScene"
    />
    <MovieEndedComponent @repeat-again="onRepeatAgain" />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useCountdownStore } from '@/stores/useCountdownStore'
import { useSceneStore } from '@/stores/useSceneStore'
import CountdownComponent from '@/components/CountdownComponent.vue'
import MovieEndedComponent from '@/components/MovieEndedComponent.vue'
import SceneContainerComponent from '@/components/SceneContainer/SceneContainerComponent.vue'
import SceneMiniaturesComponent from '@/components/SceneMiniaturesComponent.vue'
import HeaderViewComponent from '@/components/HeaderViewComponent.vue'

// STORE
const sceneStore = useSceneStore()
const countdownStore = useCountdownStore()

// DATA
// ¿Dejar que el jugador escoja el número de escenas?
const numberOfScenes = 3

// HOOKS
onMounted(() => {
  selectRandomScenes()
})

// METHODS
function selectRandomScenes() {
  sceneStore.selectScenes({
    numberOfScenes: numberOfScenes,
    shuffle: true
  })
}

function onRepeatAgain() {
  countdownStore.setCountdownStatus(true)
  sceneStore.playMovie(sceneStore.getScenes)
}
</script>
