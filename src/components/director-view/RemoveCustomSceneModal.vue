<template>
  <ModalComponent :open="openRemoveCustomScene" @close-modal="closeModal">
    <h1>¿Quieres eliminar la escena "{{ scene?.title }}"?</h1>
    <button @click="removeScene">SI</button>
    <button @click="closeModal">NO</button>
  </ModalComponent>
</template>

<script setup lang="ts">
import useModal from '@/composables/useModal'
import ModalComponent from '@/components/ModalComponent.vue'
import { Scene, useSceneStore } from '@/stores/useSceneStore'

// PROPS
const props = defineProps<{
  scene: Scene | null
}>()

// STORE
const { openRemoveCustomScene, closeRemoveCustomSceneModal } = useModal()
const sceneStore = useSceneStore()

// METHODS
function closeModal() {
  closeRemoveCustomSceneModal()
}

function removeScene() {
  sceneStore.deleteCustomScene(props.scene.id)
  closeModal()
}
</script>
