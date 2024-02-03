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
            <h2>Open: {{ scene.isOpenAccordion }}</h2>
            <Icon
              v-if="scene.type === 'custom'"
              icon="mdi:delete"
              @click.stop="deleteScene(scene)"
            />
          </div>
          <h2>Selected: {{ scene.selected }}</h2>
          <h2>{{ scene.title }}</h2>
        </header>
        <section v-if="scene.isOpenAccordion">
          <div>{{ scene.instructions }}</div>
        </section>
      </li>
    </ul>
  </section>
  <RemoveCustomSceneModal :scene="selectedCustomSceneToRemove" />
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { Scene } from '@/stores/useSceneStore'
import RemoveCustomSceneModal from '@/components/director-view/RemoveCustomSceneModal.vue'
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

// COMPUTED
const modifiedScenes = computed(() => props.scenes)

// METHODS
function addSceneToMovie(scene: Scene) {
  scene.selected = !scene.selected
}

function deleteScene(scene: Scene) {
  selectedCustomSceneToRemove.value = scene
  openRemoveCustomSceneModal()
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
