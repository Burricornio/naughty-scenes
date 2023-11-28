<template>
  <div class="director-view">
    <h1>Director mode</h1>
    <SelectScenesNumberInputComponent />
    <div v-if="scenes.length">
      <draggable v-model="scenes" item-key="id" group="scenes" :animation="200">
        <template #item="{ element }">
          <section>{{ element.id }}</section>
        </template>
      </draggable>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import SelectScenesNumberInputComponent from '@/components/SelectScenesNumberInputComponent.vue'
import { useSceneStore } from '@/stores/useSceneStore'
import draggable from 'vuedraggable'

// STORE
const sceneStore = useSceneStore()

// DATA
// ¿Dejar que el jugador escoja el número de escenas?
const numberOfScenes = 3

const scenes = computed({
  get: () => sceneStore.getScenes,
  set: (value) => sceneStore.updateScenesOrder(value)
})

// HOOKS
onMounted(() => {
  selectRandomScenes(numberOfScenes)
})

// METHODS
function selectRandomScenes(numberOfScenes: number): void {
  sceneStore.selectRandomScenes(numberOfScenes)
}
</script>

<style lang="scss" scoped>
.director-view {
  @include flex($flex-direction: column);
  margin-bottom: 20px;

  section {
    @include flex($flex-direction: column);
    background-color: green;
    width: 400px;
    margin: 20px;
    height: 50px;
    color: white;
  }
}
</style>
