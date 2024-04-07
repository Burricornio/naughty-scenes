import { defineStore } from 'pinia'
import { useSceneStore } from './useScene'
import { useGameStore } from './useGame'
import { useModeStore } from './useMode'
// import { useCardsStore } from './useCardsStore'
// import { useButtonsStore } from './useButtonsStore'
// import { useGameStore } from '.'

export const useResetStore = defineStore('useResetStore', () => {
  // const buttonsStore = useButtonsStore()
  // const gameStore = useGameStore()
  // const cardsStore = useCardsStore()
  const sceneStore = useSceneStore()
  const gameStore = useGameStore()
  const modeStore = useModeStore()

  function resetLocalStorage() {
    const stores = ['useSceneStore', 'useGameStore', 'useModeStore']
    stores.forEach((key: string) => localStorage.removeItem(key))
  }

  function resetGame() {
    // TODO - resetear
    // TODO - ¿Vaciar localstorage?
    sceneStore.$reset()
    gameStore.$reset()
    modeStore.$reset()
    // cardsStore.$reset()
    // gameStore.$reset()
    // buttonsStore.$reset()
  }

  return {
    resetGame,
    resetLocalStorage
  }
})
