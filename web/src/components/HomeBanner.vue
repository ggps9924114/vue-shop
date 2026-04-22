<script setup>
import { NCarousel } from 'naive-ui'
</script>
<template>
  <n-carousel autoplay dot-type="dot" draggable="true">
    <img
      class="carousel-img"
      src="https://plus.unsplash.com/premium_photo-1670360414946-e33a828d1d52?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      style="object-position: center bottom"
    />
    <img
      class="carousel-img"
      src="https://images.unsplash.com/photo-1763380631290-1fcdb1353794?q=80&w=827&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      style="object-position: center center"
    />
    <img
      class="carousel-img"
      src="https://images.unsplash.com/photo-1685913314208-49f7a29f34c8?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      style="object-position: center center"

    />
    <img
      class="carousel-img"
      src="https://images.unsplash.com/photo-1685913311279-26dfea7134eb?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    />
  </n-carousel>
</template>

<style scoped>
.carousel-img {
  width: 100%;
  height: 340px;
  object-fit: cover;
  /* object-position: center center; */
}
</style>
<style></style>
