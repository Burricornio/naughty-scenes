<template>
  <div class="step-two-container">
    <div v-for="mode in modes" :key="mode.name" class="mode-container">
      <div class="row">
        <button class="mode-btn" @click="mode.action">
          {{ mode.name }}
        </button>
      </div>
      <div class="row">
        <p class="explanation">{{ mode.explanation }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useModalsStore } from '@/stores/useModalsStore'
import { useRouter } from 'vue-router'
import { useGameStore } from '@/stores/useGame'
import { useCountdownStore } from '@/stores/useCountdownStore'
import { GameModeName } from '@/stores/useGame/types'
import { Step } from './types/stepsTypes'

// STORE
const countdownStore = useCountdownStore()
const modalsStore = useModalsStore()
const { setGameModeName } = useGameStore()

// ROUTER
const router = useRouter()

const modes = [
  {
    name: GameModeName.IMPRO,
    explanation:
      'En este modo de juego las escenas van apareciendo aleatoriamente de una a una',
    action: () => goToView(GameModeName.IMPRO)
  },
  {
    name: GameModeName.ACTOR,
    explanation:
      'En este modo de juego seelciionas el número de escenas que quieres rodar En este modo de juego seelciionas el número de escenas que quieres rodar En este modo de juego seelciionas el número de escenas que quieres rodar En este modo de juego seelciionas el número de escenas que quieres rodar',
    action: () => goToSelectNumberOfScenesStep(GameModeName.ACTOR)
  },
  {
    name: GameModeName.DIRECTOR,
    explanation:
      'En este modo de juego lo configuras todo como quieras y puedes cargar y grabar escenas',
    action: () => goToView(GameModeName.DIRECTOR)
  }
]

function goToView(name: string) {
  countdownStore.setCountdownStatus(true)
  router.push({ name })
}

function goToSelectNumberOfScenesStep(name: GameModeName) {
  modalsStore.setStartMovieModalCurrentStep(Step.SELECTE_SCENES_NUMBER)
  setGameModeName(name)
}
</script>

<style lang="scss" scoped>
.step-two-container {
  @include flex;
  margin: 10px 0 20px 0;

  .mode-container {
    @include flex($flex-direction: column);
    @include borders($color: $modal-color);
    max-width: 300px;
    min-height: 150px;
    margin: 10px;
    border-radius: $border-radius;
    align-self: flex-start;

    .explanation {
      align-self: flex-start;
      text-align: left;
      margin-top: 10px;
      padding: 10px;
    }
  }
}
</style>
