<template>
  <div class="scene-component-container" v-if="scene">
    <NextAndPreviousButtonsComponent
      :goNext="selectNextScene"
      :goPrev="selectPreviousScene"
      :prevButtonDisabled="prevButtonDisabled"
      :nextButtonDisabled="nextButtonDisabled"
      :title="scene.title"
    />
    <div class="instructions">
      <p>{{ scene.instructions }}</p>
      <StartTimerInstructionsComponent />
    </div>
    <RandomButtonComponent
      v-if="scene.rndBtnOptions && scene.rndBtnOptions.length"
      :options="scene.rndBtnOptions"
    />
    <TimerComponent
      :minutes="scene.duration"
      :componentKey="timerComponentKey"
      @enable-next-button-scene="onEnableNextSceneButton"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useGameStore } from '@/stores/useGame'
import { Scene } from '@/stores/useSceneStore'
import { EmittedEvent } from '@/events'
import { GameMode } from '@/stores/useGame/types'
import NextAndPreviousButtonsComponent from '@/components/SceneContainer/Scene/NextAndPreviousButtonsComponent.vue'
import RandomButtonComponent from '@/components/SceneContainer/Scene/RandomButtonComponent.vue'
import StartTimerInstructionsComponent from '@/components/SceneContainer/Scene/StartTimerInstructionsComponent.vue'
import TimerComponent from '@/components/SceneContainer/Scene/Timer/TimerComponent.vue'

// PROPS
const { scene } = defineProps<{
  scene: Scene | null
  prevButtonDisabled: boolean
}>()

// STORE
const gameStore = useGameStore()

// DATA
const nextButtonDisabled = ref<boolean>(false)
const timerComponentKey = ref<number>(0)

// EMITS
const emit = defineEmits([
  EmittedEvent.SELECT_NEXT_SCENE,
  EmittedEvent.SELECT_PREVIOUS_SCENE,
  EmittedEvent.ENABLE_NEXT_BUTTON_SCENE
])

function selectNextScene() {
  if (gameStore.getGameMode === GameMode.ACTOR) {
    timerComponentKey.value++
    nextButtonDisabled.value = true
  }
  emit(EmittedEvent.SELECT_NEXT_SCENE)
}

function selectPreviousScene() {
  emit(EmittedEvent.SELECT_PREVIOUS_SCENE)
}

function onEnableNextSceneButton() {
  nextButtonDisabled.value = false
}

// HOOKS
onMounted(() => {
  if (gameStore.getGameMode === GameMode.ACTOR) {
    nextButtonDisabled.value = true
  }
})
</script>

<style lang="scss" scoped>
.scene-component-container {
  @include flex($flex-direction: column);
  width: 100%;
  flex: 1;
  .instructions {
    @include flex($flex-direction: column);
    width: 100%;
    flex: 1;
    font-family: $secondary-font;
    height: 40px;
    background-color: $white;
    padding: 20px 0;
  }
}
</style>
