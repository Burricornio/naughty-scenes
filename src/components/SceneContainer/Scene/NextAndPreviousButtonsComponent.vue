<template>
  <div class="next-and-previous-container">
    <button
      @click="props.goPrev"
      class="next-and-previous-button"
      :disabled="prevButtonDisabled"
      :title="text.previous"
    >
      <Icon class="icon" icon="mdi:chevron-double-left" />
    </button>
    <span class="title">{{ title }}</span>
    <button
      @click="props.goNext"
      class="next-and-previous-button"
      :disabled="nextButtonDisabled"
      :title="text.next"
    >
      <Icon class="icon" icon="mdi:chevron-double-right" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
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
  nextButtonDisabled: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    required: true
  }
})

// DATA
const { t } = useI18n()

const text = {
  next: t('button.next'),
  previous: t('button.previous')
}
</script>

<style lang="scss" scoped>
.next-and-previous-container {
  @include flex($justify-content: space-between);
  @include round-button($size: 30px);
  width: 100%;
  padding: 10px 0;

  .title {
    font-size: 20px;
    font-weight: bold;
    color: $white;
  }

  button:disabled {
    border-color: transparent;
    background-color: transparent;

    .icon {
      color: $disabled-color;
    }
  }

  .next-and-previous-button {
    margin: 0 30px;
  }
}
</style>
