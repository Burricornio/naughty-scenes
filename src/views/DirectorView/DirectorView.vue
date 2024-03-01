<template>
  <CountdownComponent v-if="countdownStore.showCountdown" />
  <div class="view-container">
    <HeaderViewComponent
      v-if="!countdownStore.showCountdown"
      title="DIRECTOR MODE"
    />
    <LoadMovieBar v-if="!movieStore.getGameStartedFlag" />
    <MovieContainerComponent
      v-if="movieStore.getGameStartedFlag"
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
// import SelectScenesNumberInputComponent from '@/components/SelectScenesNumberInputComponent.vue'
import { Scene, useSceneStore } from '@/stores/useSceneStore'
import HeaderViewComponent from '@/components/HeaderViewComponent.vue'
import { useCountdownStore } from '@/stores/useCountdownStore'
import MovieContainerComponent from '@/components/director/MovieContainerComponent.vue'
import DirectorStepsComponent from '@/components/director/DirectorStepsComponent.vue'
import LoadMovieBar from '@/components/director/LoadMovieBar.vue'
import CountdownComponent from '@/components/CountdownComponent.vue'
import { GameMode, useMovieStore } from '@/stores/useMovieStore'

// STORE
const sceneStore = useSceneStore()
const countdownStore = useCountdownStore()
// const { setGameMode, setGameStartedFlag, getGameStartedFlag } = useMovieStore()
const movieStore = useMovieStore()

// DATA
const movie = ref<Scene[]>([])
// const startedMovieFlag = ref<boolean>(false)

// HOOKS
onMounted(() => {
  movieStore.setGameMode(GameMode.DIRECTOR)
  countdownStore.setCountdownStatus(false)
  sceneStore.unselectAllScenes()
})

// METHODS
function onRepeatAgain(repeatSameGameFlag: boolean) {
  if (repeatSameGameFlag) {
    countdownStore.setCountdownStatus(true)
    sceneStore.playMovie(sceneStore.getScenes)
  } else {
    movieStore.setGameStartedFlag(false)
    sceneStore.resetSelectedScenes()
  }
}

function changeStartedMovieFlag() {
  movieStore.setGameStartedFlag(true)
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
