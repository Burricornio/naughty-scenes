<template>
  <div class="director-view">
    <h1>Director mode</h1>
    <SelectScenesNumberInputComponent
      :scenesNumber="numberOfScenes"
      @change-scenes-number-length="selectRandomScenes"
    />
    <div v-if="scenes.length">
      <draggable v-model="scenes" item-key="id" group="scenes" :animation="200">
        <template #item="{ element }">
          <div class="acordeon-item">
            <header @click="toggleAcordeon(element)">
              <h2>Vamos: {{ element.isAcordeonAbierto }}</h2>
              <h2>{{ element.id }}</h2>
            </header>
            <section v-if="element.isAcordeonAbierto">
              <div>Holasassaasass</div>
            </section>
          </div>
        </template>
      </draggable>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import SelectScenesNumberInputComponent from '@/components/SelectScenesNumberInputComponent.vue'
import { AccordionScene, useSceneStore } from '@/stores/useSceneStore'
import draggable from 'vuedraggable'

// STORE
const sceneStore = useSceneStore()

// DATA
const numberOfScenes = 3

const scenes = ref<AccordionScene[]>([])

// HOOKS
onMounted(() => {
  selectRandomScenes(numberOfScenes)
})

// METHODS
function selectRandomScenes(numberOfScenes: number): void {
  sceneStore.selectRandomScenes(numberOfScenes)
  scenes.value = sceneStore.getScenes as AccordionScene[]
}

function toggleAcordeon(scene: AccordionScene) {
  scene.isOpenAccordion = !scene.isOpenAccordion
}
</script>

<style lang="scss" scoped>
.director-view {
  @include flex($flex-direction: column);
  margin-bottom: 20px;

  .acordeon-item {
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
      width: 400px;
      margin: 20px;
      height: 50px;
      color: white;
    }
  }
}
</style>
