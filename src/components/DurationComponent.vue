<template>
  <div class="duration-container">
    <span :class="{ 'final-number': countdownIsTen }" class="duration-number">{{
      formattedTime
    }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import audioFile from '@/assets/sounds/beep.mp3'

// PROPS
const props = defineProps({
  minutes: {
    type: Number,
    default: 1
  },
  seconds: {
    type: Number,
    default: 0
  },
  volumeDisabled: {
    type: Boolean,
    default: true
  }
})

// DATA
const audio = new Audio(audioFile)

// COMPUTED
const formattedTime = computed<string>(() => {
  return `${formatTime(props.minutes)}:${formatTime(props.seconds)}`
})

const countdownIsTen = computed(() => {
  const isRed = props.seconds >= 1 && props.seconds <= 3

  if (isRed && !props.volumeDisabled) {
    playSound()
  }
  return isRed
})

// METHODS
function formatTime(value: number): string {
  return value < 10 ? `0${value}` : value.toString()
}

function playSound() {
  audio.play()
}
</script>

<style lang="scss" scoped>
.duration-container {
  @include flex;
  width: 100%;
  background-color: $white;
  border-radius: $border-radius-top;

  .duration-number {
    width: 100%;
    font-size: 24px;
    color: $white;
    background-color: $black;
    padding: $size-01;
    border-radius: $border-radius-top;

    &.final-number {
      background-color: $main-color;
    }
  }
}
</style>
