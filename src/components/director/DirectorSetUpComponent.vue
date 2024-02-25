<template>
  <section class="director-setup-container">
    <div class="choose-player-order-container">
      <p>¿Quién inicia el juego?</p>
      <div class="radio-buttons">
        <label
          v-for="(name, index) in Object.values(getPlayerNames)"
          :key="index"
          class="radio-button"
        >
          <input
            type="radio"
            class="radio"
            :value="name"
            v-model="selectedPlayer"
            name="playerSelection"
            @change="updatePlayerOrder"
          />
          {{ name }}
        </label>
      </div>
    </div>
    <hr />
    <div class="choose-counter-container">
      <p>¿Quieres utilizar temporizador?</p>
      <div class="radio-buttons">
        <label class="radio-button">
          <input
            type="radio"
            class="radio"
            value="si"
            name="timerSelection"
            @change="toogleTimer(true)"
          />
          Si
        </label>
        <label class="radio-button">
          <input
            type="radio"
            value="no"
            name="timerSelection"
            @change="toogleTimer(false)"
          />
          No
        </label>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { PlayersObject, useMovieStore } from '@/stores/useMovieStore'
import { ref } from 'vue'

// STORE
const { getPlayerNames, setPlayersOrder, setViewTimer } = useMovieStore()

const selectedPlayer = ref<string>('')

function updatePlayerOrder(): void {
  const orderedPlayers: PlayersObject = {
    player1: selectedPlayer.value,
    player2: Object.values(getPlayerNames).find(
      (name) => name !== selectedPlayer.value
    )
  }
  console.log(orderedPlayers)
  setPlayersOrder(orderedPlayers)
}

function toogleTimer(value: boolean) {
  setViewTimer(value)
}
</script>

<style lang="scss" scoped>
.director-setup-container {
  @include flex($flex-direction: column);
  padding: 30px;

  .choose-player-order-container,
  .choose-counter-container {
    width: 100%;

    div {
      @include flex;
      .radio-button {
        @include flex;
        margin: 10px 20px;
        font-size: 18px;
        display: grid;
        grid-template-columns: 1em auto;
        gap: 10px;
      }
    }
  }
}
</style>
