<template>
  <div class="duration-container">
    <span class="duration-number">{{ formattedTime }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

// PROPS
const props = defineProps({
  minutes: {
    type: Number,
    default: 1
  },
  seconds: {
    type: Number,
    default: 0
  }
})

// COMPUTED
const formattedTime = computed<string>(() => {
  return `${formatTime(props.minutes)}:${formatTime(props.seconds)}`
})

// METHODS
function formatTime(value: number): string {
  return value < 10 ? `0${value}` : value.toString()
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
  }
}
</style>
