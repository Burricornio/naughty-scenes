<template>
  <CountdownComponent v-if="countdownStore.showCountdown" />
  <div :class="['view-container', gameStore.gameModeName]" v-else>
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
import { Scene, useSceneStore } from '@/stores/useSceneStore'
import { useCountdownStore } from '@/stores/useCountdownStore'
import { useGameStore } from '@/stores/useGame'
import CountdownComponent from '@/components/CountdownComponent.vue'
import DirectorStepsComponent from '@/components/director/DirectorStepsComponent.vue'
import HeaderModeComponent from '@/components/HeaderModeComponent.vue'
import LoadMovieBar from '@/components/director/LoadMovieBar.vue'
import MovieContainerComponent from '@/components/director/MovieContainerComponent.vue'
import { GameMode } from '@/stores/useGame/types'
import { useI18n } from 'vue-i18n'

// STORE
const sceneStore = useSceneStore()
const countdownStore = useCountdownStore()
const gameStore = useGameStore()

// TEXTS
const { t } = useI18n()
const text = {
  modeTitle: `${t('modes.mode_literal')} ${t('modes.director')}`
}

// DATA
const movie = ref<Scene[]>([])

// HOOKS
onMounted(() => {
  gameStore.setGameMode(GameMode.DIRECTOR)
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
