<template>
  <CustomDropdownComponent
    class="filter-scenes-dropdown"
    :options="parsedDropddownOptions"
    :placeholder="'Cargar pelicula'"
  />
</template>

<script setup lang="ts">
import { useMovieStore, MovieParsed } from '@/stores/useMovieStore'
import { useSceneStore } from '@/stores/useScene'
import { computed } from 'vue'
import CustomDropdownComponent from '@/components/director/CustomDropdownComponent.vue'
import { EmittedEvent } from '@/events'

// STORE
const movieStore = useMovieStore()
const sceneStore = useSceneStore()

// COMPUTED
const movies = computed(() => movieStore.getMovies)

const parsedDropddownOptions = movies.value.map((movie: MovieParsed) => {
  return {
    id: movie.id,
    text: movie.title,
    action: () => selectMovie(movie.id)
  }
})

// EMITS
const emit = defineEmits([EmittedEvent.LOADED_CUSTOM_MOVIE_FLAG])

function emitLoadedCustomMovieFlag() {
  emit(EmittedEvent.LOADED_CUSTOM_MOVIE_FLAG, true)
}

// METHOD
function selectMovie(movieId: number): void {
  const selectedMovieScenes = movies.value.filter(
    (movie: MovieParsed) => movie.id === movieId
  )
  sceneStore.selectAllScenes()
  sceneStore.playMovie(selectedMovieScenes[0].scenes)
  sceneStore.setSelectedScenes(selectedMovieScenes[0].scenes)
  emitLoadedCustomMovieFlag()
}
</script>
