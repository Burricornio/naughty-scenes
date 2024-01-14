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
import { onMounted, ref } from 'vue'
import { EmittedEvent } from '@/events'
import { DirectorScene } from '@/stores/useDirectorSceneStore'

// PROPS
const props = defineProps<{
  directorScenes: DirectorScene[]
  unselectSceneIds: number[]
}>()

const modifiedScenes = ref(props.directorScenes)

// EMITS
const emit = defineEmits([EmittedEvent.UPDATE_DIRECTOR_MOVIE])

function emitModifiedMovie(movie: DirectorScene[]) {
  emit(EmittedEvent.UPDATE_DIRECTOR_MOVIE, movie)
}

// HOOKS
onMounted(() => {
  if (props.unselectSceneIds.length) {
    unselectScenes()
  }
})

// METHODS
function addSceneToMovie(scene: DirectorScene) {
  scene.selected = !scene.selected
  emitModifiedMovie(modifiedScenes.value)
}

function unselectScenes() {
  modifiedScenes.value.forEach((scene: DirectorScene) => {
    if (props.unselectSceneIds.includes(scene.id)) {
      scene.selected = false
    }
  })
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
