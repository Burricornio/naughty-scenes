import { defineStore } from 'pinia'
import { GameMode, useMovieStore } from './useMovieStore'
import { useSceneStore } from './useSceneStore'
// import { useCardsStore } from './useCardsStore'
// import { useButtonsStore } from './useButtonsStore'
// import { useGameStore } from './useGameStore'

export const useResetStore = defineStore('useResetStore', () => {
  // const buttonsStore = useButtonsStore()
  // const gameStore = useGameStore()
  // const cardsStore = useCardsStore()
  const movieStore = useMovieStore()
  const sceneStore = useSceneStore()

  function resetGame() {
    // TODO - resetear
    // TODO - ¿Vaciar localstorage?
    console.log('reset')
    sceneStore.$reset()
    movieStore.$reset()
    // cardsStore.$reset()
    // gameStore.$reset()
    // buttonsStore.$reset()
  }

  return {
    resetGame
  }
})
