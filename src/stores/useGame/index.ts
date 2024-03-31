import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { GameMode, GameModeName, Players, PlayersObject } from './types'

export const useGameStore = defineStore(
  'useGameStore',
  () => {
    const gameStartedFlag = ref<boolean>(false)
    const gameMode = ref<GameMode>(GameMode.UNSELECTED)
    const gameModeName = ref<GameModeName>()
    const gamesPlayedNumber = ref<number>(0)
    const playerNames = ref<PlayersObject>({
      player1: '',
      player2: ''
    })

    const viewTimer = ref<boolean>(false)

    const getGameMode = computed<GameMode | null>(() => gameMode.value)

    const getGameModeName = computed<GameModeName | undefined>(
      () => gameModeName.value
    )

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

    function setGameModeName(name: GameModeName) {
      gameModeName.value = name
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
      gameMode.value = GameMode.UNSELECTED
      gameModeName.value = undefined
    }

    return {
      $reset,
      addNewGamePlayed,
      gameStartedFlag,
      getGameMode,
      getGameStartedFlag,
      getGamesPlayedNumber,
      getPlayerNames,
      getGameModeName,
      getViewTimer,
      resetPlayerNames,
      setGameMode,
      setGameStartedFlag,
      setPlayerNames,
      setPlayersOrder,
      setViewTimer,
      setGameModeName,
      // Save in localstorage
      playerNames,
      viewTimer,
      gamesPlayedNumber,
      gameModeName,
      gameMode
    }
  },
  {
    persist: true
  }
)
