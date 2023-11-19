import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import defaultScenesJSON from '@/assets/default-scenes.json'
import { getElementsArray, shuffleArray } from '@/helpers/array'

export type Scene = {
  id: number
  title: string
  instructions: string
  duration: number
  rndBtnOptions?: string[]
}

export const useSceneStore = defineStore('useSceneStore', () => {
  const sceneIndex = ref<number>(0)
  const defaultScenes = ref<Scene[]>(defaultScenesJSON)
  const scenes = ref<Scene[]>([])
  const playedSceneIds = ref<number[]>([])
  const currentScene = ref<Scene | null>(null)

  // const getIndex = computed<number>(() => index.value)

  // const getCards = computed<Card[]>(() => shuffledCards.value)

  const getScenesLength = computed<number>(() => scenes.value.length)

  // const getPlayedCardIds = computed<number[]>(() => playedCardIds.value)

  // const getCardsNumberLength = computed<number>(() => defaultCards.value.length)

  const getCurrentScene = computed<Scene | null>(() => currentScene.value)

  // function updateCardsOrder(cards: Card[]) {
  //   defaultCards.value = cards
  // }

  // function selectRandomCards(numberOfCards: number) {
  //   index.value = 0
  //   const shuffleCards = shuffleArray(defaultCards.value)
  //   const cards = getElementsArray(shuffleCards, numberOfCards)
  //   currentCard.value = cards[index.value]
  //   playedCardIds.value = []
  //   shuffledCards.value = cards
  // }

  // function pushPlayedCardId(id: number) {
  //   playedCardIds.value.push(id)
  // }

  // function popPlayedCardId() {
  //   playedCardIds.value.pop()
  // }

  // function increaseIndex() {
  //   index.value++
  // }

  // function decreaseIndex() {
  //   index.value--
  // }

  // function setCurrentCard(card: Card) {
  //   currentCard.value = card
  // }

  // function $reset() {
  //   shuffledCards.value = []
  //   currentCard.value = null
  //   playedCardIds.value = []
  //   index.value = 0
  // }

  return {
    getCurrentScene,
    getScenesLength
  }
})
