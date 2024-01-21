<template>
  <div class="director-view">
    <HeaderViewComponent
      v-if="!countdownStore.showCountdown"
      title="DIRECTOR MODE"
    />
    <MovieContainerComponent
      v-if="startedMovieFlag"
      @repeat-again="onRepeatAgain"
    />
    <DirectorStepsComponent
      :changeStartedMovieFlag="changeStartedMovieFlag"
      @update-director-movie="onUpdateDirectorMovie"
      v-else
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
// import SelectScenesNumberInputComponent from '@/components/SelectScenesNumberInputComponent.vue'
import { Scene, useSceneStore } from '@/stores/useSceneStore'
import HeaderViewComponent from '@/components/HeaderViewComponent.vue'
import { useCountdownStore } from '@/stores/useCountdownStore'
import MovieContainerComponent from '@/components/director-view/MovieContainerComponent.vue'
import DirectorStepsComponent from '@/components/director-view/DirectorStepsComponent.vue'

// STORE
const sceneStore = useSceneStore()
const countdownStore = useCountdownStore()

// DATA
const movie = ref<Scene[]>([])
const startedMovieFlag = ref<boolean>(false)

// HOOKS
onMounted(() => {
  countdownStore.setCountdownStatus(false)
})

// METHODS
function onRepeatAgain() {
  countdownStore.setCountdownStatus(true)
  sceneStore.playMovie(movie.value)
}

function changeStartedMovieFlag() {
  startedMovieFlag.value = true
}

function onUpdateDirectorMovie(scenes: Scene[]) {
  movie.value = scenes
}
</script>

<style lang="scss" scoped>
.director-view {
  @include flex($flex-direction: column);
  width: 1500px;
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
