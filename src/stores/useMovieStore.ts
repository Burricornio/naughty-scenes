import { computed, reactive, ref } from 'vue'
import { defineStore } from 'pinia'

interface Players {
  playerNames: { player1: string; player2: string }
}

export const useMovieStore = defineStore('useMovieStore', () => {
  // const gameStartedFlag = ref<boolean>(false)
  // const playedGamesNumber = ref<number>(0)
  const playerNames = reactive<{ player1: string; player2: string }>({
    player1: '',
    player2: ''
  })

  // const getGameStartedFlag = computed<boolean>(() => gameStartedFlag.value)
  // const getPlayedGamesNumber = computed<number>(() => playedGamesNumber.value)
  const getPlayerNames = computed<{ player1: string; player2: string }>(
    () => playerNames
  )

  // function setGameStartedFlag(value: boolean) {
  //   gameStartedFlag.value = value
  // }

  // function addNewGamePlayed() {
  //   playedGamesNumber.value++
  // }

  function setPlayerNames(payload: {
    player: keyof Players['playerNames']
    name: string
  }) {
    const { player, name } = payload
    playerNames[player] = name
  }

  // function $reset() {
  //   gameStartedFlag.value = false
  //   playedGamesNumber.value = 0
  //   playerNames.player1 = ''
  //   playerNames.player2 = ''
  // }

  return {
    // setPlayerNames,
    // addNewGamePlayed,
    // setGameStartedFlag,
    // $reset,
    // gameStartedFlag,
    // playerNames,
    // getGameStartedFlag,
    // getPlayedGamesNumber,
    setPlayerNames,
    getPlayerNames
  }
})
