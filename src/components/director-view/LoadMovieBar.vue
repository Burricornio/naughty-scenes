<template>
  <div class="load-movie-bar-component">
    <SelectMovieDropwdownComponent
      @loaded-custom-movie-flag="setLoadedCustomMovieFlag"
    />
    <FilterScenesDropdownComponent
      :loadCustomMovieFlag="loadedCustomMovieFlag"
      @loaded-custom-movie-flag="setLoadedCustomMovieFlag"
    />
  </div>
</template>

<script setup lang="ts">
import SelectMovieDropwdownComponent from '@/components/director-view/SelectMovieDropwdownComponent.vue'
import FilterScenesDropdownComponent from '@/components/director-view/FilterScenesDropdownComponent.vue'
import { ref } from 'vue'

// DATA
const loadedCustomMovieFlag = ref<boolean>(false)

function setLoadedCustomMovieFlag(status: boolean): void {
  loadedCustomMovieFlag.value = status
}
</script>

<style lang="scss" scoped>
.load-movie-bar-component {
  @include flex;
  background-color: white;
  padding: 20px;
}
</style>
