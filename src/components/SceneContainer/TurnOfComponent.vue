<template>
  <h2
    v-if="!sceneStore.allScenesPlayed && sceneStore.getCurrentScene"
    class="turn-text"
  >
    {{ text.turn }}:
    <span class="player-name">{{ playerTurn }}</span>
  </h2>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useGameStore } from '@/stores/useGame'
import { useSceneStore } from '@/stores/useScene'

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
$height: 54px;
.turn-text {
  @include flex;
  width: 100%;
  background: $white;
  height: $height;
  min-height: $height;
  font-weight: bold;
  margin: 0;

  .player-name {
    color: $black;
    margin-left: 5px;
    text-transform: uppercase;
  }
}
</style>
