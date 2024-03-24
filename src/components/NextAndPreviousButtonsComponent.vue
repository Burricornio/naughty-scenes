<template>
  <div class="next-and-previous-container">
    <button
      @click="props.goPrev"
      :disabled="prevButtonDisabled"
      :title="text.previous"
      :class="gameStore.getGameModeName"
    >
      <Icon class="icon" icon="mdi:chevron-double-left" />
    </button>
    <span class="title">{{ title }}</span>
    <button
      @click="props.goNext"
      :title="text.next"
      :class="gameStore.getGameModeName"
    >
      <Icon class="icon" icon="mdi:chevron-double-right" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useGameStore } from '@/stores/useGame'
import { Icon } from '@iconify/vue'

// PROPS
const props = defineProps({
  goPrev: {
    type: Function,
    required: true
  },
  goNext: {
    type: Function,
    required: true
  },
  prevButtonDisabled: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    required: true
  }
})

// STORE
const gameStore = useGameStore()

// DATA
const { t } = useI18n()

const text = {
  next: t('button.next'),
  previous: t('button.previous')
}
</script>

<style lang="scss" scoped>
.next-and-previous-container {
  @include flex;
  @include round-button;
  @include mode-button-hover;
  height: 54px;
  width: 100%;

  .title {
    text-transform: uppercase;
    font-size: 22px;
    font-weight: bold;
    color: $white;
    margin: 0 10%;
  }

  button:disabled {
    border-color: transparent;
    background-color: transparent;
  }
}
</style>
