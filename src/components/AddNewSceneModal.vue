<template>
  <ModalComponent :open="openAddNewScene" @close-modal="closeModal">
    <h1>NUEVA ESCENA</h1>
    <form class="step-one-form" autocomplete="off">
      <div class="input-container">
        <label>TITULO</label>
        <input type="text" v-model="scene.title" id="title" name="title" />
      </div>
      <div class="input-container">
        <label>INSTRUCCIONES</label>
        <input type="text" v-model="scene.instructions" />
      </div>
      <div class="input-container">
        <label>DURACIÓN</label>
        <input type="number" v-model="scene.duration" />
      </div>
      <button @click.prevent="saveNewScene">GUARDAR</button>
    </form>
  </ModalComponent>
</template>

<!-- duration:9
id:9
instructions:"Instrucciones de la escena número 9"
isOpenAccordion:true
rndBtnOptions:['a', 'b']
selected:false
title:"Scene 9" -->

<script setup lang="ts">
import { ref } from 'vue'
import { Scene } from '@/stores/useScene/types'
import { useSceneStore } from '@/stores/useScene'
import useModal from '@/composables/useModal'
import ModalComponent from '@/components/ModalComponent.vue'

// STORE
const { openAddNewScene, closeAddNewSceneModal } = useModal()
const { addNewScene } = useSceneStore()

// DATA
const scene = ref<Scene>({
  duration: 0,
  id: Math.floor(Math.random() * (10000 - 100) + 100),
  instructions: '',
  rndBtnOptions: [],
  title: '',
  type: 'custom',
  selected: true,
  isOpenAccordion: false
})

// METHODS
function closeModal() {
  closeAddNewSceneModal()
}

function saveNewScene() {
  addNewScene(scene.value)
  closeAddNewSceneModal()
  scene.value = {
    duration: 0,
    id: 999,
    instructions: '',
    rndBtnOptions: [],
    title: '',
    type: 'custom',
    selected: false
  }
}
</script>
