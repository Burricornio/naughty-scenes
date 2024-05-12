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
      <p>{{ scene.detail }}</p>
      <p v-if="modeStore.getIsActorMode">{{ text.startTimerWarning }}</p>
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
import { useI18n } from 'vue-i18n'
import { useModeStore } from '@/stores/useMode'
import { Scene } from '@/stores/useScene/types'
import { EmittedEvent } from '@/events'
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
const modeStore = useModeStore()

// TEXTS
const { t } = useI18n()
const text = {
  startTimerWarning: t('start_timer_warning')
}

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
  if (modeStore.getIsActorMode) {
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
  if (modeStore.getIsActorMode) {
    nextButtonDisabled.value = true
  }
})
</script>

<style lang="scss" scoped>
.scene-component-container {
  @include flex($flex-direction: column);
  width: 100%;
  // flex: 1;

  .instructions {
    @include flex($flex-direction: column);
    width: 100%;
    height: 100%;
    padding-top: 50px;
    min-height: 200px;
    font-family: $secondary-font;
    background-color: $black;

    p {
      font-size: 18px;
      margin-bottom: 40px;
      padding: 0 40px;
      text-align: left;
      width: 70%;
      color: $white;
      line-height: 22px;
    }
  }
}
</style>
