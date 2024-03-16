<template>
  <div class="choose-game-mode-container">
    <div
      v-for="mode in modes"
      :key="mode.name"
      class="mode-container"
      @click="mode.action"
    >
      <div class="title">
        {{ mode.name }}
      </div>
      <div class="explanation" v-html="mode.explanation" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useModalsStore } from '@/stores/useModalsStore'
import { useRouter } from 'vue-router'
import { useGameStore } from '@/stores/useGame'
import { useI18n } from 'vue-i18n'
import { useCountdownStore } from '@/stores/useCountdownStore'
import { GameModeName } from '@/stores/useGame/types'
import { Step } from './types/stepsTypes'

interface Mode {
  name: string
  explanation: string
  action: () => void
}

// STORE
const countdownStore = useCountdownStore()
const modalsStore = useModalsStore()
const { setGameModeName } = useGameStore()

// ROUTER
const router = useRouter()

// TEXT
const { t } = useI18n()

const text = {
  improModeExplanation: t(
    'component.choose_game_mode_step.impro_mode_explanation'
  ),
  actorModeExplanation: t(
    'component.choose_game_mode_step.actor_mode_explanation'
  ),
  directorModeExplanation: t(
    'component.choose_game_mode_step.director_mode_explanation'
  ),
  selectButton: t('button.select')
}

// DATA
const modes: Mode[] = [
  {
    name: GameModeName.IMPRO,
    explanation: text.improModeExplanation,
    action: () => goToView(GameModeName.IMPRO)
  },
  {
    name: GameModeName.ACTOR,
    explanation: text.actorModeExplanation,
    action: () => goToSelectNumberOfScenesStep(GameModeName.ACTOR)
  },
  {
    name: GameModeName.DIRECTOR,
    explanation: text.directorModeExplanation,
    action: () => goToView(GameModeName.DIRECTOR)
  }
]

function goToView(name: string) {
  countdownStore.setCountdownStatus(true)
  router.push({ name })
}

function goToSelectNumberOfScenesStep(name: GameModeName) {
  modalsStore.setStartMovieModalCurrentStep(Step.SELECTE_SCENES_NUMBER)
  setGameModeName(name)
}
</script>

<style lang="scss" scoped>
.choose-game-mode-container {
  @include flex;
  margin: 10px 0 20px 0;

  .mode-container {
    @include flex($flex-direction: column, $justify-content: flex-start);
    @include borders($color: $modal-color);
    max-width: 350px;
    margin: 10px;
    border-radius: $border-radius;
    padding: 14px;

    &:hover {
      cursor: pointer;
      background-color: #f6e3e6;
    }

    .title {
      @include flex;
      font-family: circular, sans-serif;
      font-weight: bold;
      height: 40px;
      width: 100%;
      color: #fff;
      border: 2px solid #ff3859;
      background-color: #ff3859;
      text-transform: uppercase;
      border-radius: 8px;
    }

    .explanation {
      padding: 20px;
      height: 110px;
      font-size: 16px;

      :deep(ul) {
        padding: 0 10px;
        list-style-type: initial;

        li {
          text-align: left;
          margin-bottom: 14px;

          &::marker {
            color: red;
          }
        }
      }
    }

    .mode-btn {
      align-self: flex-end;
      margin: 0;
    }
  }
}
</style>
