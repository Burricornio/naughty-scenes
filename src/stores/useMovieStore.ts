import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import moviesJSON from '@/assets/movies.json'
import { Scene, useSceneStore } from './useSceneStore'

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

export const useMovieStore = defineStore(
  'useMovieStore',
  () => {
    const { getDefaultScenes } = useSceneStore()
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
      return final
    })

    return {
      getMovies
    }
  },
  {
    persist: true
  }
)
