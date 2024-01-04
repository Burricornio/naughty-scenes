<template>
  <div class="select-scenes-number">
    <div class="input-container">
      <label>{{ text.scenesNumberLabel }}:</label>
      <input
        type="number"
        v-bind="scenesNumberInput"
        :max="sceneStore.getDefaultScenesNumberLength"
        :min="minNumber"
      />
      <p class="errors">{{ errors.scenesNumber }}</p>
    </div>
    <button :disabled="disabledBtn" @click="selectScenes">
      {{ text.selectScenesNumber }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useForm } from 'vee-validate'
import { useI18n } from 'vue-i18n'
import * as yup from 'yup'
import { useSceneStore } from '@/stores/useSceneStore'

// STORE
const sceneStore = useSceneStore()

const minNumber = 1

// TEXTS
const { t } = useI18n()
const text = {
  scenesNumberLabel: t('view.director.scenes_number_label'),
  maxRule: t('rule.max', { number: addMaxInputValue() }),
  minRule: t('rule.min', { number: minNumber }),
  requiredRule: t('rule.required'),
  selectScenesNumber: t('button.select')
}

// DATA
const scenesNumber = ref<number>(3)

const { errors, defineInputBinds } = useForm({
  initialValues: {
    scenesNumber: scenesNumber.value
  },
  validationSchema: yup.object({
    scenesNumber: addRules()
  })
})
const scenesNumberInput = defineInputBinds('scenesNumber')

// COMPUTED
const disabledBtn = computed(() => {
  return scenesNumberInput.value.value
    ? scenesNumberInput.value.value > sceneStore.getDefaultScenesNumberLength
    : true
})

// METHODS
function selectScenes(): void {
  if (
    scenesNumberInput.value.value! <= sceneStore.getDefaultScenesNumberLength
  ) {
    sceneStore.selectRandomScenes(scenesNumberInput.value.value as number)
  }
}

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
</script>

<style lang="scss" scoped>
.select-scenes-number {
  @include flex($align-items: flex-start);

  .input-container {
    margin-bottom: 10px;

    input {
      width: 200px;
    }
  }

  button {
    min-width: 130px;
    margin: 22px 0 0 10px;
  }
}
</style>
