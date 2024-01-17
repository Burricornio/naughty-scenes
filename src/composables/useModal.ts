import { ref } from 'vue'

const open = ref<boolean>(false)

const openAddNewScene = ref<boolean>(false)

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

  return {
    open,
    openModal,
    closeModal,
    openAddNewSceneModal,
    openAddNewScene,
    closeAddNewSceneModal
  }
}
