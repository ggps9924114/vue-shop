<script setup>
import { NCarousel } from 'naive-ui'
</script>
<template>
  <n-carousel autoplay dot-type="dot" draggable="true">
    <img
      class="carousel-img"
      src="https://images.unsplash.com/photo-1592468253421-44b1108ddc95?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      style="object-position: center 70%"
    />
    <img
      class="carousel-img"
      src="https://media.istockphoto.com/id/2249649493/photo/adorable-dog-wrapped-in-a-soft-towel-lying-next-to-pet-grooming-supplies-on-a-pastel-pink.webp?a=1&b=1&s=612x612&w=0&k=20&c=O8q0jdupwZNlTWhvbqU83EO7e1aHgJKhrojxxA1EXww="
      style="object-position: center 60%"
    />
    <img
      class="carousel-img"
      src="https://plus.unsplash.com/premium_photo-1756383544375-2705f502b1e8?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fHBldCUyMHByb2R1Y3QlMjBiYW5uZXJ8ZW58MHx8MHx8fDA%3D"
      style="object-position: center 70%"
    />
    <img
      class="carousel-img"
      src="https://images.unsplash.com/photo-1581888227599-779811939961?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTR8fHBldCUyMHByb2R1Y3QlMjBiYW5uZXJ8ZW58MHx8MHx8fDA%3D"
      style="object-position: center 80%"
    />
  </n-carousel>
</template>

<style scoped>
.carousel-img {
  width: 100%;
  height: 540px;
  object-fit: cover;
  /* object-position: center center; */
}
</style>
<style></style>
