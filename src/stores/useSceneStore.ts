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
}

export const useSceneStore = defineStore('useSceneStore', () => {
  const sceneIndex = ref<number>(0)
  const defaultScenes = ref<Scene[]>(defaultSixScenesJSON)
  const scenes = ref<Scene[]>([])
  const playedSceneIds = ref<number[]>([])
  const currentScene = ref<Scene | null>(null)

  const getSceneIndex = computed<number>(() => sceneIndex.value)

  const getScenes = computed<Scene[]>(() => scenes.value)

  const getScenesLength = computed<number>(() => scenes.value.length)

  const getPlayedSceneIds = computed<number[]>(() => playedSceneIds.value)

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

  function selectRandomScenes(numberOfCards: number) {
    sceneIndex.value = 0
    const shuffleScenes = shuffleArray(defaultScenes.value)
    const selectedScenes = getElementsArray(shuffleScenes, numberOfCards)
    currentScene.value = selectedScenes[sceneIndex.value]
    playedSceneIds.value = []
    scenes.value = selectedScenes
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

  return {
    getCurrentScene,
    getScenesLength,
    selectRandomScenes,
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
    addNewScene
  }
})
