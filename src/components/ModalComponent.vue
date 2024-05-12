<template>
  <div v-if="props.open" class="modal-container">
    <div class="modal-content">
      <button @click="closeModal">
        <Icon icon="ion:close-round" />
      </button>
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { EmittedEvent } from '@/events'

// PROPS
const props = defineProps<{
  open: boolean
}>()

// EMITS
const emit = defineEmits([EmittedEvent.CLOSE_MODAL])

function closeModal() {
  emit(EmittedEvent.CLOSE_MODAL)
}
</script>

<style lang="scss" scoped>
.modal-container {
  @include flex;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;

  .modal-content {
    @include borders($width: 1px, $color: $modal-color);
    position: relative;
    top: -9%;
    background: $black;
    border-radius: $border-radius;
    min-width: 550px;
    overflow: auto;
    padding: $size-02;

    button {
      position: absolute;
      height: 24px;
      min-width: 0;
      top: 16px;
      right: 20px;
      color: $modal-color;
      font-size: 16px;
      background-color: transparent;
      padding: 0;
      border: none;
      margin: 0;
      cursor: pointer;

      &:hover {
        color: $action-color;
      }
    }
  }
}
</style>
