<template>
  <h2
    :class="['turn-text', gameStore.getGameModeName]"
    v-if="!sceneStore.allScenesPlayed && sceneStore.getCurrentScene"
  >
    {{ text.turn }}:
    <span class="player-name">{{ playerTurn }}</span>
  </h2>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useGameStore } from '@/stores/useGame'
import { useSceneStore } from '@/stores/useSceneStore'

// STORE
const sceneStore = useSceneStore()
const gameStore = useGameStore()

// TEXTS
const { t } = useI18n()
const text = { allPlayed: t('all_played'), turn: t('turn') }

const playerTurn = computed<string>(() => {
  const playerNames = Object.values(gameStore.getPlayerNames)
  return playerNames[sceneStore.getSceneIndex % playerNames.length]
})
</script>

<style lang="scss">
.turn-text {
  @include flex;
  width: 100%;
  background: $white;
  height: 54px;
  color: $main-color;
  font-weight: bold;
  margin: 0;

  &.impro {
    color: $impro-color;
  }

  &.actor {
    color: $actor-color;
  }

  &.director {
    color: $director-color;
  }

  .player-name {
    color: $black;
    margin-left: 5px;
    text-transform: uppercase;
  }
}
</style>
