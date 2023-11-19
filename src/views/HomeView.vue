<template>
  <StartMovieModal v-if="open" />
  <div v-else>
    <img class="burri-img" src="../assets/img/burricornio.png" />
    <StartMovieButtonComponent />
  </div>
</template>

<script setup lang="ts">
import useModal from '@/composables/useModal'
import StartMovieButtonComponent from '@/components/home/StartMovieButtonComponent.vue'
import StartMovieModal from '@/components/home/StartMovieModal/StartMovieModal.vue'

const { open } = useModal()
</script>

<style lang="scss" scoped>
.burri-img {
  width: 75%;
  margin: 3em;
}
</style>
