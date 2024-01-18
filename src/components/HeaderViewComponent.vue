<template>
  <div class="header-view">
    <h1>{{ title }}</h1>
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
.header-view {
  @include flex;
}
</style>
