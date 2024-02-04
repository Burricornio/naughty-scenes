<template>
  <section class="movie-container">
    <SceneContainerComponent />
    <SceneMiniaturesComponent
      v-if="!sceneStore.allScenesPlayed"
      :scenes="sceneStore.getScenes"
      :playedSceneIds="sceneStore.getPlayedSceneIds"
      :currentScene="sceneStore.getCurrentScene"
    />
    <MovieEndedComponent @repeat-again="repeatAgain" />
  </section>
</template>

<script setup lang="ts">
import { useSceneStore } from '@/stores/useSceneStore'
import SceneContainerComponent from '@/components/SceneContainer/SceneContainerComponent.vue'
import MovieEndedComponent from '@/components/MovieEndedComponent.vue'
import SceneMiniaturesComponent from '@/components/SceneMiniaturesComponent.vue'
import { EmittedEvent } from '@/events'

// STORE
const sceneStore = useSceneStore()

// EMITS
const emit = defineEmits([EmittedEvent.REPEAT_AGAIN])

function repeatAgain() {
  emit(EmittedEvent.REPEAT_AGAIN)
}
</script>
