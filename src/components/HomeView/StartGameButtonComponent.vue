<template>
  <button
    class="start-movie-btn"
    v-if="!useMovie.getGameStartedFlag"
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
import { useMovieStore } from '@/stores/useMovieStore'

// STORE
const sceneStore = useSceneStore()
const useMovie = useMovieStore()

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
  width: 145px;
  height: 145px;
  color: $white;
  background-color: $main-color;
  border-radius: 50%;
  text-transform: uppercase;
  font-size: 26px;
  animation: pulse 2s infinite;
  font-weight: bold;
  outline: none;
  border: 1px solid $white;
  cursor: pointer;

  &:hover {
    color: $white;
    background-color: #caa406;
    animation: pulseHover 2s infinite;
  }
}

@keyframes pulse {
  0% {
    transform: scale(0.98);
    box-shadow: 0 0 0 0 $white;
  }

  70% {
    transform: scale(1);
    box-shadow: 0 0 0 1px $white;
  }

  100% {
    transform: scale(0.98);
    box-shadow: 0 0 0 0 $white;
  }
}

@keyframes pulseHover {
  0% {
    transform: scale(0.98);
    box-shadow: 0 0 0 0 $white;
  }
  70% {
    transform: scale(1);
    box-shadow: 0 0 0 1px $white;
  }
  100% {
    transform: scale(0.98);
    box-shadow: 0 0 0 0 $white;
  }
}
</style>
