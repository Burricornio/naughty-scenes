<template>
  <div class="custom-dropdown" ref="dropdownRef">
    <div class="selected-option" @click="toggleDropdown">{{ placeholder }}</div>
    <transition name="fade">
      <div v-if="isDropdownOpen" class="options">
        <div
          v-for="option in options"
          :key="option.id"
          @click="executeAction(option.action)"
        >
          {{ option.text }}
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, Ref } from 'vue'

interface DropdownOption {
  id: number
  text: string
  action: () => void
}

// PROPS
const { options, placeholder } = defineProps({
  options: {
    type: Array<DropdownOption>,
    required: true
  },
  placeholder: {
    type: String,
    required: true
  }
})

// DATA
const isDropdownOpen = ref(false)
const dropdownRef: Ref<HTMLElement | null> = ref(null)

// HOOKS
onMounted(() => {
  document.addEventListener('click', handleDocumentClick)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleDocumentClick)
})

// METHODS
function toggleDropdown(): void {
  isDropdownOpen.value = !isDropdownOpen.value
}

const handleDocumentClick = (event: MouseEvent) => {
  const dropdown = dropdownRef.value

  if (dropdown && !dropdown.contains(event.target as Node)) {
    isDropdownOpen.value = false
  }
}

function executeAction(action: () => void) {
  isDropdownOpen.value = false
  action()
}
</script>

<style lang="scss" scoped>
.custom-dropdown {
  position: relative;
  width: 280px;
}

.selected-option {
  padding: 10px;
  border: 1px solid #ccc;
  cursor: pointer;
}

.options {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  border: 1px solid #ccc;
  background-color: white;
  max-height: 200px;
  overflow-y: auto;

  div {
    padding: 10px;
    cursor: pointer;

    &:hover {
      background-color: #f0f0f0;
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
