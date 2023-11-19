<template>
  <SceneContainerComponent v-if="movieStore.movieStartedFlag" />
  <StartMovieModal v-else-if="open" />
  <div v-else>
    <img class="burri-img" src="../assets/img/burricornio.png" />
    <h1 v-if="movieStore.moviesFilmedNumber">¿Quieres jugar otra vez?</h1>
    <StartMovieButtonComponent />
  </div>
</template>

<script setup lang="ts">
import useModal from '@/composables/useModal'
import { useMovieStore } from '@/stores/useMovieStore'
import SceneContainerComponent from '@/components/SceneContainer/SceneContainerComponent.vue'
import StartMovieButtonComponent from '@/components/StartMovieButtonComponent.vue'
import StartMovieModal from '@/components/StartMovieModal/StartMovieModal.vue'

// STORE
const movieStore = useMovieStore()

const { open } = useModal()
</script>

<style lang="scss" scoped>
.burri-img {
  width: 75%;
  margin: 3em;
}
</style>
