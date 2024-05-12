import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { Step } from '@/components/home/StartGameModal/steps/types/stepsTypes'

export const useModalsStore = defineStore('useModalsStore', () => {
  const startMovieModalCurrentStep = ref<Step>(Step.INITIAL)

  const currentStep = computed<Step>(() => startMovieModalCurrentStep.value)

  const getStartMovieModalCurrentStepName = computed<string>(() => {
    let name = ''
    switch (startMovieModalCurrentStep.value) {
      case Step.INITIAL:
        name = 'initial'
        break
      case Step.INSERT_PLAYER_NAMES:
        name = 'insert-player-names'
        break
      case Step.SELECTE_SCENES_NUMBER:
        name = 'select-scenes-number'
        break
      case Step.SELECT_MOVIE_MODE:
        name = 'select-movie-mode'
        break
    }
    return name
  })

  function setStartMovieModalCurrentStep(step: Step) {
    startMovieModalCurrentStep.value = step
  }

  // function increaseStartGameModalCurrentStep() {
  //   startGameModalCurrentStep.value++
  // }

  // function decreaseStartGameModalCurrentStep() {
  //   startGameModalCurrentStep.value--
  // }

  return {
    // startGameModalCurrentStep,
    // setStartGameModalCurrentStep,
    // increaseStartGameModalCurrentStep,
    // decreaseStartGameModalCurrentStep,
    getStartMovieModalCurrentStepName,
    currentStep,
    setStartMovieModalCurrentStep
  }
})
