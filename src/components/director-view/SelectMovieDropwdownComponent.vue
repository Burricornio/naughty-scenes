<template>
  <div class="select-movie-dropdown">
    <div class="selected-option" @click="toggleDropdown">
      {{ selectedMovie ? selectedMovie.title : 'Selecciona una película' }}
    </div>
    <transition name="fade">
      <div v-if="isDropdownOpen" class="options">
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
import { ref, computed } from 'vue'

// STORE
const movieStore = useMovieStore()
const sceneStore = useSceneStore()

// DATA
const selectedMovie = ref<MovieParsed | null>(null)
const isDropdownOpen = ref(false)

// COMPUTED
const movies = computed(() => movieStore.getMovies)

// METHODS
function toggleDropdown() {
  isDropdownOpen.value = !isDropdownOpen.value
}

function selectMovie(movie: MovieParsed) {
  selectedMovie.value = movie
  isDropdownOpen.value = false
  sceneStore.playMovie(movie.scenes)
}
</script>

<style lang="scss" scoped>
.select-movie-dropdown {
  position: relative;
  width: 200px;
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
