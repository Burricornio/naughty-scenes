import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export interface PlayersObject {
  player1: string
  player2: string
}
export interface Players {
  playerNames: PlayersObject
}

export enum GameMode {
  UNSELECTED = 0,
  IMPRO = 1,
  ACTOR = 2,
  DIRECTOR = 3
}

export enum GameModeName {
  IMPRO = 'Impro',
  ACTOR = 'Actor',
  DIRECTOR = 'Director'
}

export const useGameStore = defineStore(
  'useGameStore',
  () => {
    const gameStartedFlag = ref<boolean>(false)
    const gameMode = ref<GameMode>(GameMode.UNSELECTED)
    const gamesPlayedNumber = ref<number>(0)
    const playerNames = ref<PlayersObject>({
      player1: '',
      player2: ''
    })

    const viewTimer = ref<boolean>(false)

    const getGameMode = computed<GameMode | null>(() => gameMode.value)

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

    function setGameMode(mode: GameMode) {
      gameMode.value = mode
    }
    function setViewTimer(value: boolean) {
      viewTimer.value = value
    }

    function $reset() {
      gameStartedFlag.value = false
      gameMode.value = GameMode.UNSELECTED
      playerNames.value = {
        player1: '',
        player2: ''
      }
    }

    return {
      $reset,
      addNewGamePlayed,
      gameStartedFlag,
      getGameMode,
      getGameStartedFlag,
      getGamesPlayedNumber,
      getPlayerNames,
      getViewTimer,
      resetPlayerNames,
      setGameMode,
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
