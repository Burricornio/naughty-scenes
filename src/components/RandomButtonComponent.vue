<script setup lang="ts">
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { getRandomArrayElement } from '@/helpers/array'

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

<template>
  <div v-if="options && options.length">
    <button @click="getRandomOption(options)">{{ text.random }}</button>
    <div>{{ randomOption }}</div>
  </div>
</template>
