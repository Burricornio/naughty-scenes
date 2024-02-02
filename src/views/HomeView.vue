<template>
  <NavigationComponent />
  <main class="app-content">
    <StartMovieModal v-if="open" />
    <div v-else class="slogan-container">
      <p class="slogan">¿Praparad@ para rodar tu película?</p>
      <p class="slogan">¿Preparad@ para pasarlo bien?</p>
      <StartMovieButtonComponent />
    </div>
  </main>
</template>

<script setup lang="ts">
import useModal from '@/composables/useModal'
import NavigationComponent from '@/components/home-view/NavigationComponent.vue'
import StartMovieButtonComponent from '@/components/home-view/StartMovieButtonComponent.vue'
import StartMovieModal from '@/components/home-view/StartMovieModal/StartMovieModal.vue'

// STORE
const { open } = useModal()
</script>

<style lang="scss" scoped>
.app-content {
  @include flex;

  .slogan-container {
    @include flex($flex-direction: column);
    margin-top: 180px;
    .slogan {
      align-self: flex-start;
      width: 900px;
      font-size: 50px;
      font-weight: 600;
      color: $white;
      margin-bottom: 20px;
    }
  }
}
</style>
