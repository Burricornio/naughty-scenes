<template>
  <section class="banner-section">
    Espacio para publicidad
    <!-- <img class="banner-image" src="@/assets/img/banners/example.webp" /> -->
  </section>
</template>

<style lang="scss">
.banner-section {
  @include flex;
  min-height: 150px;
  width: 100%;
  color: $main-color;
  background-color: $white;
  margin: 1px 0;
  border-top: 1px solid $main-color;

  .banner-image {
    max-height: 200px;
  }
}
</style>
