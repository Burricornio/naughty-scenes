import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import moviesJSON from '@/assets/movies.json'
import { Scene, useSceneStore } from './useSceneStore'

export interface PlayersObject {
  player1: string
  player2: string
}
export interface Players {
  playerNames: PlayersObject
}

interface Movie {
  id: number
  title: string
  date: string
  scenes: string
}

export interface MovieParsed {
  id: number
  title: string
  date: string
  scenes: Scene[]
}

export enum GameMode {
  UNSELECTED = 0,
  IMPRO = 1,
  ACTOR = 2,
  DIRECTOR = 3
}

export const useMovieStore = defineStore('useMovieStore', () => {
  // const gameStartedFlag = ref<boolean>(false)
  const { getDefaultScenes } = useSceneStore()

  const gameMode = ref<GameMode>(GameMode.UNSELECTED)
  const playedMoviesNumber = ref<number>(0)
  const playerNames = ref<PlayersObject>({
    player1: '',
    player2: ''
  })
  const movies = ref<Movie[]>(moviesJSON)
  const viewTimer = ref<boolean>(false)

  const getMovies = computed(() => {
    const final = movies.value.map((movie: Movie) => {
      return {
        ...movie,
        scenes: JSON.parse(movie.scenes).map((sceneId: number) => {
          return getDefaultScenes.find((scene) => {
            return scene.id === sceneId
          })
        })
      }
    })
    return final
  })

  const getGameMode = computed<GameMode | null>(() => gameMode.value)

  const getViewTimer = computed<boolean>(() => viewTimer.value)

  // const getGameStartedFlag = computed<boolean>(() => gameStartedFlag.value)
  // const getPlayedMoviesNumber = computed<number>(() => playedMoviesNumber.value)

  const getPlayerNames = computed<PlayersObject>(() => playerNames.value)

  // function setGameStartedFlag(value: boolean) {
  //   gameStartedFlag.value = value
  // }

  function addNewGamePlayed() {
    playedMoviesNumber.value++
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
    // gameStartedFlag.value = false
    // playedGamesNumber.value = 0
    playerNames.value.player1 = ''
    playerNames.value.player2 = ''
  }

  function setGameMode(mode: GameMode) {
    gameMode.value = mode
  }
  function setViewTimer(value: boolean) {
    viewTimer.value = value
  }

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
    getPlayerNames,
    addNewGamePlayed,
    resetPlayerNames,
    getMovies,
    getGameMode,
    setGameMode,
    setPlayersOrder,
    getViewTimer,
    setViewTimer
  }
})
