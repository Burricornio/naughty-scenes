<template>
  <div
    v-if="options && options.length"
    class="random-button-container"
    :style="styles"
  >
    <button
      v-if="!randomOption"
      @click="getRandomOption(options)"
      :title="text.random"
    >
      <Icon class="icon" icon="mdi:dice" />
    </button>
    <div v-else class="random-text">{{ randomOption }}</div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useGameStore } from '@/stores/useGame'
import { GameModeName } from '@/stores/useGame/types'
import { useI18n } from 'vue-i18n'
import { getRandomArrayElement } from '@/helpers/array'
import { Icon } from '@iconify/vue'

// PROPS
const props = defineProps<{
  options: string[]
}>()

// STORE
const gameStore = useGameStore()

// TEXT
const { t } = useI18n()

const text = {
  random: t('button.random')
}

// DATA
const randomOption = ref<string>('')

// COMPUTED
const modeColor = computed(() => {
  modeColor
  switch (gameStore.getGameModeName) {
    case GameModeName.IMPRO:
      return '#5b22d0'
    case GameModeName.ACTOR:
      return '#e58111'
    case GameModeName.DIRECTOR:
      return '#528232'
    default:
      return 'vlack'
  }
})

const styles = computed(() => {
  return {
    '--mode-color': modeColor.value
  }
})

// WATCH
watch(
  () => props.options,
  () => {
    randomOption.value = ''
  }
)
// METHODS
function getRandomOption(options: string[]): void {
  randomOption.value = getRandomArrayElement(options)
}
</script>

<style lang="scss" scoped>
.random-button-container {
  @include flex;
  @include round-button;
  width: 100%;
  height: 54px;
  border-top: 2px solid var(--mode-color, $main-color);
  border-bottom: 2px solid var(--mode-color, $main-color);
  background-color: $white;

  button {
    border-color: var(--mode-color, $main-color);
    color: var(--mode-color, $main-color);

    &:hover {
      border-color: var(--mode-color, $main-color);
      background-color: var(--mode-color, $main-color);
    }
  }
}
</style>
