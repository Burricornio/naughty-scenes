<template>
  <ul class="scene-miniatures-container">
    <li
      v-for="scene in scenes"
      :key="scene.id"
      @click="showSceneInfoModal(scene)"
      class="scene-miniature"
      :class="[
        {
          'current-scene': currentScene && scene.id === currentScene!.id,
          'played-scene': checkIfUsedScene(scene.id)
        }
      ]"
    >
      {{ scene.id }}
    </li>
  </ul>
  <ModalComponent :open="open" @close-modal="closeModal">
    <div class="miniature-modal" v-if="clickedScene">
      <h2>{{ clickedScene.title }}</h2>
      <p>{{ clickedScene.instructions }}</p>
    </div>
  </ModalComponent>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Scene } from '@/stores/useScene/types'
import ModalComponent from '@/components/ModalComponent.vue'
import useModal from '@/composables/useModal'

const props = defineProps<{
  scenes: Scene[]
  playedSceneIds: number[]
  currentScene: Scene | null
}>()

const { open, openModal, closeModal } = useModal()

const clickedScene = ref<Scene | null>(null)

// METHODS
function checkIfUsedScene(id: number): boolean {
  return props.playedSceneIds.includes(id)
}

function showSceneInfoModal(scene: Scene) {
  clickedScene.value = scene
  openModal()
}
</script>

<style lang="scss" scoped>
.scene-miniatures-container {
  @include flex($justify-content: space-between);
  width: 100%;
  list-style-type: none;
  background: lightpink;
  padding: 0;
  cursor: pointer;

  .scene-miniature {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80px;
    height: 80px;
    background: lightcoral;
    margin: 10px;
  }

  .current-scene {
    background: $action-color;
  }

  .played-scene {
    position: relative;
    background: $black;
    color: $white;
  }
}

.miniature-modal {
  margin: 20px;
}
</style>
