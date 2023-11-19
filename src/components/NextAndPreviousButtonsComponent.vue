<script setup lang="ts">
import { useI18n } from 'vue-i18n'

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
  }
})

// DATA
const { t } = useI18n()

const text = {
  next: t('button.next'),
  previous: t('button.previous')
}
</script>

<template>
  <div>
    <button @click="props.goPrev" :disabled="prevButtonDisabled">
      {{ text.previous }}
    </button>
    <button @click="props.goNext">
      {{ text.next }}
    </button>
  </div>
</template>
