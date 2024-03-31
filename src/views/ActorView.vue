<template>
  <CountdownComponent v-if="countdownStore.showCountdown" />
  <div :class="['view-container', getGameModeName]" v-else>
    <HeaderModeComponent :title="text.modeTitle" />
    <SceneContainerComponent />
    <BannerComponent />
    <GameEndedComponent @repeat-again="onRepeatAgain" />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useCountdownStore } from '@/stores/useCountdownStore'
import { useSceneStore } from '@/stores/useScene'
import { useI18n } from 'vue-i18n'
import CountdownComponent from '@/components/CountdownComponent.vue'
import GameEndedComponent from '@/components/GameEndedComponent.vue'
import SceneContainerComponent from '@/components/SceneContainer/SceneContainerComponent.vue'
import HeaderModeComponent from '@/components/HeaderModeComponent.vue'
import BannerComponent from '@/components/BannerComponent.vue'
import { useGameStore } from '@/stores/useGame'
import { GameMode } from '@/stores/useGame/types'

// STORE
const sceneStore = useSceneStore()
const countdownStore = useCountdownStore()
const { setGameMode, setViewTimer, getGameModeName } = useGameStore()

// TEXTS
const { t } = useI18n()
const text = {
  modeTitle: `${t('modes.mode_literal')} ${t('modes.actor')}`
}

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
    numberOfScenes: sceneStore.getActorModeScenesNumber,
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

<styles lang="scss" scoped>
.view-container.actor {
  @include mode-color($actor-color);
}
</styles>
