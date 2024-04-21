<template>
  <NavigationComponent />
  <main class="home-view-content">
    <StartGameModal v-if="open" />
    <div v-else class="slogan-container">
      <p class="slogan">{{ text.slogan_1 }}</p>
      <p class="slogan">{{ text.slogan_2 }}</p>
      <StartGameButtonComponent />
    </div>
  </main>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import useModal from '@/composables/useModal'
import { useResetStore } from '@/stores/useResetStore'
import NavigationComponent from '@/components/home/NavigationComponent.vue'
import StartGameButtonComponent from '@/components/home/StartGameButtonComponent.vue'
import StartGameModal from '@/components/home/StartGameModal/StartGameModal.vue'

// STORE
const { open } = useModal()
const { resetLocalStorage, resetGame } = useResetStore()

// TEXTS
const { t } = useI18n()

const text = {
  slogan_1: t('view.home.slogan_1'),
  slogan_2: t('view.home.slogan_2')
}

// HOOKS
onMounted(() => {
  resetLocalStorage()
  resetGame()
})
</script>

<style lang="scss" scoped>
.home-view-content {
  @include flex;
  height: calc(100% - 150px);
  padding-bottom: 70px;

  .slogan-container {
    @include flex($flex-direction: column);
    height: 100%;
    .slogan {
      align-self: flex-start;
      font-size: 48px;
      font-weight: 600;
      color: $white;
      margin-bottom: 20px;
    }
  }
}
</style>
