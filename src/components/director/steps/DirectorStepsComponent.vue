<template>
  <section class="director-steps">
    <DirectorStepsButtonsComponent
      :changeStartedMovieFlag="props.changeStartedMovieFlag"
    />

    <!-- STEP 1: Select scenes -->
    <DirectorSelectScenesComponent v-if="step === DirectorStep.SELECT_SCENES" />

    <!-- STEP 2 -->
    <DirectorOrderScenes
      v-if="step === DirectorStep.ORDER_SCENES"
      :key="orderDirectorMovieKey"
      @update-director-movie="updateMovie"
      @reload-component="onReloadComponent"
    />

    <!-- STEP 3 -->
    <div v-if="step === DirectorStep.CONFIGURE_MOVIE">
      <DirectorSetUpComponent />
    </div>
  </section>
  <BannerComponent />
  <AddNewSceneModal />
</template>

<script setup lang="ts">
import { onMounted, computed, ref } from 'vue'
import { useDirectorStore } from '@/stores/useDirector'
import { Scene } from '@/stores/useScene/types'
import { useSceneStore } from '@/stores/useScene'
import { DirectorStep } from '@/views/DirectorView/types/directorViewTypes'
import AddNewSceneModal from '@/components/director/AddNewSceneModal.vue'
import DirectorOrderScenes from '@/components/director/steps/orderScenes/DirectorOrderScenesComponent.vue'
import DirectorSetUpComponent from '@/components/director/DirectorSetUpComponent.vue'
import BannerComponent from '@/components/BannerComponent.vue'
import DirectorStepsButtonsComponent from '@/components/director/steps/DirectorStepsButtonsComponent.vue'
import DirectorSelectScenesComponent from '@/components/director/steps/selectScenes/DirectorSelectScenesComponent.vue'
// PROPS
const props = defineProps<{
  changeStartedMovieFlag: () => void
}>()

// STORE
const sceneStore = useSceneStore()
const directorStore = useDirectorStore()

// DATA
const orderDirectorMovieKey = ref<number>(0)

// COMPUTED
const step = computed(() => directorStore.getDirectorStep)

// HOOKS
onMounted(() => {
  sceneStore.selectScenes({
    numberOfScenes: sceneStore.getDefaultScenesNumberLength,
    shuffle: false
  })
})

// METHODS
function updateMovie(scenes: Scene[]) {
  sceneStore.updateScenesOrder(scenes)
}

function onReloadComponent() {
  orderDirectorMovieKey.value += 1
}
</script>

<style lang="scss" scoped>
.director-steps {
  @include flex($flex-direction: column, $justify-content: flex-start);
  @include borders($width: 10px, $color: $white);
  width: 100%;
  background-color: $white;
  flex: 1;
  box-sizing: border-box;
}
</style>
