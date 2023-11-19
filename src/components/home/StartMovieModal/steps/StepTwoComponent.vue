<template>
  <div class="step-two-container">
    <div v-for="mode in modes" :key="mode.name" class="mode-container">
      <div class="row">
        <button class="mode-btn" @click="mode.action">{{ mode.name }}</button>
      </div>
      <div class="row">
        <p class="explanation">{{ mode.explanation }}</p>
      </div>
    </div>
    <!-- <div class="input-container">
      <label>{{ text.chooseCardsNumber }}:</label>
      <input
        type="number"
        v-bind="cardsNumberInput"
        :max="cardsStore.getCardsNumberLength"
        :min="minNumber"
      />
      <p class="errors">{{ errors.cardsNumber }}</p>
    </div>
    <div class="chooose-cards-container">
      <button @click="selectRandomCards">{{ text.randomDeck }}</button>
      <button @click="chooseCards">{{ text.chooseCards }}</button>
    </div> -->
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
// import { onMounted, ref } from 'vue'
// import { useButtonsStore } from '@/stores/useButtonsStore'
// import { useForm } from 'vee-validate'
// import { useI18n } from 'vue-i18n'
// import * as yup from 'yup'
// import { useCardsStore } from '@/stores/useCardsStore'

// STORE
const router = useRouter()

const modes = [
  {
    name: 'Impro mode',
    action: () => router.push({ name: 'Impro' }),
    explanation:
      'En este modo de juego las escenas van apareciendo aleatoriamente de una a una'
  },
  {
    name: 'Actor mode',
    action: () => router.push({ name: 'Actor' }),
    explanation:
      'En este modo de juego seelciionas el número de escenas que quieres rodar'
  },
  {
    name: 'Director mode',
    action: () => router.push({ name: 'Director' }),
    explanation:
      'En este modo de juego lo configuras todo como quieras y puedes cargar y grabar escenas'
  }
]

// STORE
// const buttonsStore = useButtonsStore()
// const cardsStore = useCardsStore()

// const minNumber = 1

// TEXTS
// const { t } = useI18n()
// const text = {
//   chooseCards: t('component.step_two.choose_cards'),
//   chooseCardsNumber: t('component.step_two.choose_cards_number'),
//   maxRule: t('rule.max', { number: cardsStore.getCardsNumberLength }),
//   minRule: t('rule.min', { number: minNumber }),
//   randomDeck: t('component.step_two.random_deck'),
//   requiredRule: t('rule.required')
// }

// // DATA
// const cardsNumber = ref<number>(1)

// const { errors, defineInputBinds } = useForm({
//   initialValues: {
//     cardsNumber: cardsNumber.value
//   },
//   validationSchema: yup.object({
//     cardsNumber: addRules()
//   })
// })
// const cardsNumberInput = defineInputBinds('cardsNumber')

// HOOKS
// onMounted(() => {
//   buttonsStore.setDisabledStepperLeftButton(false)
//   buttonsStore.setDisabledStepperRightButton(true)
// })

// METHODS
// function selectRandomCards(): void {
//   if (cardsNumberInput.value.value! <= cardsStore.getCardsNumberLength) {
//     cardsStore.selectRandomCards(cardsNumberInput.value.value as number)
//     buttonsStore.setDisabledStepperRightButton(false)
//   }
// }

// function addRules() {
//   return yup
//     .number()
//     .transform((val, orig) => (orig === '' ? undefined : val))
//     .required(text.requiredRule)
//     .min(minNumber, text.minRule)
//     .max(cardsStore.getCardsNumberLength, text.maxRule)
// }

// function chooseCards() {
//   console.log('eligeeeee')
// }
</script>

<style lang="scss" scoped>
.step-two-container {
  @include flex;
  margin-bottom: 20px;

  .mode-container {
    @include flex($flex-direction: column);
    @include borders;
    max-width: 300px;
    min-height: 150px;
    margin: 10px;

    .row {
      @include flex;
      height: 50px;
    }

    .explanation {
      align-self: flex-start;
      text-align: left;
      margin-top: 10px;
      padding: 10px;
    }
  }

  // .input-container {
  //   margin-bottom: 10px;
  // }

  // .chooose-cards-container {
  //   @include flex($justify-content: space-between);
  //   width: 100%;

  //   button {
  //     @include flex;
  //     width: 240px;
  //     height: 250px;
  //     text-transform: uppercase;
  //     background-color: $purple;
  //     border: none;
  //     font-size: 20px;
  //     padding: 20px;

  //     &:hover {
  //       background-color: $fuchsia;
  //     }
  //   }
  // }
}
</style>
