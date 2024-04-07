import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { Mode, ModeName } from './types'

export const useModeStore = defineStore(
  'useModeStore',
  () => {
    const mode = ref<Mode>(Mode.UNSELECTED)
    const modeName = ref<ModeName>()

    const getMode = computed<Mode | null>(() => mode.value)

    const getIsActorMode = computed<boolean>(() => getMode.value === Mode.ACTOR)

    const getIsDirectorMode = computed<boolean>(
      () => getMode.value === Mode.DIRECTOR
    )

    const getModeName = computed<ModeName | undefined>(() => modeName.value)

    function setMode(modeName: Mode) {
      mode.value = modeName
    }

    function setModeName(name: ModeName) {
      modeName.value = name
    }

    function $reset() {
      mode.value = Mode.UNSELECTED
      mode.value = Mode.UNSELECTED
      modeName.value = undefined
    }

    return {
      $reset,
      getMode,
      getModeName,
      getIsActorMode,
      getIsDirectorMode,
      setMode,
      setModeName,
      // Save in localstorage
      modeName,
      mode
    }
  },
  {
    persist: true
  }
)
