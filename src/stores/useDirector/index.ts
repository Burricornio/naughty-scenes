import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { DirectorStep } from './types'

export const useDirectorStore = defineStore('useDirectorStore', () => {
  const step = ref<number>(DirectorStep.SELECT_SCENES)

  const getDirectorStep = computed<DirectorStep>(() => step.value)

  function setDirectorStep(stepNumber: DirectorStep) {
    step.value = stepNumber
  }

  return { getDirectorStep, setDirectorStep }
})
