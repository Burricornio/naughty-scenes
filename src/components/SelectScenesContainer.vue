<template>
  <draggable
    class="accordion-container"
    v-model="modifiedScenes"
    item-key="id"
    group="scenes"
    :animation="200"
  >
    <template #item="{ element }">
      <div class="acordeon-item" :class="{ selected: element.selected }">
        <header @click="addSceneToMovie(element)">
          <h2>Open: {{ element.isOpenAccordion }}</h2>
          <h2>Selected: {{ element.selected }}</h2>
          <h2>{{ element.id }}</h2>
        </header>
        <section v-if="element.isOpenAccordion">
          <div>{{ element.instructions }}</div>
        </section>
      </div>
    </template>
  </draggable>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { DirectorScene, Scene } from '@/stores/useSceneStore'
import draggable from 'vuedraggable'
import { EmittedEvent } from '@/events'

// PROPS
const props = defineProps<{
  scenes: Scene[]
}>()

// DATA
const modifiedScenes = ref(
  props.scenes.map((scene: Scene) => ({
    ...scene,
    isOpenAccordion: true,
    selected: false
  }))
)

// COMPUTED
const movie = computed(() => {
  return modifiedScenes.value
    .filter((scene: DirectorScene) => scene.selected)
    .map((scene: DirectorScene) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { isOpenAccordion, selected, ...cleanScene } = scene
      return cleanScene
    })
})

// EMITS
const emit = defineEmits([EmittedEvent.CALCULATE_DIRECTOR_MOVIE_LENGTH])

function emitMovieLength() {
  emit(EmittedEvent.CALCULATE_DIRECTOR_MOVIE_LENGTH, movie.value.length)
}

// METHODS
function addSceneToMovie(scene: DirectorScene) {
  scene.selected = !scene.selected
  modifiedScenes.value = [...modifiedScenes.value]
  emitMovieLength()
}
</script>

<style lang="scss" scoped>
.accordion-container {
  @include flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  width: 1500px;
  margin-bottom: 20px;

  .acordeon-item {
    @include borders($color: gold);
    margin: 10px;
    width: calc(25% - 30px);

    &.selected {
      border-color: red;
    }

    header {
      cursor: pointer;
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
</style>
