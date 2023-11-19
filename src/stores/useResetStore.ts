import { defineStore } from 'pinia'
// import { useCardsStore } from './useCardsStore'
// import { useButtonsStore } from './useButtonsStore'
// import { useGameStore } from './useGameStore'

export const useResetStore = defineStore('useResetStore', () => {
  // const buttonsStore = useButtonsStore()
  // const gameStore = useGameStore()
  // const cardsStore = useCardsStore()

  function resetState() {
    // TODO - resetear
    console.log('reset')
    // cardsStore.$reset()
    // gameStore.$reset()
    // buttonsStore.$reset()
  }

  return {
    resetState
  }
})
