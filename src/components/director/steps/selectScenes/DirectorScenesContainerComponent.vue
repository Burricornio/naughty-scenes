<template>
  <section class="select-scenes-container">
    <ul class="scene-list">
      <li
        v-for="scene in modifiedScenes"
        :key="scene.id"
        :class="[
          'scene-item',
          { selected: scene.selected, custom: scene.type === 'custom' }
        ]"
        @click="addSceneToMovie(scene)"
      >
        <header>
          <div class="title-container">
            <Icon
              v-if="scene.type === 'custom'"
              icon="mdi:delete"
              @click.stop="deleteScene(scene)"
            />
          </div>
          <h2>Selected: {{ scene.selected }}</h2>
          <h2>{{ scene.title }}</h2>
        </header>
      </li>
    </ul>
  </section>
  <RemoveCustomSceneModal :scene="selectedCustomSceneToRemove" />
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { Scene } from '@/stores/useScene/types'
import { useSceneStore } from '@/stores/useScene'
import RemoveCustomSceneModal from '@/components/director/steps/selectScenes/RemoveCustomsceneModal.vue'
import { Icon } from '@iconify/vue'
import useModal from '@/composables/useModal'

// PROPS
const props = defineProps<{
  scenes: Scene[]
}>()

// DATA
const selectedCustomSceneToRemove = ref<Scene | null>(null)

// STORE
const { openRemoveCustomSceneModal } = useModal()
const { selectScene } = useSceneStore()

// COMPUTED
const modifiedScenes = computed(() => props.scenes)

// METHODS
function addSceneToMovie(scene: Scene) {
  scene.selected = !scene.selected
  selectScene(scene)
}

function deleteScene(scene: Scene) {
  selectedCustomSceneToRemove.value = scene
  openRemoveCustomSceneModal()
}
</script>

<style lang="scss" scoped>
.select-scenes-container {
  @include flex;
  .scene-list {
    @include flex;
    flex-wrap: wrap;
    flex: 1;
    justify-content: flex-start;
    width: 100%;
    margin-bottom: 20px;
    align-self: center;

    .scene-item {
      @include borders($color: gold);
      flex-wrap: wrap;
      margin: 10px;
      width: calc(25% - 22px);
      cursor: pointer;
      &.selected {
        border-color: blue;
      }

      &.custom header {
        background: olivedrab;
      }

      header {
        background-color: teal;
        padding: 10px;

        .title-container {
          @include flex($justify-content: space-between);
          color: white;
        }

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
