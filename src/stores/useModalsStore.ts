import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { Step } from '@/components/home-view/StartMovieModal/steps/types/stepsTypes'

export const useModalsStore = defineStore('useModalsStore', () => {
  const startMovieModalCurrentStep = ref<Step>(Step.INITIAL)

  const currentStep = computed<Step>(() => startMovieModalCurrentStep.value)

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
    currentStep,
    setStartMovieModalCurrentStep
  }
})
