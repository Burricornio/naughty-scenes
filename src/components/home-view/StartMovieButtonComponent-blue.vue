<template>
  <button
    class="start-movie-btn"
    v-if="!sceneStore.getCurrentScene"
    @click="openModal"
  >
    {{ startTextButton }}
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import useModal from '@/composables/useModal'
import { useSceneStore } from '@/stores/useSceneStore'

// STORE
const sceneStore = useSceneStore()

// TEXTS
const { t } = useI18n()
const text = {
  playAgain: t('play_again'),
  play: t('button.play')
}

const { openModal } = useModal()

// COMPUTED
const startTextButton = computed<string>(() =>
  sceneStore.getScenesLength ? text.playAgain : text.play
)
</script>

<style lang="scss" scoped>
.start-movie-btn {
  width: 130px;
  height: 56px;
  background-color: $main-color;
  border-radius: 50%;
  text-transform: uppercase;
  font-size: 1.2em;
  box-shadow: 0 0 0 0 $white;
  animation: pulse 2s infinite;
  font-weight: bold;
  outline: none;
  border: 1px solid $black;
  cursor: pointer;

  &:hover {
    background-color: $fuchsia;
    box-shadow: 0 0 0 0 $main-color;
    animation: pulseHover 2s infinite;
  }
}

@keyframes pulse {
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 $purple;
  }

  70% {
    transform: scale(1);
    box-shadow: 0 0 0 8px $black;
  }

  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 $black;
  }
}

@keyframes pulseHover {
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 $purple;
  }
  70% {
    transform: scale(1);
    box-shadow: 0 0 0 10px $black;
  }
  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 $black;
  }
}
</style>
