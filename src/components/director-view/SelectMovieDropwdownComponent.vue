<template>
  <div class="select-movie-dropdown" ref="dropdownRef">
    <div class="selected-option" @click="toggleDropdown">
      {{ selectedMovie ? selectedMovie.title : 'Selecciona una película' }}
    </div>
    <transition name="fade">
      <div v-if="isDropdownOpen" class="options">
        <div @click="loadAllScenes">Cargar todas las escenas</div>
        <div
          v-for="movie in movies"
          :key="movie.id"
          @click="selectMovie(movie)"
        >
          {{ movie.title }}
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { useMovieStore, MovieParsed } from '@/stores/useMovieStore'
import { useSceneStore } from '@/stores/useSceneStore'
import { ref, computed, onMounted, onBeforeUnmount, Ref } from 'vue'

// STORE
const movieStore = useMovieStore()
const sceneStore = useSceneStore()

// DATA
const selectedMovie = ref<MovieParsed | null>(null)
const isDropdownOpen = ref(false)
const dropdownRef: Ref<HTMLElement | null> = ref(null)

// COMPUTED
const movies = computed(() => movieStore.getMovies)

// HOOKS
onMounted(() => {
  document.addEventListener('click', handleDocumentClick)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleDocumentClick)
})

// METHODS
function toggleDropdown(): void {
  isDropdownOpen.value = !isDropdownOpen.value
}

function selectMovie(movie: MovieParsed): void {
  selectedMovie.value = movie
  isDropdownOpen.value = false
  sceneStore.selectAllScenes()
  sceneStore.playMovie(movie.scenes)
}

function loadAllScenes(): void {
  isDropdownOpen.value = false
  selectedMovie.value = null
  sceneStore.playMovie(sceneStore.getDefaultScenes)
  sceneStore.unselectAllScenes()
}

const handleDocumentClick = (event: MouseEvent) => {
  const dropdown = dropdownRef.value

  if (dropdown && !dropdown.contains(event.target as Node)) {
    isDropdownOpen.value = false
  }
}
</script>

<style lang="scss" scoped>
.select-movie-dropdown {
  position: relative;
  width: 250px;
}

.selected-option {
  padding: 10px;
  border: 1px solid #ccc;
  cursor: pointer;
}

.options {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  border: 1px solid #ccc;
  background-color: white;
  max-height: 200px;
  overflow-y: auto;

  div {
    padding: 10px;
    cursor: pointer;

    &:hover {
      background-color: #f0f0f0;
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
