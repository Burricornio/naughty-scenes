<template>
  <section class="movie-container">
    <CountdownComponent v-if="countdownStore.showCountdown" />
    <div v-else>
      <SceneContainerComponent />
      <SceneMiniaturesComponent
        v-if="!sceneStore.allScenesPlayed"
        :scenes="sceneStore.getScenes"
        :playedSceneIds="sceneStore.getPlayedSceneIds"
        :currentScene="sceneStore.getCurrentScene"
      />
      <MovieEndedComponent @repeat-again="repeatAgain" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { useSceneStore } from '@/stores/useSceneStore'
import SceneContainerComponent from '@/components/SceneContainer/SceneContainerComponent.vue'
import { useCountdownStore } from '@/stores/useCountdownStore'
import CountdownComponent from '@/components/CountdownComponent.vue'
import MovieEndedComponent from '@/components/MovieEndedComponent.vue'
import SceneMiniaturesComponent from '@/components/SceneMiniaturesComponent.vue'
import { EmittedEvent } from '@/events'

// STORE
const sceneStore = useSceneStore()
const countdownStore = useCountdownStore()

// EMITS
const emit = defineEmits([EmittedEvent.REPEAT_AGAIN])

function repeatAgain() {
  emit(EmittedEvent.REPEAT_AGAIN)
}
</script>
