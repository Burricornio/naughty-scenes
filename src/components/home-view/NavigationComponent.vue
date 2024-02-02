<template>
  <nav class="nav-container">
    <div class="nav-toolbar">
      <div class="app-name">{{ text.appName }}</div>
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

  .nav-toolbar {
    @include flex($justify-content: space-between);
    width: 100%;
    height: $header-height;
    color: $white;

    .app-name {
      font-family: Arial, Helvetica, sans-serif;
      font-size: 28px;
      font-weight: bold;
      text-transform: uppercase;
    }

    .nav-list {
      @include flex($justify-content: space-between);
      width: 300px;

      .nav-item {
        padding: $padding-01 $padding-02;
        font-size: 16px;
        cursor: pointer;

        &:hover {
          background-color: $main-color;
          border-radius: $border-radius;
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
