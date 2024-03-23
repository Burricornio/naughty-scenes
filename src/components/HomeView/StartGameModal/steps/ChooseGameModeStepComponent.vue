<template>
  <div class="choose-game-mode-container">
    <div
      v-for="mode in modes"
      :key="mode.name"
      :class="['mode-container', mode.name.toLowerCase()]"
      @click="mode.action"
    >
      <div class="title">
        {{ mode.name }}
      </div>
      <ul class="explanation-list">
        <li
          v-for="p in Object.values(mode.explanation)"
          :key="p"
          class="explanation-item"
        >
          {{ p }}
        </li>
      </ul>
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
  explanation: {
    p1: string
    p2: string
    p3: string
  }
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
  improModeExplanation: {
    p1: t('component.choose_game_mode_step.impro_mode_explanation.p1'),
    p2: t('component.choose_game_mode_step.impro_mode_explanation.p2'),
    p3: t('component.choose_game_mode_step.impro_mode_explanation.p3')
  },
  actorModeExplanation: {
    p1: t('component.choose_game_mode_step.actor_mode_explanation.p1'),
    p2: t('component.choose_game_mode_step.actor_mode_explanation.p2'),
    p3: t('component.choose_game_mode_step.actor_mode_explanation.p3')
  },
  directorModeExplanation: {
    p1: t('component.choose_game_mode_step.director_mode_explanation.p1'),
    p2: t('component.choose_game_mode_step.director_mode_explanation.p2'),
    p3: t('component.choose_game_mode_step.director_mode_explanation.p3')
  },
  selectButton: t('button.select')
}

// DATA
const modes: Mode[] = [
  {
    name: GameModeName.IMPRO,
    explanation: {
      p1: text.improModeExplanation.p1,
      p2: text.improModeExplanation.p2,
      p3: text.improModeExplanation.p3
    },
    action: () => goToView(GameModeName.IMPRO)
  },
  {
    name: GameModeName.ACTOR,
    explanation: {
      p1: text.actorModeExplanation.p1,
      p2: text.actorModeExplanation.p2,
      p3: text.actorModeExplanation.p3
    },
    action: () => goToSelectNumberOfScenesStep(GameModeName.ACTOR)
  },
  {
    name: GameModeName.DIRECTOR,
    explanation: {
      p1: text.directorModeExplanation.p1,
      p2: text.directorModeExplanation.p2,
      p3: text.directorModeExplanation.p3
    },
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
    max-width: 350px;
    margin: 10px;
    border-radius: $border-radius;
    padding: 14px;

    &:hover {
      cursor: pointer;
    }

    &.impro {
      @include borders($color: $impro-color);

      &:hover {
        background-color: $impro-color-hover;
      }

      .title {
        background-color: $impro-color;
      }

      .explanation-item::marker {
        color: $impro-color;
      }
    }

    &.actor {
      @include borders($color: $actor-color);

      &:hover {
        background-color: $actor-color-hover;
      }

      .title {
        background-color: $actor-color;
      }

      .explanation-item::marker {
        color: $actor-color;
      }
    }

    &.director {
      @include borders($color: $director-color);

      &:hover {
        background-color: $director-color-hover;
      }

      .title {
        background-color: $director-color;
      }

      .explanation-item::marker {
        color: $director-color;
      }
    }

    .title {
      @include flex;
      font-family: circular, sans-serif;
      font-weight: bold;
      height: 40px;
      width: 100%;
      color: #fff;
      text-transform: uppercase;
      border-radius: 8px;
    }

    .explanation-list {
      padding: 20px;
      height: 110px;
      font-size: 16px;
      text-align: left;
      list-style-type: initial;

      .explanation-item {
        text-align: left;
        margin-bottom: 14px;
      }
    }

    .mode-btn {
      align-self: flex-end;
      margin: 0;
    }
  }
}
</style>
