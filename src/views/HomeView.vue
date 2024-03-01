<template>
  <NavigationComponent />
  <main class="home-view-content">
    <StartMovieModal v-if="open" />
    <div v-else class="slogan-container">
      <p class="slogan">{{ text.slogan_1 }}</p>
      <p class="slogan">{{ text.slogan_2 }}</p>
      <StartMovieButtonComponent />
    </div>
  </main>
</template>

<script setup lang="ts">
import useModal from '@/composables/useModal'
import { useI18n } from 'vue-i18n'
import NavigationComponent from '@/components/home-view/NavigationComponent.vue'
import StartMovieButtonComponent from '@/components/home-view/StartMovieButtonComponent.vue'
import StartMovieModal from '@/components/home-view/StartMovieModal/StartMovieModal.vue'
import { onMounted } from 'vue'
import { useResetStore } from '@/stores/useResetStore'

// STORE
const { open } = useModal()
const { resetLocalStorage } = useResetStore()

// TEXTS
const { t } = useI18n()

const text = {
  slogan_1: t('view.home.slogan_1'),
  slogan_2: t('view.home.slogan_2')
}

// HOOKS
onMounted(() => {
  resetLocalStorage()
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
