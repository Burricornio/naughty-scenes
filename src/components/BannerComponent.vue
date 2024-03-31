<template>
  <section class="banner-section">Espacio para publicidad</section>
</template>

<style lang="scss">
.banner-section {
  @include flex;
  height: 100px;
  min-height: 100px;
  width: 100%;
  color: $black;
  background-color: $white;
  margin: 1px 0;

  &:last-child {
    margin: 0;
    border-radius: 0 0 $border-radius $border-radius;
  }
}
</style>
