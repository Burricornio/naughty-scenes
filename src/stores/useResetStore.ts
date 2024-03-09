import { defineStore } from 'pinia'
import { useSceneStore } from './useSceneStore'
import { useGameStore } from './useGameStore'
// import { useCardsStore } from './useCardsStore'
// import { useButtonsStore } from './useButtonsStore'
// import { useGameStore } from './useGameStore'

export const useResetStore = defineStore('useResetStore', () => {
  // const buttonsStore = useButtonsStore()
  // const gameStore = useGameStore()
  // const cardsStore = useCardsStore()
  const sceneStore = useSceneStore()
  const gameStore = useGameStore()

  function resetLocalStorage() {
    const stores = ['useSceneStore', 'useGameStore']
    stores.forEach((key: string) => localStorage.removeItem(key))
  }

  function resetGame() {
    // TODO - resetear
    // TODO - ¿Vaciar localstorage?
    sceneStore.$reset()
    gameStore.$reset()
    // cardsStore.$reset()
    // gameStore.$reset()
    // buttonsStore.$reset()
  }

  return {
    resetGame,
    resetLocalStorage
  }
})
