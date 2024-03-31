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
    <button class="add-secene-button" @click="addNewScene">
      {{ text.createOwnScene }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import useModal from '@/composables/useModal'
import SelectMovieDropwdownComponent from '@/components/director/SelectMovieDropwdownComponent.vue'
import FilterScenesDropdownComponent from '@/components/director/FilterScenesDropdownComponent.vue'

// STORE
const { openAddNewSceneModal } = useModal()

// TEXTS
const { t } = useI18n()
const text = {
  createOwnScene: t('component.load_movie_bar.create_own_scene')
}

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
    margin: $size-01;
  }

  .add-secene-button {
    color: $director-color;
    background-color: $white;
    border-color: $director-color;

    &:hover {
      color: $white;
      background-color: $director-color;
    }
  }
}
</style>
