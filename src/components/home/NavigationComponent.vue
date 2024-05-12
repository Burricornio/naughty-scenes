<template>
  <nav class="nav-container">
    <div class="nav-toolbar">
      <AppNameComponent />
      <ul class="nav-list">
        <li v-for="(link, index) in links" :key="index" class="nav-item">
          <a class="nav-link" :href="link.route">{{ link.name }}</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import AppNameComponent from '@/components/AppNameComponent.vue'

// TEXTS
const { t } = useI18n()

const text = {
  appName: t('component.navigation.app_name'),
  login: t('component.navigation.login'),
  info: t('component.navigation.info'),
  contact: t('component.navigation.contact')
}

const links = [
  {
    name: text.login,
    route: '#'
  },
  {
    name: text.info,
    route: '#'
  },
  {
    name: text.contact,
    route: '#'
  }
]
</script>

<style lang="scss" scoped>
.nav-container {
  @include flex;
  position: sticky;
  margin: $size-02 0;
  .nav-toolbar {
    @include flex($justify-content: space-between);
    width: 80%;
    max-width: 1300px;
    height: $header-height;
    color: $white;

    .nav-list {
      @include flex($justify-content: space-between);
      width: 300px;

      .nav-item {
        padding: $size-01 $size-02;
        font-size: 18px;
        width: 200px;
        cursor: pointer;

        &:hover {
          // border: 1px solid $white;
          background-color: $yellow-02;
          // border-radius: $border-radius;
        }

        .nav-link {
          font-family: circular, sans-serif;
          color: $white;
          font-weight: 600;
          text-decoration: none;
        }
      }
    }
  }
}
</style>
