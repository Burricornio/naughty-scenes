<template>
  <CountdownComponent v-if="countdownStore.showCountdown" />
  <div v-else>
    <HeaderViewComponent title="IMPRO MODE" />
    <SceneContainerComponent />
    <MovieEndedComponent @repeat-again="onRepeatAgain" />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useCountdownStore } from '@/stores/useCountdownStore'
import { useSceneStore } from '@/stores/useSceneStore'
import CountdownComponent from '@/components/CountdownComponent.vue'
import MovieEndedComponent from '@/components/MovieEndedComponent.vue'
import SceneContainerComponent from '@/components/SceneContainer/SceneContainerComponent.vue'
import HeaderViewComponent from '@/components/HeaderViewComponent.vue'

// STORE
const sceneStore = useSceneStore()
const countdownStore = useCountdownStore()

// HOOKS
onMounted(() => {
  selectRandomScenes()
})

// METHODS
function selectRandomScenes() {
  sceneStore.selectScenes({
    numberOfScenes: sceneStore.getDefaultScenesNumberLength,
    shuffle: true
  })
}

function onRepeatAgain() {
  countdownStore.setCountdownStatus(true)
  selectRandomScenes()
}
</script>
