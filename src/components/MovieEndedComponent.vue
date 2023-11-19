<template>
  <div v-if="sceneStore.allScenesPlayed" class="movie-ended-container">
    <p>{{ text.allPlayed }}</p>
    <div class="icons-container">
      <button class="icon-container" @click="repeatAgain">
        <span>Repetir</span>
        <Icon class="icon" icon="material-symbols:repeat" />
      </button>
      <button class="icon-container" @click="goToHome">
        <span>Ir a inicio</span>
        <Icon class="icon" icon="material-symbols:home" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { EmittedEvent } from '@/events'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useSceneStore } from '@/stores/useSceneStore'
import { Icon } from '@iconify/vue'

// ROUTER
const router = useRouter()

// STORE
const sceneStore = useSceneStore()

// TEXTS
const { t } = useI18n()
const text = { allPlayed: t('all_played') }

// EMITS
const emit = defineEmits([EmittedEvent.REPEAT_AGAIN])

function repeatAgain() {
  emit(EmittedEvent.REPEAT_AGAIN)
}

// METHODS
function goToHome() {
  router.push({ name: 'Home' })
}
</script>

<style lang="scss" scoped>
.movie-ended-container {
  @include flex($flex-direction: column);
  @include borders;
  background: $white;
  padding: 20px;
  margin: 10px;

  .icons-container {
    @include flex;
    margin: 10px;

    .icon-container {
      @include flex;
      padding: 10px;
      margin-left: 20px;

      .icon {
        margin-left: 4px;
        font-size: 25px;
      }
    }
  }
}
</style>
