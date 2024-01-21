import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { Scene } from './useSceneStore'

// export type DirectorScene = Scene & {
//   isOpenAccordion: boolean
//   selected: boolean
// }

// const sceneStore = useSceneStore()

export const useDirectorSceneStore = defineStore(
  'useDirectorSceneStore',
  () => {
    const currentMovie = ref<Scene[]>([])

    // const getDirectorScenes = computed({
    //   get: () => {
    //     return sceneStore.getScenes.map((scene: Scene) => ({
    //       ...scene,
    //       isOpenAccordion: true,
    //       selected: scene.selected || false
    //     }))
    //   },
    //   set: (value) => value
    // })

    const getCurrentMovie = computed(() => currentMovie.value)

    // function updateSelectedDirectorScenes(movie: DirectorScene[]): void {
    //   getDirectorScenes.value = movie
    // }

    function updateCurrentMovie(movie: Scene[]) {
      currentMovie.value = movie
    }

    function removeCurrentMovieScene(id: number) {
      // Filtrar las escenas para excluir la escena con el ID especificado
      currentMovie.value = currentMovie.value.filter((scene) => scene.id !== id)
    }

    return {
      // getDirectorScenes,
      // updateSelectedDirectorScenes,
      getCurrentMovie,
      updateCurrentMovie,
      removeCurrentMovieScene
    }
  }
)
