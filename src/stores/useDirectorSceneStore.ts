import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { Scene, useSceneStore } from './useSceneStore'

export type DirectorScene = Scene & {
  isOpenAccordion: boolean
  selected: boolean
}

const sceneStore = useSceneStore()

export const useDirectorSceneStore = defineStore(
  'useDirectorSceneStore',
  () => {
    const currentMovie = ref<DirectorScene[]>([])

    const getDirectorScenes = computed({
      get: () => {
        return sceneStore.getScenes.map((scene: Scene) => ({
          ...scene,
          isOpenAccordion: true,
          selected: false
        }))
      },
      set: (value) => value
    })

    const getCurrentMovie = computed(() => currentMovie.value)

    function updateSelectedDirectorScenes(movie: DirectorScene[]) {
      getDirectorScenes.value = movie
    }

    function updateCurrentMovie(movie: DirectorScene[]) {
      currentMovie.value = movie
    }

    return {
      getDirectorScenes,
      updateSelectedDirectorScenes,
      getCurrentMovie,
      updateCurrentMovie
    }
  }
)
