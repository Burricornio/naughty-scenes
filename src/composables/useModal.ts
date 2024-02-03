import { ref } from 'vue'

const open = ref<boolean>(false)

const openAddNewScene = ref<boolean>(false)

const openRemoveCustomScene = ref<boolean>(false)

export default function useModal() {
  const openModal = () => {
    open.value = true
  }

  const closeModal = () => {
    open.value = false
  }

  // ADD NEW MODAL
  const openAddNewSceneModal = () => {
    openAddNewScene.value = true
  }

  const closeAddNewSceneModal = () => {
    openAddNewScene.value = false
  }

  // ADD NEW MODAL
  const openRemoveCustomSceneModal = () => {
    openRemoveCustomScene.value = true
  }

  const closeRemoveCustomSceneModal = () => {
    openRemoveCustomScene.value = false
  }

  return {
    open,
    openModal,
    closeModal,
    openAddNewSceneModal,
    openAddNewScene,
    closeAddNewSceneModal,
    openRemoveCustomSceneModal,
    closeRemoveCustomSceneModal,
    openRemoveCustomScene
  }
}
