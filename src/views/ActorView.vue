<template>
  <CountdownComponent v-if="countdownStore.showCountdown" />
  <div :class="['view-container', getModeName]" v-else>
    <section class="scene-wrapper">
      <HeaderModeComponent
        v-if="!sceneStore.allScenesPlayed"
        :title="text.modeTitle"
      />
      <SceneContainerComponent />
      <GameEndedComponent @repeat-again="onRepeatAgain" />
    </section>
    <BannerComponent class="banner" />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { Mode } from '@/stores/useMode/types'
import { useCountdownStore } from '@/stores/useCountdownStore'
import { useGameStore } from '@/stores/useGame'
import { useModeStore } from '@/stores/useMode'
import { useSceneStore } from '@/stores/useScene'
import { useI18n } from 'vue-i18n'
import CountdownComponent from '@/components/CountdownComponent.vue'
import GameEndedComponent from '@/components/GameEndedComponent.vue'
import SceneContainerComponent from '@/components/SceneContainer/SceneContainerComponent.vue'
import HeaderModeComponent from '@/components/HeaderModeComponent.vue'
import BannerComponent from '@/components/BannerComponent.vue'

// STORE
const sceneStore = useSceneStore()
const countdownStore = useCountdownStore()
const { setViewTimer } = useGameStore()
const { setMode, getModeName } = useModeStore()

// TEXTS
const { t } = useI18n()
const text = {
  modeTitle: `${t('modes.mode_literal')} ${t('modes.actor')}`
}

// HOOKS
onMounted(() => {
  setMode(Mode.ACTOR)
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
