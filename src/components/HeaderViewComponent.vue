<template>
  <div class="header-container">
    <h1 class="title">{{ title }}</h1>
    <GoToHomeButtonComponent />
  </div>
</template>

<script setup lang="ts">
import GoToHomeButtonComponent from '@/components/GoToHomeButtonComponent.vue'

// PROPS
const { title } = defineProps({
  title: {
    type: String,
    required: true
  }
})
</script>

<style lang="scss" scoped>
.header-container {
  @include flex;
  height: $header-height;
  background-color: $main-color;

  .title {
    color: $white;
  }
}
</style>
