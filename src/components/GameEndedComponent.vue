<template>
  <div v-if="sceneStore.allScenesPlayed" class="game-ended-container">
    <div class="actions-container">
      <p class="all-played-text">{{ text.allPlayed }}</p>
      <div class="icons-container">
        <button class="icon-container" @click="repeatAgain(true)">
          <span>{{ text.repeatSameScenes }}</span>
          <Icon class="icon" icon="material-symbols:repeat" />
        </button>
        <button
          v-if="modeStore.getIsDirectorMode"
          class="icon-container"
          @click="repeatAgain(false)"
        >
          <span>{{ text.allPlayed }}</span>
          <Icon class="icon" icon="material-symbols:repeat" />
        </button>
        <button v-else class="icon-container" @click="repeatAgain(false)">
          <span>{{ text.repeatSameMode }}</span>
          <Icon class="icon" icon="material-symbols:repeat" />
        </button>
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
import { useSceneStore } from '@/stores/useScene'
import { Icon } from '@iconify/vue'
import { useModeStore } from '@/stores/useMode'
import { Mode } from '@/stores/useMode/types'
import BannerComponent from '@/components/BannerComponent.vue'
import { computed } from 'vue'

// STORE
const sceneStore = useSceneStore()
const modeStore = useModeStore()

// COMPUTED
const mode = computed(() => modeStore.getModeName)

// TEXTS
const { t } = useI18n()
const text = {
  allPlayed: t('all_played'),
  repeatSameScenes: t('component.game_ended.repeat_same_scenes'),
  repeatSameMode: t('component.game_ended.repeat_same_mode', {
    mode: mode.value
  })
}

// EMITS
const emit = defineEmits([EmittedEvent.REPEAT_AGAIN])

function repeatAgain(repeatSameGameFlag: boolean) {
  emit(EmittedEvent.REPEAT_AGAIN, repeatSameGameFlag)
}
</script>

<style lang="scss" scoped>
.game-ended-container {
  @include flex($flex-direction: column, $justify-content: flex-start);
  width: 100%;
  background: $white;
  height: 100%;
  border-radius: 0 0 $border-radius $border-radius;

  .all-played-text {
    font-weight: bold;
    width: 100%;
    text-transform: uppercase;
    padding: 10px;
  }

  .actions-container {
    @include flex($flex-direction: column);
    width: 100%;
    flex: 1;
    padding-top: 20px;

    .icons-container {
      @include flex;
      margin: 10px;

      .icon-container {
        @include flex;
        padding: 10px;
        margin-left: 20px;
        background-color: $white;

        .icon {
          margin-left: 4px;
          font-size: 25px;
        }
      }
    }
  }
}
</style>
