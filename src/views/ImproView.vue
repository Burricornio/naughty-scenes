<template>
  <CountdownComponent v-if="countdownStore.showCountdown" />
  <div :class="['view-container', text.mode]" v-else>
    <HeaderModeComponent :title="text.modeTitle" />
    <SceneContainerComponent />
    <BannerComponent />
    <MovieEndedComponent @repeat-again="onRepeatAgain" />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useCountdownStore } from '@/stores/useCountdownStore'
import { useSceneStore } from '@/stores/useSceneStore'
import { useGameStore } from '@/stores/useGame'
import { GameMode } from '@/stores/useGame/types'
import BannerComponent from '@/components/BannerComponent.vue'
import CountdownComponent from '@/components/CountdownComponent.vue'
import HeaderModeComponent from '@/components/HeaderModeComponent.vue'
import MovieEndedComponent from '@/components/MovieEndedComponent.vue'
import SceneContainerComponent from '@/components/SceneContainer/SceneContainerComponent.vue'
import { useI18n } from 'vue-i18n'

// STORE
const sceneStore = useSceneStore()
const countdownStore = useCountdownStore()
const { setGameMode, setViewTimer } = useGameStore()

// TEXTS
const { t } = useI18n()
const text = {
  mode: t('modes.impro'),
  modeTitle: `${t('modes.mode_literal')} ${t('modes.impro')}`
}

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
