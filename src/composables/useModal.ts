import { ref } from 'vue'

const open = ref<boolean>(false)

export default function useModal() {
  const openModal = () => {
    open.value = true
  }

  const closeModal = () => {
    open.value = false
  }

  return { open, openModal, closeModal }
}
