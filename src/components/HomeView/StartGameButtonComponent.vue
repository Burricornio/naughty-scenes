<template>
  <button
    class="start-movie-btn"
    v-if="!useGame.getGameStartedFlag"
    @click="openModal"
  >
    <Icon icon="material-symbols:play-arrow" class="play-icon" />
  </button>
</template>

<script setup lang="ts">
import useModal from '@/composables/useModal'
import { useGameStore } from '@/stores/useGame'
import { Icon } from '@iconify/vue'

// STORE
const useGame = useGameStore()

const { openModal } = useModal()
</script>

<style lang="scss" scoped>
.start-movie-btn {
  width: 145px;
  height: 145px;
  color: $white;
  background-color: $main-color;
  border-radius: 50%;
  animation: pulse 2s infinite;
  outline: none;
  border: 1px solid $white;
  cursor: pointer;

  &:hover {
    color: $white;
    background-color: $green-02;
    animation: pulseHover 2s infinite;
  }

  .play-icon {
    font-size: 90px;
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
