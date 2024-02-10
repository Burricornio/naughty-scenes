<template>
  <section class="current-director-movie-accordion">
    <div v-if="movie.length">
      <draggable
        class="accordion-container"
        v-model="movie"
        item-key="id"
        group="scenes"
        :animation="200"
        @end="setNewOrder"
      >
        <template #item="{ element }">
          <div class="acordeon-item">
            <header>
              <h2>{{ element.title }}</h2>
              <Icon
                icon="ion:close-round"
                class="remove-icon"
                @click="removeScene(element.id)"
              />
            </header>
            <section>
              <div>{{ element.instructions }}</div>
            </section>
          </div>
        </template>
      </draggable>
    </div>
    <div v-else>No tienes ninguna escena seleccionada</div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import draggable from 'vuedraggable'
import { Icon } from '@iconify/vue'
import { Scene, useSceneStore } from '@/stores/useSceneStore'
import { EmittedEvent } from '@/events'

const sceneStore = useSceneStore()

const scenes = computed(() => sceneStore.getSelectedScenes)

const movie = ref<Scene[]>(scenes.value)

// EMITS
const emit = defineEmits([EmittedEvent.UPDATE_DIRECTOR_MOVIE])

function setNewOrder() {
  emit(EmittedEvent.UPDATE_DIRECTOR_MOVIE, movie.value)
}

// METHODS
function removeScene(sceneId: number): void {
  sceneStore.unselectScene(sceneId)
}
</script>

<style lang="scss" scoped>
.current-director-movie-accordion {
  width: 100%;
  .accordion-container {
    background: white;
    padding: 20px;
    max-height: 500px;
    overflow: scroll;

    .acordeon-item {
      background: green;
      color: white;
      margin: 10px;
      padding: 0 20px 20px 20px;
      cursor: move;

      header {
        @include flex($justify-content: space-between);

        .remove-icon {
          cursor: pointer;
        }
      }
    }
  }
}
</style>
