<template>
  <section :class="['banner-section', gameStore.getGameModeName]">
    Espacio para publicidad
  </section>
</template>

<script setup lang="ts">
import { useGameStore } from '@/stores/useGame'

// STORE
const gameStore = useGameStore()
</script>
<style lang="scss">
.banner-section {
  @include flex;
  @include mode-backgorund-color;
  height: 100px;
  min-height: 100px;
  width: 100%;
  background: $main-color;
  color: $white;
  margin: 1px 0;

  &:last-child {
    margin: 0;
    border-radius: 0 0 $border-radius $border-radius;
  }
}
</style>
