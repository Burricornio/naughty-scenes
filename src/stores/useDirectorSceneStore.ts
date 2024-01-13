import { computed } from 'vue'
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

    function updateSelectedDirectorScenes(movie: DirectorScene[]) {
      getDirectorScenes.value = movie
    }

    return {
      getDirectorScenes,
      updateSelectedDirectorScenes
    }
  }
)
