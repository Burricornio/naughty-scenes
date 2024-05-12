<template>
  <div v-if="sceneStore.allScenesPlayed" class="game-ended-container">
    <AppNameComponent />
    <div class="actions-container">
      <div class="texts-container">
        <p class="all-played-text">{{ text.allPlayed }}</p>
        <p class="all-played-text">{{ text.andNow }}</p>
      </div>
      <div class="icons-container">
        <button class="icon-container" @click="repeatAgain(true)">
          <span>{{ firstBtnText }}</span>
          <!-- <Icon class="icon" icon="material-symbols:repeat" /> -->
        </button>
        <button
          v-if="modeStore.getIsDirectorMode"
          class="icon-container"
          @click="repeatAgain(false)"
        >
          <span>{{ text.playNewMovie }}</span>
          <!-- <Icon class="icon" icon="material-symbols:repeat" /> -->
        </button>
        <button v-else class="icon-container" @click="repeatAgain(false)">
          <span>{{ text.repeatSameMode }}</span>
          <!-- <Icon class="icon" icon="material-symbols:repeat" /> -->
        </button>
        <button class="icon-container" @click="goHome">
          <span>{{ text.goHome }}</span>
          <!-- <Icon class="icon" icon="material-symbols:repeat" /> -->
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { EmittedEvent } from '@/events'
import { useI18n } from 'vue-i18n'
import { useSceneStore } from '@/stores/useScene'
import useRedirect from '@/composables/useRedirect'
import { useModeStore } from '@/stores/useMode'
import AppNameComponent from '@/components/AppNameComponent.vue'

// import { Icon } from '@iconify/vue'
// import BannerComponent from '@/components/BannerComponent.vue'

// STORE
const sceneStore = useSceneStore()
const modeStore = useModeStore()

const { goHome } = useRedirect()

// COMPUTED
const mode = computed(() => modeStore.getModeName)

const firstBtnText = computed(() =>
  modeStore.getIsDirectorMode ? text.repeatSameMovie : text.repeatSameScenes
)

// TEXTS
const { t } = useI18n()
const text = {
  allPlayed: t('all_played'),
  andNow: t('and_now'),
  goHome: t('component.game_ended.go_home'),
  repeatSameScenes: t('component.game_ended.repeat_same_scenes'),
  repeatSameMovie: t('component.game_ended.repeat_same_movie'),
  playNewMovie: t('component.game_ended.play_new_movie'),
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
  padding-top: 40px;
  padding-bottom: 10px;

  .texts-container {
    @include flex($flex-direction: column);
    min-height: 200px;

    .all-played-text {
      font-weight: bold;
      width: 100%;
      padding: 10px;
    }
  }

  .actions-container {
    @include flex($flex-direction: column);
    width: 100%;
    flex: 1;
    background-color: $white;
    padding-top: 20px;
    border-radius: 0 0 $border-radius $border-radius;

    .icons-container {
      @include flex;
      margin: 10px;

      .icon-container {
        @include flex;
        padding: 10px;
        margin-left: 20px;
        background-color: $white;
        border-color: $main-color;
        color: $main-color;

        .icon {
          color: $main-color;
          margin-left: 4px;
          font-size: 25px;
        }

        &:hover {
          background-color: $main-color;
          color: $white;
        }
      }
    }
  }
}
</style>
