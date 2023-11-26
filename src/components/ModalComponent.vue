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
    @include borders;
    position: relative;
    background: $white;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    border-radius: 4px;
    min-width: 500px;
    overflow: auto;
    padding: 20px;

    button {
      position: absolute;
      height: 20px;
      min-width: 0;
      right: 20px;
      color: $main-color;
      font-size: 18px;
      background-color: transparent;
      padding: 0;
      border: none;
      margin: 0;
    }

    button:hover {
      color: $secondary-color;
      cursor: pointer;
    }
  }
}
</style>
