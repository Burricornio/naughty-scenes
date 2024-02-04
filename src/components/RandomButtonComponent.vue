<template>
  <div class="random-button-container" v-if="options && options.length">
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
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { getRandomArrayElement } from '@/helpers/array'
import { Icon } from '@iconify/vue'

// PROPS
const props = defineProps<{
  options: string[]
}>()

// DATA
const { t } = useI18n()

const text = {
  random: t('button.random')
}

const randomOption = ref<string>('')

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
  border-top: 2px solid $main-color;
  border-bottom: 2px solid $main-color;
  background-color: $white;

  button {
    border-color: $main-color;
    color: $main-color;

    &:hover {
      border-color: $action-color;
    }
  }

  .random-text {
    color: $main-color;
  }
}
</style>
