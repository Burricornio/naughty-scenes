<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

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
  disabledButtons: {
    type: Boolean,
    default: false
  }
})

// DATA
const { t } = useI18n()

const text = {
  up: t('button.increment'),
  down: t('button.decrement')
}

// COMPUTED
const formattedTime = computed<string>(() => {
  return `${formatTime(props.minutes)}:${formatTime(props.seconds)}`
})

const disabledDecrementButton = computed<boolean>(() => {
  return (props.minutes === 1 && props.seconds === 0) || props.disabledButtons
})

// EMITS
const emit = defineEmits(['up-duration', 'down-duration'])

function incrementDuration() {
  emit('up-duration')
}

function decrementDuration() {
  emit('down-duration')
}

// METHODS
function formatTime(value: number): string {
  return value < 10 ? `0${value}` : value.toString()
}
</script>

<template>
  <div>
    <p>{{ formattedTime }}</p>
    <button @click="incrementDuration" :disabled="disabledButtons">
      {{ text.up }}
    </button>
    <button :disabled="disabledDecrementButton" @click="decrementDuration">
      {{ text.down }}
    </button>
  </div>
</template>
