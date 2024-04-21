import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { Scene } from './useScene/types'

export const useDirectorSceneStore = defineStore(
  'useDirectorSceneStore',
  () => {
    const currentMovie = ref<Scene[]>([])

    const getCurrentMovie = computed(() => currentMovie.value)

    function updateCurrentMovie(movie: Scene[]) {
      currentMovie.value = movie
    }

    function removeCurrentMovieScene(id: number) {
      // Filtrar las escenas para excluir la escena con el ID especificado
      currentMovie.value = currentMovie.value.filter((scene) => scene.id !== id)
    }

    return {
      getCurrentMovie,
      updateCurrentMovie,
      removeCurrentMovieScene
    }
  }
)
