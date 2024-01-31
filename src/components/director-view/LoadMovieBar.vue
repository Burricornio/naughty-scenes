<template>
  <div class="load-movie-bar-component">
    <SelectMovieDropwdownComponent />
  </div>
</template>

<script setup lang="ts">
import SelectMovieDropwdownComponent from '@/components/director-view/SelectMovieDropwdownComponent.vue'
</script>

<style lang="scss" scoped>
.load-movie-bar-component {
  @include flex;
  background-color: white;
  width: 100%;
  padding: 20px;
}
</style>
