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
import { useSceneStore } from '@/stores/useScene'
import { Scene } from '@/stores/useScene/types'
import { computed } from 'vue'
import draggable from 'vuedraggable'

const props = defineProps<{
  scenes: Scene[]
}>()

const sceneStore = useSceneStore()

const modifiedScenes = computed({
  get: () => {
    return props.scenes.map((scene: Scene) => {
      return {
        ...scene,
        isOpenAccordion: true
      }
    })
  },
  set: (value) => sceneStore.updateScenesOrder(value)
})

// TODO - No se abre el acordeon, ¿pero quiero un acordeón?
// function toggleAccordion(scene: DirectorScene) {
//   scene.isOpenAccordion = !scene.isOpenAccordion
// }

function addSceneToMovie(scene: DirectorScene) {
  scene.selected = !scene.selected
  console.log(modifiedScenes.value)
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
    margin: 10px;
    width: calc(25% - 20px);

    &.selected {
      border: 2px solid red;
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
