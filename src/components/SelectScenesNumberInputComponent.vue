<template>
  <div class="select-scenes-number">
    <input
      type="number"
      v-bind="scenesNumberInput"
      :max="sceneStore.getDefaultScenesNumberLength"
      :min="minNumber"
      @input="emitSelectedScenesNumber"
    />
    <p class="errors">{{ errors.scenesNumber }}</p>
  </div>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate'
import { useI18n } from 'vue-i18n'
import * as yup from 'yup'
import { useSceneStore } from '@/stores/useSceneStore'
import { EmittedEvent } from '@/events'

const props = defineProps({
  scenesNumber: {
    type: Number,
    required: true
  }
})

// STORE
const sceneStore = useSceneStore()

const minNumber = 1

// TEXTS
const { t } = useI18n()
const text = {
  maxRule: t('rule.max', { number: addMaxInputValue() }),
  minRule: t('rule.min', { number: minNumber }),
  requiredRule: t('rule.required'),
  selectScenesNumber: t('button.select')
}

const { errors, defineInputBinds } = useForm({
  initialValues: {
    scenesNumber: props.scenesNumber
  },
  validationSchema: yup.object({
    scenesNumber: addRules()
  })
})
const scenesNumberInput = defineInputBinds('scenesNumber')

// EMITS
const emit = defineEmits([EmittedEvent.CHANGE_SCENES_NUMBER_LENGTH])

function changeInputValue(value: number | undefined) {
  emit(EmittedEvent.CHANGE_SCENES_NUMBER_LENGTH, value)
}

// METHODS
function addMaxInputValue() {
  return sceneStore.getDefaultScenesNumberLength
}

function addRules() {
  return yup
    .number()
    .transform((val, orig) => (orig === '' ? undefined : val))
    .required(text.requiredRule)
    .min(minNumber, text.minRule)
    .max(sceneStore.getDefaultScenesNumberLength, text.maxRule)
}

function emitSelectedScenesNumber() {
  changeInputValue(scenesNumberInput.value.value)
}
</script>

<style lang="scss" scoped>
.select-scenes-number {
  .errors {
    min-height: 20px;
    color: $error-color;
    font-size: 14px;
    margin-top: 3px;
    text-align: left;
  }
}
</style>
