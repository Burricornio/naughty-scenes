<template>
  <CountdownComponent v-if="countdownStore.showCountdown" />
  <div :class="['view-container', getModeName]" v-else>
    <HeaderModeComponent :title="text.modeTitle" />
    <SceneContainerComponent />
    <BannerComponent v-if="!sceneStore.allScenesPlayed" />
    <GameEndedComponent @repeat-again="onRepeatAgain" />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useCountdownStore } from '@/stores/useCountdownStore'
import { useSceneStore } from '@/stores/useScene'
import { useGameStore } from '@/stores/useGame'
import { useModeStore } from '@/stores/useMode'
import { Mode } from '@/stores/useMode/types'
import BannerComponent from '@/components/BannerComponent.vue'
import CountdownComponent from '@/components/CountdownComponent.vue'
import HeaderModeComponent from '@/components/HeaderModeComponent.vue'
import GameEndedComponent from '@/components/GameEndedComponent.vue'
import SceneContainerComponent from '@/components/SceneContainer/SceneContainerComponent.vue'
import { useI18n } from 'vue-i18n'

// STORE
const sceneStore = useSceneStore()
const countdownStore = useCountdownStore()
const { setViewTimer } = useGameStore()
const { setMode, getModeName } = useModeStore()

// TEXTS
const { t } = useI18n()
const text = {
  modeTitle: `${t('modes.mode_literal')} ${t('modes.impro')}`
}

// HOOKS
onMounted(() => {
  setMode(Mode.IMPRO)
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

<styles lang="scss" scoped>
.view-container.impro {
  @include mode-color($impro-color);
}
</styles>
