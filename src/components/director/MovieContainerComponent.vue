<template>
  <section class="movie-container">
    <SceneContainerComponent />
    <MovieMiniaturesComponent
      v-if="!sceneStore.allScenesPlayed"
      :scenes="sceneStore.getScenes"
      :playedSceneIds="sceneStore.getPlayedSceneIds"
      :currentScene="sceneStore.getCurrentScene"
    />
    <GameEndedComponent @repeat-again="repeatAgain" />
  </section>
</template>

<script setup lang="ts">
import { useSceneStore } from '@/stores/useScene'
import SceneContainerComponent from '@/components/SceneContainer/SceneContainerComponent.vue'
import GameEndedComponent from '@/components/GameEndedComponent.vue'
import MovieMiniaturesComponent from '@/components/director/MovieMiniaturesComponent.vue'
import { EmittedEvent } from '@/events'

// STORE
const sceneStore = useSceneStore()

// EMITS
const emit = defineEmits([EmittedEvent.REPEAT_AGAIN])

function repeatAgain(repeatSameGameFlag: boolean) {
  emit(EmittedEvent.REPEAT_AGAIN, repeatSameGameFlag)
}
</script>

<style lang="scss" scoped>
.movie-container {
  @include flex($flex-direction: column);
  width: 100%;
  flex: 1;
}
</style>
