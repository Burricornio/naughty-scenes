<template>
  <CountdownComponent v-if="countdownStore.showCountdown" />
  <div class="view-container" v-else>
    <HeaderViewComponent title="ACTOR MODE" />
    <SceneContainerComponent />
    <SceneMiniaturesComponent
      v-if="!sceneStore.allScenesPlayed"
      :scenes="sceneStore.getScenes"
      :playedSceneIds="sceneStore.getPlayedSceneIds"
      :currentScene="sceneStore.getCurrentScene"
    />
    <BannerComponent />
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
import BannerComponent from '@/components/BannerComponent.vue'
import { useGameStore, GameMode } from '@/stores/useGame'

// STORE
const sceneStore = useSceneStore()
const countdownStore = useCountdownStore()
const { setGameMode, setViewTimer } = useGameStore()

// DATA
// ¿Dejar que el jugador escoja el número de escenas?
const numberOfScenes = 3

// HOOKS
onMounted(() => {
  setGameMode(GameMode.ACTOR)
  if (!sceneStore.getScenesLength) {
    selectRandomScenes()
  }
  setViewTimer(true)
})

// METHODS
function selectRandomScenes() {
  sceneStore.selectScenes({
    numberOfScenes: numberOfScenes,
    shuffle: true
  })
}

// TODO VER SI PUEDO EXTRAER ESTE METODO DE LAS TRES VISTAS
// TODO ME QUDA VER LA PERSISTENCIA EN LA VISTA DIRECTORE
// VER SI RESETEAR TODOS LOS STORES CON $RESET Y CARGARME LOS RESET NO SE QUÉ
// REPETIR EN BOTON STRAT CON ghamestratedflag?
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
@/stores/useGame