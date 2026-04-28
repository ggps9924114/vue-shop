<script setup>
import { useRouter } from 'vue-router'
import { not_found } from '@/assets'
import { NButton } from 'naive-ui'

const router = useRouter()
</script>
<template>
  <div class="min-h-screen bg-slate-200 flex items-center justify-center">
    <div class="flex flex-col items-center gap-6 text-center">
      <img :src="not_found" class="w-72 opacity-90" />
      <div class="flex flex-col gap-2">
        <h1 class="text-4xl font-bold text-navy">404</h1>
        <p class="text-slate-500 text-2xl font-bold">找不到這個頁面</p>
        <p class="text-slate-400 text-xl">你要找的頁面不存在或已經被移除</p>
      </div>
      <n-button type="primary" size="medium" @click="router.push({ name: 'home' })"
        >回到首頁</n-button
      >
    </div>
  </div>
</template>
<style scpoed></style>
