<template>
  <div v-if="scene">
    <NextAndPreviousButtonsComponent
      :goNext="selectNextScene"
      :goPrev="selectPreviousScene"
      :prevButtonDisabled="prevButtonDisabled"
    />
    <h1>{{ scene.title }}</h1>
    <p>{{ scene.instructions }}</p>
    <small>{{ scene.id }}</small>
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
