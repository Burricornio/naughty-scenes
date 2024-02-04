<template>
  <div class="countdown-container">
    <p :class="['numbers', numberClassColor]" v-if="count > 0">{{ count }}</p>
    <p class="timesup" v-else>{{ text.timesUp }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import { useCountdownStore } from '@/stores/useCountdownStore'
import { useI18n } from 'vue-i18n'

// STORE
const countdownStore = useCountdownStore()

// DATA
const count = ref<number>(3)

// COMPUTED
const numberClassColor = computed(() => {
  switch (count.value) {
    case 2:
      return 'yellow'
    case 3:
      return 'pink'
    default:
      return 'white'
  }
})

// TEXT
const { t } = useI18n()

const text = {
  timesUp: t('component.countdown.times_up')
}

// WATCH
watch(
  () => count.value,
  () => {
    if (count.value === 0) {
      countdownStore.setCountdownStatus(false)
    }
  }
)

onMounted(() => {
  const timer = setInterval(() => {
    if (count.value > 0) {
      count.value--
    } else {
      clearInterval(timer)
    }
  }, 1000)
})
</script>

<style lang="scss">
.countdown-container {
  @include flex;
  height: 100vh;

  .numbers {
    @include borders($color: $main-color, $width: 4px);
    @include flex;
    border-radius: 50%;
    width: 180px;
    height: 180px;

    &.yellow {
      color: $action-color;
      border-color: $action-color;
    }

    &.white {
      color: $white;
      border-color: $white;
    }

    &.pink {
      color: $main-color;
      border-color: $main-color;
    }
  }

  .numbers,
  .timesup {
    font-family: $secondary-font;
    font-size: 110px;
    font-weight: bold;
  }

  .timesup {
    font-size: 30px;
    color: $white;
  }
}
</style>
