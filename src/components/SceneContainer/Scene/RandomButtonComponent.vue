<template>
  <div v-if="options && options.length" class="random-button-container">
    <!-- <button class="secondary" @click="getRandomOption(options)">AZAR</button> -->
    <p class="random-text">{{ text.randomText }}</p>
    <button
      v-if="!randomOption"
      @click="getRandomOption(options)"
      :title="text.random"
    >
      <Icon class="icon" icon="mdi:dice" />
    </button>
    <div v-else class="random-result-container">
      <p class="random-result">{{ randomOption }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useModeStore } from '@/stores/useMode'
import { ModeName } from '@/stores/useMode/types'
import { useI18n } from 'vue-i18n'
import { getRandomArrayElement } from '@/helpers/array'
import { Icon } from '@iconify/vue'

// PROPS
const props = defineProps<{
  options: string[]
}>()

// STORE
const modeStore = useModeStore()

// TEXT
const { t } = useI18n()

const text = {
  random: t('button.random'),
  randomText: t('button.random_text')
}

// DATA
const randomOption = ref<string>('')

// COMPUTED
const modeColor = computed(() => {
  modeColor
  switch (modeStore.getModeName) {
    case ModeName.IMPRO:
      return '#5b22d0'
    case ModeName.ACTOR:
      return '#e58111'
    case ModeName.DIRECTOR:
      return '#528232'
    default:
      return 'vlack'
  }
})

// const styles = computed(() => {
//   return {
//     '--mode-color': modeColor.value
//   }
// })

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
  @include flex($flex-direction: column);
  @include round-button;
  width: 100%;
  border-top: 2px solid var(--mode-color, $main-color);
  border-bottom: 2px solid var(--mode-color, $main-color);
  background-color: $main-color;
  color: $white;
  border-radius: 0 0 $border-radius $border-radius;
  padding: 16px 0;

  .random-text {
    color: $white;
    margin-bottom: 15px;
    font-weight: bold;
  }

  button {
    // border-color: var(--mode-color, $main-color);
    // color: var(--mode-color, $main-color);
    color: $white;

    &:hover {
      border-color: $white;
      background-color: $white;
    }
  }

  .random-result-container {
    @include flex;
    height: 40px;
    width: 100%;

    .random-result {
      @include flex;
      height: 30px;
      padding: 4px 30px;
      font-weight: bold;
      color: $main-color;
      background-color: $white;
      border-radius: $border-radius;
    }
  }
}
</style>
