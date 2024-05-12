<template>
  <mark @click="goHome" class="app-name-container">
    <div class="app-name">
      <span>naughty</span>
      <span>scenes</span>
    </div>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 400 60"
      preserveAspectRatio="none"
    >
      <path
        d="m 3.518915,27.827324 c 55.429038,4.081 111.581115,5.822 167.117815,2.867 22.70911,-1.208 45.39827,-0.601 68.126,-0.778 28.38172,-0.223 56.76078,-1.024 85.13721,-1.33 24.17378,-0.261 48.4273,0.571 72.58114,0.571"
      />
    </svg>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 400 60"
      preserveAspectRatio="none"
      stroke="#F1FB02"
    >
      <path
        d="m 3.518915,27.827324 c 55.429038,4.081 111.581115,5.822 167.117815,2.867 22.70911,-1.208 45.39827,-0.601 68.126,-0.778 28.38172,-0.223 56.76078,-1.024 85.13721,-1.33 24.17378,-0.261 48.4273,0.571 72.58114,0.571"
      />
    </svg>
  </mark>
</template>

<script setup lang="ts">
import useRedirect from '@/composables/useRedirect'

const { goHome } = useRedirect()
</script>

<style lang="scss" scoped>
mark.app-name-container {
  position: relative;
  display: inline-block;
  background: none;
  outline: none;
  cursor: pointer;

  svg {
    position: absolute;
    top: -10%;
    left: -10%;
    right: -10%;
    bottom: -10%;
    overflow: hidden;
    margin: auto;
    padding: 0;
    fill: none;
    stroke: $main-color;
    stroke-width: 54px;
    stroke-dasharray: 400;
    stroke-dashoffset: 400;
    stroke-dashoffset: 0;
    // z-index: -1;

    &:last-of-type,
    &:first-of-type {
      transform: skewX(-17deg);
    }
  }

  .app-name {
    position: relative;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 36px;
    font-weight: bold;
    text-transform: uppercase;
    color: $white;
    z-index: 1;
  }

  span ~ span {
    color: $highlighted-color;
    margin-left: 8px;
  }
}
</style>
