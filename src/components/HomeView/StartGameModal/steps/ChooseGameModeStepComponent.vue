<template>
  <div class="step-two-container">
    <div v-for="mode in modes" :key="mode.name" class="mode-container">
      <div class="row">
        <button class="mode-btn" @click="mode.action">{{ mode.name }}</button>
      </div>
      <div class="row">
        <p class="explanation">{{ mode.explanation }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useCountdownStore } from '@/stores/useCountdownStore'
import { GameModeName } from '@/stores/useGameStore'

// STORE
const countdownStore = useCountdownStore()

// ROUTER
const router = useRouter()

const modes = [
  {
    name: GameModeName.IMPRO,
    action: () => goToView(GameModeName.IMPRO),
    explanation:
      'En este modo de juego las escenas van apareciendo aleatoriamente de una a una'
  },
  {
    name: GameModeName.ACTOR,
    action: () => goToView(GameModeName.ACTOR),
    explanation:
      'En este modo de juego seelciionas el número de escenas que quieres rodar En este modo de juego seelciionas el número de escenas que quieres rodar En este modo de juego seelciionas el número de escenas que quieres rodar En este modo de juego seelciionas el número de escenas que quieres rodar'
  },
  {
    name: GameModeName.DIRECTOR,
    action: () => goToView(GameModeName.DIRECTOR),
    explanation:
      'En este modo de juego lo configuras todo como quieras y puedes cargar y grabar escenas'
  }
]

function goToView(name: string) {
  countdownStore.setCountdownStatus(true)
  router.push({ name })
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

  // .input-container {
  //   margin-bottom: 10px;
  // }

  // .chooose-cards-container {
  //   @include flex($justify-content: space-between);
  //   width: 100%;

  //   button {
  //     @include flex;
  //     width: 240px;
  //     height: 250px;
  //     text-transform: uppercase;
  //     background-color: $purple;
  //     border: none;
  //     font-size: 20px;
  //     padding: 20px;

  //     &:hover {
  //       background-color: $fuchsia;
  //     }
  //   }
  // }
}
</style>