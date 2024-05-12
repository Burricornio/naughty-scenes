<template>
  <div class="header-container">
    <h1 class="title" v-html="title" />
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
  height: 84px;
  width: 100%;
  border-radius: $border-radius;
  background-color: $main-color;

  .title {
    color: $white;
    text-transform: uppercase;
  }
}
</style>
