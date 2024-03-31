<template>
  <div v-if="getViewTimer" class="timer-container" :key="props.componentKey">
    <DurationComponent :minutes="minutes" :seconds="seconds" />
    <div class="timer-buttons">
      <button
        @click="startTimer"
        :disabled="isTimerRunning || timeIsZero"
        :title="startButtonText"
      >
        <Icon icon="mdi:play" />
      </button>
      <button @click="stopTimer" :disabled="!isTimerRunning" :title="text.stop">
        <Icon icon="mdi:stop" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect, watch, computed } from 'vue'
import { useGameStore } from '@/stores/useGame'
import { useI18n } from 'vue-i18n'
import DurationComponent from '@/components/DurationComponent.vue'
import { EmittedEvent } from '@/events'
import { Icon } from '@iconify/vue'

// PROPS
const props = defineProps({
  minutes: {
    type: Number,
    default: 1
  },
  componentKey: {
    type: Number,
    required: true
  }
})

// STORE
const { getViewTimer } = useGameStore()

// DATA
const { t } = useI18n()

const text = {
  continue: t('button.continue'),
  reset: t('button.reset'),
  restart: t('button.restart'),
  start: t('button.start'),
  stop: t('button.stop')
}

let timerInterval = 0
const seconds = ref<number>(0)
const minutes = ref<number>(props.minutes)
const isTimerRunning = ref<boolean>(false)
const startButtonText = ref<string>(text.start)

// COMPUTED
const timeIsZero = computed<boolean>(
  () => minutes.value === 0 && seconds.value === 0
)

// WATCH
watch(
  () => props.componentKey,
  () => {
    resetTimer()
  }
)

watchEffect(() => {
  if (timeIsZero.value) {
    clearInterval(timerInterval)
    isTimerRunning.value = false
    startButtonText.value = text.restart
    enableNextSceneButton()
  }
})
// EMITS
const emit = defineEmits([EmittedEvent.ENABLE_NEXT_BUTTON_SCENE])

function enableNextSceneButton() {
  emit(EmittedEvent.ENABLE_NEXT_BUTTON_SCENE)
}

// METHODS
function startTimer(): void {
  startButtonText.value = text.start
  timerInterval = setInterval(() => {
    if (minutes.value === 0 && seconds.value === 0) {
      clearInterval(timerInterval)
      isTimerRunning.value = false
    } else {
      if (seconds.value === 0) {
        minutes.value--
        seconds.value = 59
      } else {
        seconds.value--
      }
    }
  }, 1000)
  isTimerRunning.value = true
}

function stopTimer(): void {
  clearInterval(timerInterval)
  isTimerRunning.value = false
  startButtonText.value = text.continue
}

function resetTimer(): void {
  minutes.value = props.minutes
  seconds.value = 0
  clearInterval(timerInterval)
  isTimerRunning.value = false
  startButtonText.value = text.start
}
</script>

<style lang="scss" scoped>
.timer-container {
  width: 250px;
  padding: 20px;
  .timer-buttons {
    @include flex;
    height: 70px;
    background: $white;
    border-radius: $border-radius-bottom;

    button {
      font-size: 20px;
      min-width: 60px;
      margin: 8px;

      &:hover {
        background-color: $action-color;
      }
    }
  }
}
</style>
