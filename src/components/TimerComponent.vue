<template>
  <div>
    <div>
      <button @click="startTimer" :disabled="isTimerRunning">
        {{ startButtonText }}
      </button>
      <button @click="stopTimer" :disabled="!isTimerRunning">
        {{ text.stop }}
      </button>
      <button @click="resetTimer" :disabled="!canReset">
        {{ text.reset }}
      </button>
    </div>
    <DurationComponent
      @up-duration="increment"
      @down-duration="decrement"
      :minutes="minutesRef"
      :seconds="seconds"
      :disabledButtons="isTimerRunning"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect, watch } from 'vue'
import DurationComponent from '@/components/DurationComponent.vue'
import { useI18n } from 'vue-i18n'

// PROPS
const props = defineProps({
  minutes: {
    type: Number,
    default: 1
  }
})

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
const minutesRef = ref<number>(props.minutes)
const isTimerRunning = ref<boolean>(false)
const canReset = ref<boolean>(false)
const startButtonText = ref<string>(text.start)

// WATCH
watch(
  () => props.minutes,
  () => {
    resetTimer()
  }
)

watchEffect(() => {
  if (minutesRef.value === 0 && seconds.value === 0) {
    clearInterval(timerInterval)
    isTimerRunning.value = false
    canReset.value = false
    startButtonText.value = text.restart
    minutesRef.value = 1
    seconds.value = 0
  }
})

// METHODS
function startTimer(): void {
  startButtonText.value = text.start
  canReset.value = false
  timerInterval = setInterval(() => {
    if (minutesRef.value === 0 && seconds.value === 0) {
      clearInterval(timerInterval)
      isTimerRunning.value = false
      canReset.value = true
    } else {
      if (seconds.value === 0) {
        minutesRef.value--
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
  canReset.value = true
  startButtonText.value = text.continue
}

function resetTimer(): void {
  minutesRef.value = props.minutes
  seconds.value = 0
  clearInterval(timerInterval)
  isTimerRunning.value = false
  canReset.value = false
  startButtonText.value = text.start
}

function increment(): void {
  minutesRef.value++
}

function decrement(): void {
  if (minutesRef.value === 0) {
    return
  }
  minutesRef.value--
}
</script>
