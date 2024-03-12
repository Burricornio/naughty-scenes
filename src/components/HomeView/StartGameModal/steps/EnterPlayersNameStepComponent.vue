<template>
  <form class="step-one-form" autocomplete="off">
    <div class="input-container">
      <div class="input-error">
        <input
          type="text"
          v-bind="player1"
          :id="PLAYER_1"
          :name="PLAYER_1"
          @change="($event) => saveName($event, PLAYER_1)"
          :placeholder="text.playerName1"
        />
        <p class="errors">{{ errors.player1 }}</p>
      </div>
    </div>
    <div class="input-container">
      <div class="input-error">
        <input
          type="text"
          v-bind="player2"
          :id="PLAYER_2"
          :name="PLAYER_2"
          @change="($event) => saveName($event, PLAYER_2)"
          :placeholder="text.playerName2"
        />
        <p class="errors">{{ errors.player2 }}</p>
      </div>
    </div>
    <button :disabled="disabledButton" @click="goToStepTwo">
      {{ text.next }}
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { Step } from '@/components/HomeView/StartGameModal/steps/types/stepsTypes'
import { useGameStore } from '@/stores/useGame'
import { useModalsStore } from '@/stores/useModalsStore'
import { useI18n } from 'vue-i18n'
import { useForm } from 'vee-validate'
import * as yup from 'yup'

const minCharacters = 3
const PLAYER_1 = 'player1'
const PLAYER_2 = 'player2'
const disabledButton = ref<boolean>(true)

// STORE
const useGame = useGameStore()
const modalsStore = useModalsStore()

// TEXTS
const { t } = useI18n()
const text = {
  minRule: t('rule.min', { number: minCharacters }),
  next: t('button.next'),
  playerName1: t('component.step_one.player_name', { number: 1 }),
  playerName2: t('component.step_one.player_name', { number: 2 }),
  requiredRule: t('rule.required')
}

const { errors, defineInputBinds } = useForm({
  initialValues: {
    player1: useGame.getPlayerNames[PLAYER_1],
    player2: useGame.getPlayerNames[PLAYER_2]
  },
  validationSchema: yup.object({
    player1: requiredField(),
    player2: requiredField()
  })
})

const player1 = defineInputBinds(PLAYER_1)
const player2 = defineInputBinds(PLAYER_2)

// WATCHER
watch(
  [() => useGame.getPlayerNames.player1, () => useGame.getPlayerNames.player2],
  ([value1, value2]) => {
    disabledButton.value = !(value1.length >= 3 && value2.length >= 3)
  }
)

// METHODS
async function saveName(e: Event, fieldname: 'player1' | 'player2') {
  const name = (e.target as HTMLInputElement).value
  useGame.setPlayerNames({ player: fieldname, name: '' })
  setTimeout(() => {
    if (!errors.value[fieldname]) {
      useGame.setPlayerNames({ player: fieldname, name })
    }
  }, 100)
}

function requiredField() {
  return yup
    .string()
    .required(text.requiredRule)
    .min(minCharacters, text.minRule)
}

function goToStepTwo() {
  modalsStore.setStartMovieModalCurrentStep(Step.SELECT_MOVIE_MODE)
}
</script>

<style lang="scss" scoped>
.step-one-form {
  @include flex($flex-direction: column);
  padding: $padding-01 $padding-02 0 $padding-02;
  margin-top: 10px;

  .input-container {
    @include flex;

    &:first-of-type {
      margin-bottom: 20px;
    }

    label {
      align-self: flex-start;
      width: 60px;
      line-height: 23px;
      margin-right: 4px;
      text-align: left;
    }

    .input-error {
      @include flex($flex-direction: column, $align-items: flex-start);
      width: 100%;
    }
    .errors {
      min-height: 20px;
      color: $error-color;
      font-size: 14px;
      margin-top: 3px;
    }
  }

  button {
    align-self: flex-end;
    margin-right: 0;
  }
}
</style>@/stores/useGame
