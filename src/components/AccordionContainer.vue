<template>
  <draggable
    class="accordion-container"
    v-model="modifiedScenes"
    item-key="id"
    group="scenes"
    :animation="200"
  >
    <template #item="{ element }">
      <div class="acordeon-item">
        <header @click="toggleAccordion(element)">
          <h2>Vamos: {{ element.isOpenAccordion }}</h2>
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
import { AccordionScene, Scene, useSceneStore } from '@/stores/useSceneStore'
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

function toggleAccordion(scene: AccordionScene) {
  scene.isOpenAccordion = !scene.isOpenAccordion
}
</script>

<style lang="scss" scoped>
.accordion-container {
  @include flex;
  flex-wrap: wrap;
  width: 1500px;
  margin-bottom: 20px;

  .acordeon-item {
    margin: 10px;
    width: 400px;

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
