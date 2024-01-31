import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
// import defaultScenesJSON from '@/assets/default-scenes.json'
import defaultSixScenesJSON from '@/assets/default-six-scenes.json'
import { getElementsArray, shuffleArray } from '@/helpers/array'

export type Scene = {
  id: number
  title: string
  instructions: string
  duration: number
  rndBtnOptions?: string[]
  type: string
  selected?: boolean
  isOpenAccordion?: boolean
}

interface SelectScenesObject {
  numberOfScenes: number
  shuffle: boolean
}

export const useSceneStore = defineStore('useSceneStore', () => {
  const sceneIndex = ref<number>(0)
  const defaultScenes = ref<Scene[]>(defaultSixScenesJSON)
  const scenes = ref<Scene[]>([])
  const playedSceneIds = ref<number[]>([])
  const currentScene = ref<Scene | null>(null)

  const getSceneIndex = computed<number>(() => sceneIndex.value)

  const getScenes = computed<Scene[]>(() => scenes.value)

  const getSelectedScenes = computed<Scene[]>(() =>
    scenes.value.filter((scene: Scene) => scene.selected)
  )

  const getSelectedScenesLength = computed<number>(
    () => getSelectedScenes.value.length
  )

  const getScenesLength = computed<number>(() => scenes.value.length)

  const getPlayedSceneIds = computed<number[]>(() => playedSceneIds.value)

  const getDefaultScenes = computed<Scene[]>(() => defaultScenes.value)

  const getDefaultScenesNumberLength = computed<number>(
    () => defaultScenes.value.length
  )

  const getCurrentScene = computed<Scene | null>(() => currentScene.value)

  const allScenesPlayed = computed<boolean>(() =>
    Boolean(
      getScenesLength.value &&
        getPlayedSceneIds.value.length === getScenesLength.value
    )
  )

  function updateScenesOrder(newOrder: Scene[]) {
    scenes.value = newOrder
  }

  function playMovie(movie: Scene[]): void {
    sceneIndex.value = 0
    playedSceneIds.value = []
    scenes.value = movie
    currentScene.value = scenes.value[sceneIndex.value]
  }

  function selectScenes({ numberOfScenes, shuffle }: SelectScenesObject) {
    let selectedScenes: Scene[] = []
    if (shuffle) {
      const shuffleScenes = shuffleArray(defaultScenes.value)
      selectedScenes = getElementsArray(shuffleScenes, numberOfScenes)
    } else {
      selectedScenes = defaultScenes.value
    }
    playMovie(selectedScenes)
  }

  function pushPlayedSceneId(id: number) {
    playedSceneIds.value.push(id)
  }

  function popPlayedSceneId() {
    playedSceneIds.value.pop()
  }

  function increaseIndex() {
    sceneIndex.value++
  }

  function decreaseIndex() {
    sceneIndex.value--
  }

  function setCurrentScene(scene: Scene | null) {
    currentScene.value = scene
  }

  // function $reset() {
  //   shuffledCards.value = []
  //   currentCard.value = null
  //   playedCardIds.value = []
  //   index.value = 0
  // }

  function addNewScene(scene: Scene) {
    scenes.value.unshift(scene)
  }

  function unselectScene(id: number) {
    scenes.value.forEach((scene: Scene) => {
      if (scene.id === id) {
        scene.selected = false
      }
    })
  }

  function unselectAllScenes() {
    scenes.value.forEach((scene: Scene) => {
      scene.selected = false
    })
  }

  function selectAllScenes() {
    scenes.value.forEach((scene: Scene) => {
      scene.selected = true
    })
  }

  return {
    playMovie,
    getCurrentScene,
    getScenesLength,
    selectScenes,
    getSceneIndex,
    pushPlayedSceneId,
    increaseIndex,
    decreaseIndex,
    getScenes,
    setCurrentScene,
    popPlayedSceneId,
    getPlayedSceneIds,
    allScenesPlayed,
    getDefaultScenesNumberLength,
    updateScenesOrder,
    addNewScene,
    getSelectedScenesLength,
    getSelectedScenes,
    unselectScene,
    unselectAllScenes,
    getDefaultScenes,
    selectAllScenes
  }
})
