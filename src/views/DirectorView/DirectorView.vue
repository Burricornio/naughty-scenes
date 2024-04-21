<template>
  <CountdownComponent v-if="countdownStore.showCountdown" />
  <div :class="['view-container', modeStore.modeName]" v-else>
    <HeaderModeComponent
      v-if="!countdownStore.showCountdown"
      :title="text.modeTitle"
    />
    <LoadMovieBar v-if="!gameStore.getGameStartedFlag" />
    <MovieContainerComponent
      v-if="gameStore.getGameStartedFlag"
      @repeat-again="onRepeatAgain"
    />
    <DirectorStepsComponent
      v-else
      :changeStartedMovieFlag="changeStartedMovieFlag"
      @update-director-movie="onUpdateDirectorMovie"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Mode } from '@/stores/useMode/types'
import { Scene } from '@/stores/useScene/types'
import { useI18n } from 'vue-i18n'
import { useSceneStore } from '@/stores/useScene'
import { useCountdownStore } from '@/stores/useCountdownStore'
import { useGameStore } from '@/stores/useGame'
import { useModeStore } from '@/stores/useMode'
import CountdownComponent from '@/components/CountdownComponent.vue'
import DirectorStepsComponent from '@/components/director/steps/DirectorStepsComponent.vue'
import HeaderModeComponent from '@/components/HeaderModeComponent.vue'
import LoadMovieBar from '@/components/director/LoadMovieBar.vue'
import MovieContainerComponent from '@/components/director/MovieContainerComponent.vue'

// STORE
const sceneStore = useSceneStore()
const countdownStore = useCountdownStore()
const gameStore = useGameStore()
const modeStore = useModeStore()

// TEXTS
const { t } = useI18n()
const text = {
  modeTitle: `${t('modes.mode_literal')} ${t('modes.director')}`
}

// DATA
const movie = ref<Scene[]>([])

// HOOKS
onMounted(() => {
  modeStore.setMode(Mode.DIRECTOR)
  countdownStore.setCountdownStatus(false)
  sceneStore.unselectAllScenes()
})

// METHODS
function onRepeatAgain(repeatSameGameFlag: boolean) {
  if (repeatSameGameFlag) {
    countdownStore.setCountdownStatus(true)
    sceneStore.playMovie(sceneStore.getScenes)
  } else {
    gameStore.setGameStartedFlag(false)
    sceneStore.resetSelectedScenes()
  }
}

function changeStartedMovieFlag() {
  gameStore.setGameStartedFlag(true)
}

function onUpdateDirectorMovie(scenes: Scene[]) {
  movie.value = scenes
}
</script>

<style lang="scss" scoped>
.director-view {
  @include flex($flex-direction: column);
  margin-bottom: 20px;

  .steps-container {
    @include flex;
    width: 100%;
    background: $white;
    padding: 10px;
    margin-bottom: 10px;
  }
}
</style>

<styles lang="scss" scoped>
.view-container.director {
  @include mode-color($director-color);
}
</styles>
