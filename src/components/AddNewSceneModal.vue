<template>
  <ModalComponent :open="openAddNewScene" @close-modal="closeModal">
    <h1>Vamoooooooos</h1>
  </ModalComponent>
</template>

<script setup lang="ts">
import useModal from '@/composables/useModal'
import ModalComponent from '@/components/ModalComponent.vue'

// STORE
const { openAddNewScene, closeAddNewSceneModal } = useModal()

function closeModal() {
  closeAddNewSceneModal()
}
</script>
