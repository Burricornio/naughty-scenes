<template>
  <section class="select-scenes-container">
    <ul class="scene-list">
      <li
        v-for="scene in modifiedScenes"
        :key="scene.id"
        :class="['scene-item', { selected: scene.selected }]"
        @click="addSceneToMovie(scene)"
      >
        <header>
          <h2>Open: {{ scene.isOpenAccordion }}</h2>
          <h2>Selected: {{ scene.selected }}</h2>
          <h2>{{ scene.id }}</h2>
        </header>
        <section v-if="scene.isOpenAccordion">
          <div>{{ scene.instructions }}</div>
        </section>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { DirectorScene } from '@/stores/useSceneStore'
import { EmittedEvent } from '@/events'

// PROPS
const props = defineProps<{
  directorScenes: DirectorScene[]
}>()

const modifiedScenes = ref(props.directorScenes)

// EMITS
const emit = defineEmits([EmittedEvent.UPDATE_DIRECTOR_MOVIE])

function emitModifiedMovie(movie: DirectorScene[]) {
  emit(EmittedEvent.UPDATE_DIRECTOR_MOVIE, movie)
}

// METHODS
function addSceneToMovie(scene: DirectorScene) {
  scene.selected = !scene.selected
  modifiedScenes.value = [...modifiedScenes.value]
  emitModifiedMovie(modifiedScenes.value)
}
</script>

<style lang="scss" scoped>
.select-scenes-container {
  .scene-list {
    @include flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    width: 1500px;
    margin-bottom: 20px;

    .scene-item {
      @include borders($color: gold);
      margin: 10px;
      width: calc(25% - 30px);
      cursor: pointer;
      &.selected {
        border-color: red;
      }

      header {
        background-color: teal;
        padding: 10px;

        h2 {
          margin: 0;
          color: white;
        }
      }

      section {
        @include flex($flex-direction: column);
        background-color: green;
        width: 100%;
        height: 50px;
        color: white;
      }
    }
  }
}
</style>
