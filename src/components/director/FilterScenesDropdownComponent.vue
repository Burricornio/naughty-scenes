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
import { computed } from 'vue'
import CustomDropdownComponent from '@/components/director/CustomDropdownComponent.vue'
import { EmittedEvent } from '@/events'

// PROPS
const props = defineProps({
  loadCustomMovieFlag: {
    type: Boolean,
    required: true
  }
})

// STORE
const sceneStore = useSceneStore()

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

// EMITS
const emit = defineEmits([EmittedEvent.LOADED_CUSTOM_MOVIE_FLAG])

function emitLoadedCustomMovieFlag() {
  emit(EmittedEvent.LOADED_CUSTOM_MOVIE_FLAG, false)
}

// METHODS
function showAllScenes(): void {
  sceneStore.playMovie(sceneStore.getDefaultScenes)
  if (props.loadCustomMovieFlag) {
    sceneStore.unselectAllScenes()
    emitLoadedCustomMovieFlag()
  }
}

function showOnlyCustomScenes(): void {
  sceneStore.playMovie(customScenesFiltered.value)
}

function showOnlyDefaultScenes(): void {
  sceneStore.playMovie(defaultScenesFiltered.value)
}
</script>
