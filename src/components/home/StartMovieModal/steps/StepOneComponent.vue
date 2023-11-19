<template>
  <form class="step-one-form" autocomplete="off">
    <div class="input-container">
      <label>{{ text.playerName1 }}</label>
      <input
        type="text"
        v-bind="player1"
        :id="PLAYER_1"
        :name="PLAYER_1"
        @change="($event) => saveName($event, PLAYER_1)"
      />
      <p class="errors">{{ errors.player1 }}</p>
    </div>
    <div class="input-container">
      <label>{{ text.playerName2 }}</label>
      <input
        type="text"
        v-bind="player2"
        :id="PLAYER_2"
        :name="PLAYER_2"
        @change="($event) => saveName($event, PLAYER_2)"
      />
      <p class="errors">{{ errors.player2 }}</p>
    </div>
    <button :disabled="disabledButton">SIGUIENTE</button>
  </form>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useMovieStore } from '@/stores/useMovieStore'
import { useI18n } from 'vue-i18n'
import { useForm } from 'vee-validate'
import * as yup from 'yup'

const minCharacters = 3
const PLAYER_1 = 'player1'
const PLAYER_2 = 'player2'
const disabledButton = ref<boolean>(true)

// STORE
const movieStore = useMovieStore()

// TEXTS
const { t } = useI18n()
const text = {
  minRule: t('rule.min', { number: minCharacters }),
  playerName1: t('component.step_one.player_name', { number: 1 }),
  playerName2: t('component.step_one.player_name', { number: 2 }),
  requiredRule: t('rule.required')
}

const { errors, defineInputBinds } = useForm({
  initialValues: {
    player1: movieStore.getPlayerNames[PLAYER_1],
    player2: movieStore.getPlayerNames[PLAYER_2]
  },
  validationSchema: yup.object({
    player1: requiredField(),
    player2: requiredField()
  })
})

const player1 = defineInputBinds(PLAYER_1)
const player2 = defineInputBinds(PLAYER_2)

// // WATCHER
watch(
  [
    () => movieStore.getPlayerNames.player1,
    () => movieStore.getPlayerNames.player2
  ],
  ([value1, value2]) => {
    disabledButton.value = !(value1.length >= 3 && value2.length >= 3)
  }
)

// METHODS
async function saveName(e: Event, fieldname: 'player1' | 'player2') {
  const name = (e.target as HTMLInputElement).value
  movieStore.setPlayerNames({ player: fieldname, name: '' })
  setTimeout(() => {
    if (!errors.value[fieldname]) {
      movieStore.setPlayerNames({ player: fieldname, name })
    }
  }, 100)
}

function requiredField() {
  return yup
    .string()
    .required(text.requiredRule)
    .min(minCharacters, text.minRule)
}
</script>

<style lang="scss" scoped>
.step-one-form {
  @include flex($flex-direction: column);

  .input-container {
    &:first-of-type {
      margin-bottom: 20px;
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
    margin-top: 20px;
  }
}
</style>
