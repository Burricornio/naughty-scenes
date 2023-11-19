import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCountdownStore = defineStore('useCountdownStore', () => {
  const showCountdown = ref<boolean>(false)

  function setCountdownStatus(status: boolean) {
    showCountdown.value = status
  }

  return {
    showCountdown,
    setCountdownStatus
  }
})
