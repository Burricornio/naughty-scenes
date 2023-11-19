<template>
  <CountdownComponent v-if="countdownStore.showCountdown" />
  <div v-else>
    <h1>Impro mode</h1>
    <SceneContainerComponent />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useCountdownStore } from '@/stores/useCountdownStore'
import { useSceneStore } from '@/stores/useSceneStore'
import CountdownComponent from '@/components/CountdownComponent.vue'
import SceneContainerComponent from '@/components/SceneContainer/SceneContainerComponent.vue'

// STORE
const sceneStore = useSceneStore()
const countdownStore = useCountdownStore()

// HOOKS
onMounted(() => {
  selectRandomScenes()
})

// METHODS
function selectRandomScenes(): void {
  sceneStore.selectRandomScenes()
}
</script>
