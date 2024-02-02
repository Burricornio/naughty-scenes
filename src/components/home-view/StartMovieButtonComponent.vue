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
  width: 150px;
  height: 150px;
  background-color: $black;
  border-radius: 50%;
  text-transform: uppercase;
  font-size: 26px;
  animation: pulse 2s infinite;
  font-weight: bold;
  outline: none;
  border: 2px solid $black;
  cursor: pointer;

  &:hover {
    color: $red-02;
    background-color: $white;
    box-shadow: 0 0 0 0 $red-02;
    border-color: $red-02;
    animation: pulseHover 2s infinite;
  }
}

@keyframes pulse {
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 $red-02;
  }

  70% {
    transform: scale(1);
    box-shadow: 0 0 0 4px $red-02;
  }

  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 $red-02;
  }
}

@keyframes pulseHover {
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 $red-02;
  }
  70% {
    transform: scale(1);
    box-shadow: 0 0 0 4px $red-02;
  }
  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 $red-02;
  }
}
</style>
