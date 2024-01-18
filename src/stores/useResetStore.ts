import { defineStore } from 'pinia'
import { useMovieStore } from './useMovieStore'
import { useSceneStore } from './useSceneStore'
// import { useCardsStore } from './useCardsStore'
// import { useButtonsStore } from './useButtonsStore'
// import { useGameStore } from './useGameStore'

export const useResetStore = defineStore('useResetStore', () => {
  // const buttonsStore = useButtonsStore()
  // const gameStore = useGameStore()
  // const cardsStore = useCardsStore()
  const { resetPlayerNames } = useMovieStore()
  const { setCurrentScene } = useSceneStore()

  function resetGame() {
    // TODO - resetear
    console.log('reset')
    resetPlayerNames()
    setCurrentScene(null)
    // cardsStore.$reset()
    // gameStore.$reset()
    // buttonsStore.$reset()
  }

  return {
    resetGame
  }
})
