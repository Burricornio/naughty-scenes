<template>
  <section class="current-director-movie-accordion">
    <draggable
      class="accordion-container"
      v-model="currentMovie"
      item-key="id"
      group="scenes"
      :animation="200"
    >
      <template #item="{ element }">
        <div class="acordeon-item">
          <header>
            <h2>{{ element.title }}</h2>
          </header>
          <section v-if="element.isOpenAccordion">
            <div>{{ element.instructions }}</div>
          </section>
        </div>
      </template>
    </draggable>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { DirectorScene } from '@/stores/useSceneStore'
import draggable from 'vuedraggable'

// PROPS
const props = defineProps<{
  currentMovieScenes: DirectorScene[]
}>()

// DATA
const currentMovie = ref(props.currentMovieScenes)
</script>

<style lang="scss" scoped>
.accordion-container {
  background: white;
  padding: 20px;

  .acordeon-item {
    background: green;
    color: white;
    margin: 10px;
    padding: 20px;
    cursor: move;
  }
}
</style>
