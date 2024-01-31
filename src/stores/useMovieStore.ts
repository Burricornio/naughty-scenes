import { computed, reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import moviesJSON from '@/assets/movies.json'
import { Scene, useSceneStore } from './useSceneStore'

interface Players {
  playerNames: { player1: string; player2: string }
}

interface Movie {
  id: number
  title: string
  date: string
  scenes: string
}

export const useMovieStore = defineStore('useMovieStore', () => {
  // const gameStartedFlag = ref<boolean>(false)
  const { getDefaultScenes } = useSceneStore()

  const playedMoviesNumber = ref<number>(0)
  const playerNames = reactive<{ player1: string; player2: string }>({
    player1: '',
    player2: ''
  })
  const movies = ref<Movie[]>(moviesJSON)

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
    console.log('final: ', final)
    return final
  })

  // const getGameStartedFlag = computed<boolean>(() => gameStartedFlag.value)
  // const getPlayedMoviesNumber = computed<number>(() => playedMoviesNumber.value)

  const getPlayerNames = computed<{ player1: string; player2: string }>(
    () => playerNames
  )

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
    playerNames[player] = name
  }

  function resetPlayerNames() {
    // gameStartedFlag.value = false
    // playedGamesNumber.value = 0
    playerNames.player1 = ''
    playerNames.player2 = ''
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
    getMovies
  }
})
