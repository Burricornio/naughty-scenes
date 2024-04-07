import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { Players, PlayersObject } from './types'

export const useGameStore = defineStore(
  'useGameStore',
  () => {
    const gameStartedFlag = ref<boolean>(false)
    const gamesPlayedNumber = ref<number>(0)
    const playerNames = ref<PlayersObject>({
      player1: '',
      player2: ''
    })

    const viewTimer = ref<boolean>(false)

    const getViewTimer = computed<boolean>(() => viewTimer.value)

    const getGameStartedFlag = computed<boolean>(() => gameStartedFlag.value)

    const getGamesPlayedNumber = computed<number>(() => gamesPlayedNumber.value)

    const getPlayerNames = computed<PlayersObject>(() => playerNames.value)

    function setGameStartedFlag(value: boolean) {
      gameStartedFlag.value = value
    }

    function addNewGamePlayed() {
      gamesPlayedNumber.value++
    }

    function setPlayerNames(payload: {
      player: keyof Players['playerNames']
      name: string
    }) {
      const { player, name } = payload
      playerNames.value[player] = name
    }

    function setPlayersOrder(payload: PlayersObject) {
      playerNames.value = payload
    }

    function resetPlayerNames() {
      playerNames.value.player1 = ''
      playerNames.value.player2 = ''
    }

    function setViewTimer(value: boolean) {
      viewTimer.value = value
    }

    function $reset() {
      gameStartedFlag.value = false
      playerNames.value = {
        player1: '',
        player2: ''
      }
    }

    return {
      $reset,
      addNewGamePlayed,
      gameStartedFlag,
      getGameStartedFlag,
      getGamesPlayedNumber,
      getPlayerNames,
      getViewTimer,
      resetPlayerNames,
      setGameStartedFlag,
      setPlayerNames,
      setPlayersOrder,
      setViewTimer,
      // Save in localstorage
      playerNames,
      viewTimer,
      gamesPlayedNumber
    }
  },
  {
    persist: true
  }
)
