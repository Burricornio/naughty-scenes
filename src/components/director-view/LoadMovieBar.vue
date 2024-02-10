<template>
  <div class="load-movie-bar-component">
    <SelectMovieDropwdownComponent
      class="filter"
      @loaded-custom-movie-flag="setLoadedCustomMovieFlag"
    />
    <FilterScenesDropdownComponent
      class="filter"
      :loadCustomMovieFlag="loadedCustomMovieFlag"
      @loaded-custom-movie-flag="setLoadedCustomMovieFlag"
    />
    <button class="step-button" @click="addNewScene">ADD YOUR OWN SCENE</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import useModal from '@/composables/useModal'
import SelectMovieDropwdownComponent from '@/components/director-view/SelectMovieDropwdownComponent.vue'
import FilterScenesDropdownComponent from '@/components/director-view/FilterScenesDropdownComponent.vue'

// STORE
const { openAddNewSceneModal } = useModal()

// DATA
const loadedCustomMovieFlag = ref<boolean>(false)

// METHODS
function setLoadedCustomMovieFlag(status: boolean): void {
  loadedCustomMovieFlag.value = status
}
function addNewScene() {
  openAddNewSceneModal()
}
</script>

<style lang="scss" scoped>
.load-movie-bar-component {
  @include flex;
  width: 100%;
  height: 100px;
  background-color: white;

  .filter {
    margin: $margin-01;
  }
}
</style>
