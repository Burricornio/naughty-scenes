<template>
  <div v-if="sceneStore.allScenesPlayed" class="movie-ended-container">
    <div class="actions-container">
      <p>{{ text.allPlayed }}</p>
      <div class="icons-container">
        <button class="icon-container" @click="repeatAgain(true)">
          <span>Repetir la misma partida</span>
          <Icon class="icon" icon="material-symbols:repeat" />
        </button>
        <button
          v-if="gameStore.getGameMode === GameMode.DIRECTOR"
          class="icon-container"
          @click="repeatAgain(false)"
        >
          <span>Jugar nueva película</span>
          <Icon class="icon" icon="material-symbols:repeat" />
        </button>
        <button v-else class="icon-container" @click="repeatAgain(false)">
          <span>Repetir</span>
          <Icon class="icon" icon="material-symbols:repeat" />
        </button>
        <GoToHomeButtonComponent />
      </div>
    </div>
    <BannerComponent />
    <BannerComponent />
    <BannerComponent />
  </div>
</template>

<script setup lang="ts">
import { EmittedEvent } from '@/events'
import { useI18n } from 'vue-i18n'
import { useSceneStore } from '@/stores/useSceneStore'
import { Icon } from '@iconify/vue'
import { useGameStore } from '@/stores/useGame'
import { GameMode } from '@/stores/useGame/types'
import BannerComponent from '@/components/BannerComponent.vue'
import GoToHomeButtonComponent from '@/components/GoToHomeButtonComponent.vue'

// STORE
const sceneStore = useSceneStore()
const gameStore = useGameStore()

// TEXTS
const { t } = useI18n()
const text = { allPlayed: t('all_played') }

// EMITS
const emit = defineEmits([EmittedEvent.REPEAT_AGAIN])

function repeatAgain(repeatSameGameFlag: boolean) {
  emit(EmittedEvent.REPEAT_AGAIN, repeatSameGameFlag)
}
</script>

<style lang="scss" scoped>
.movie-ended-container {
  @include flex($flex-direction: column, $justify-content: flex-start);
  @include borders;
  width: 100%;
  background: $white;
  padding: 20px 0;
  height: 100%;
  border-radius: $border-radius;

  .actions-container {
    @include flex($flex-direction: column);
    width: 100%;
    flex: 1;
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
}
</style>
@/stores/useGame
