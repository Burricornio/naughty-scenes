<template>
  <CountdownComponent v-if="countdownStore.showCountdown" />
  <div class="view-container" v-else>
    <HeaderViewComponent title="IMPRO MODE" />
    <SceneContainerComponent />
    <BannerComponent />
    <MovieEndedComponent @repeat-again="onRepeatAgain" />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useCountdownStore } from '@/stores/useCountdownStore'
import { useSceneStore } from '@/stores/useSceneStore'
import BannerComponent from '@/components/BannerComponent.vue'
import CountdownComponent from '@/components/CountdownComponent.vue'
import HeaderViewComponent from '@/components/HeaderViewComponent.vue'
import MovieEndedComponent from '@/components/MovieEndedComponent.vue'
import SceneContainerComponent from '@/components/SceneContainer/SceneContainerComponent.vue'

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
