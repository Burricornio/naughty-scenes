<template>
  <form class="enter-players-name-container" autocomplete="off">
    <div class="input-container">
      <div class="input-wrapper">
        <input
          type="text"
          v-model="player1"
          v-bind="player1Attrs"
          class="input-field"
          :id="PLAYER_1"
          :name="PLAYER_1"
          @change="($event) => saveName($event, PLAYER_1)"
          :placeholder="text.playerName1"
        />
        <Icon
          v-if="player1.length"
          class="close-icon"
          icon="ion:close-round"
          @click="player1 = ''"
        />
      </div>
      <p class="errors">{{ errors.player1 }}</p>
    </div>
    <div class="input-container">
      <div class="input-wrapper">
        <input
          type="text"
          v-model="player2"
          v-bind="player2Attrs"
          class="input-field"
          :id="PLAYER_2"
          :name="PLAYER_2"
          @change="($event) => saveName($event, PLAYER_2)"
          :placeholder="text.playerName2"
        />
        <Icon
          v-if="player2.length"
          class="close-icon"
          icon="ion:close-round"
          @click="player2 = ''"
        />
      </div>
      <p class="errors">{{ errors.player2 }}</p>
    </div>
    <button :disabled="disabledButton" @click="goToSelectModeStep">
      {{ text.next }}
    </button>
  </form>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { Step } from '@/components/HomeView/StartGameModal/steps/types/stepsTypes'
import { useGameStore } from '@/stores/useGame'
import { useModalsStore } from '@/stores/useModalsStore'
import { useI18n } from 'vue-i18n'
import { useForm } from 'vee-validate'
import { Icon } from '@iconify/vue'
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

const { errors, defineField } = useForm({
  initialValues: {
    player1: useGame.getPlayerNames[PLAYER_1],
    player2: useGame.getPlayerNames[PLAYER_2]
  },
  validationSchema: yup.object({
    player1: requiredField(),
    player2: requiredField()
  })
})

const [player1, player1Attrs] = defineField(PLAYER_1)
const [player2, player2Attrs] = defineField(PLAYER_2)

const isFormInValid = computed(
  () => !(player1.value.length >= 3 && player2.value.length >= 3)
)

// WATCHER
watch([player1, player2], () => {
  disabledButton.value = isFormInValid.value
})

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

function goToSelectModeStep() {
  modalsStore.setStartMovieModalCurrentStep(Step.SELECT_MOVIE_MODE)
}
</script>

<style lang="scss" scoped>
.enter-players-name-container {
  @include flex($flex-direction: column);
  padding: $padding-01 $padding-02 0 $padding-02;
  margin-top: 10px;

  .input-container {
    @include flex($flex-direction: column, $align-items: flex-start);
    position: relative;

    &:first-of-type {
      margin-bottom: 20px;
    }

    .input-wrapper {
      @include flex;
      width: 100%;

      .input-field {
        width: 100%;
        padding-right: 30px;

        &:hover + .close-icon,
        &:focus + .close-icon {
          opacity: 1;
        }
      }

      .close-icon {
        position: absolute;
        font-size: 12px;
        right: 10px;
        top: 13px;
        color: $main-color;
        opacity: 0;
        transition: opacity 0.3s ease-in-out;
        cursor: pointer;

        &:hover {
          opacity: 1;
        }
      }
    }
  }

  button {
    align-self: flex-end;
    margin-right: 0;
  }
}
</style>
