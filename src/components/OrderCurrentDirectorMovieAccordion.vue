<template>
  <section class="current-director-movie-accordion">
    <div v-if="currentMovie.length">
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
              <Icon
                icon="ion:close-round"
                class="remove-icon"
                @click="removeScene(element.id)"
              />
            </header>
            <section v-if="element.isOpenAccordion">
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
import { useDirectorSceneStore } from '@/stores/useDirectorSceneStore'
import draggable from 'vuedraggable'
import { Icon } from '@iconify/vue'
import { EmittedEvent } from '@/events'

// STORE
const directorSceneStore = useDirectorSceneStore()

// DATA
const unselectSceneIds = ref<number[]>([])

// COMPUTED
const currentMovie = computed({
  get: () => directorSceneStore.getCurrentMovie,
  set: (value) => directorSceneStore.updateCurrentMovie(value)
})

// EMITS
const emit = defineEmits([EmittedEvent.UNSELECT_SCENES])

function emitUnselectSceneIds(ids: number[]) {
  emit(EmittedEvent.UNSELECT_SCENES, ids)
}

// METHODS
function removeScene(sceneId: number): void {
  directorSceneStore.removeCurrentMovieScene(sceneId)
  unselectSceneIds.value.push(sceneId)
  emitUnselectSceneIds(unselectSceneIds.value)
}
</script>

<style lang="scss" scoped>
.accordion-container {
  background: white;
  padding: 20px;

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
</style>
