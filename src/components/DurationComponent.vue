<template>
  <div class="duration-container">
    <div class="duration">
      <p class="duration-number">{{ formattedTime }}</p>
      <div class="buttons-container">
        <button
          @click="incrementDuration"
          class="duration-button"
          :disabled="disabledButtons"
          :title="text.up"
        >
          <Icon class="icon" icon="mdi:plus" />
        </button>
        <button
          class="duration-button"
          :disabled="disabledDecrementButton"
          @click="decrementDuration"
          :title="text.down"
        >
          <Icon class="icon" icon="mdi:minus" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { Icon } from '@iconify/vue'

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

<style lang="scss" scoped>
.duration-container {
  @include flex;
  background-color: $white;
  padding-top: 24px;
  border-radius: $border-radius-top;

  .duration {
    @include flex;
    background-color: $black;
    color: $white;
    padding: $size-01;
    width: 110px;
    border-radius: $border-radius;

    .duration-number {
      color: $white;
      font-size: 24px;
    }
    .buttons-container {
      @include flex($flex-direction: column);
      margin-left: $size-02;

      .duration-button {
        height: 30px;
        min-width: 40px;
        margin: 0;
        border-radius: 0;

        &:first-of-type {
          border-bottom: none;
        }
      }
    }
  }
}
</style>
