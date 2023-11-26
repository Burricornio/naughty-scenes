<template>
  <div v-if="scene">
    <NextAndPreviousButtonsComponent
      :goNext="selectNextScene"
      :goPrev="selectPreviousScene"
      :prevButtonDisabled="prevButtonDisabled"
    />
    <h2 class="title">{{ scene.title }}</h2>
    <p class="instructions">{{ scene.instructions }}</p>
    <RandomButtonComponent
      v-if="scene.rndBtnOptions && scene.rndBtnOptions.length"
      :options="scene.rndBtnOptions"
    />
    <TimerComponent :minutes="scene.duration" />
  </div>
</template>

<script setup lang="ts">
import { Scene } from '@/stores/useSceneStore'
import { EmittedEvent } from '@/events'
import NextAndPreviousButtonsComponent from '@/components/NextAndPreviousButtonsComponent.vue'
import RandomButtonComponent from '@/components/RandomButtonComponent.vue'
import TimerComponent from '@/components/TimerComponent.vue'

// PROPS
const { scene } = defineProps<{
  scene: Scene | null
  prevButtonDisabled: boolean
}>()

// EMITS
const emit = defineEmits([
  EmittedEvent.SELECT_NEXT_SCENE,
  EmittedEvent.SELECT_PREVIOUS_SCENE
])

function selectNextScene() {
  emit(EmittedEvent.SELECT_NEXT_SCENE)
}

function selectPreviousScene() {
  emit(EmittedEvent.SELECT_PREVIOUS_SCENE)
}
</script>

<style lang="scss" scoped>
.title {
  text-transform: uppercase;
  font-size: 22px;
}

.instructions {
  background-color: $white;
  margin: 20px;
  padding: 10px;
}
</style>
