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
          <h2>{{ scene.title }}</h2>
        </header>
        <section v-if="scene.isOpenAccordion">
          <div>{{ scene.instructions }}</div>
        </section>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Scene } from '@/stores/useSceneStore'

// PROPS
const props = defineProps<{
  scenes: Scene[]
}>()

// COMPUTED
const modifiedScenes = computed(() => props.scenes)

// METHODS
function addSceneToMovie(scene: Scene) {
  scene.selected = !scene.selected
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
