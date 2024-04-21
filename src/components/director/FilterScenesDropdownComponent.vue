<template>
  <CustomDropdownComponent
    class="filter-scenes-dropdown"
    :options="filterScenes"
    :placeholder="'Filtrar escenas'"
  />
</template>

<script setup lang="ts">
import { Scene } from '@/stores/useScene/types'
import { useSceneStore } from '@/stores/useScene'
import { useDirectorStore } from '@/stores/useDirector'
import { computed } from 'vue'
import CustomDropdownComponent from '@/components/director/CustomDropdownComponent.vue'
import { DirectorStep } from '@/stores/useDirector/types'

// STORE
const sceneStore = useSceneStore()
const { setDirectorStep } = useDirectorStore()

// DATA
const filterScenes = [
  {
    id: 1,
    text: 'Mostrar todas',
    action: showAllScenes
  },
  {
    id: 2,
    text: 'Mostrar solo tús escenas',
    action: showOnlyCustomScenes
  },
  {
    id: 3,
    text: 'Mostrar solo escenas por defecto',
    action: showOnlyDefaultScenes
  }
]

// COMPUTED
const customScenesFiltered = computed<Scene[]>(() =>
  sceneStore.getDefaultScenes.filter((scene: Scene) => scene.type === 'custom')
)

const defaultScenesFiltered = computed<Scene[]>(() =>
  sceneStore.getDefaultScenes.filter((scene: Scene) => scene.type === 'default')
)

// METHODS
function showAllScenes(): void {
  sceneStore.unselectAllScenes()
  sceneStore.playMovie(sceneStore.getDefaultScenes)
  setDirectorStep(DirectorStep.SELECT_SCENES)
}

function showOnlyCustomScenes(): void {
  sceneStore.unselectAllScenes()
  sceneStore.playMovie(customScenesFiltered.value)
  setDirectorStep(DirectorStep.SELECT_SCENES)
}

function showOnlyDefaultScenes(): void {
  sceneStore.unselectAllScenes()
  sceneStore.playMovie(defaultScenesFiltered.value)
  setDirectorStep(DirectorStep.SELECT_SCENES)
}
</script>
