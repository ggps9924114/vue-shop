<script setup></script>
<script setup>
import { useUserStore } from '@/store'
import SideMenu from './SideMenu.vue'

const userStore = useUserStore()
</script>

<template>
  <SideMenu>
    <div class="min-h-screen bg-slate-200">
      <div class="container mx-auto px-6 py-12">
        <div class="bg-white rounded-2xl shadow-sm p-8 max-w-lg mx-auto">
          <h2 class="text-2xl font-bold text-slate-800 mb-6">個人資料</h2>

          <div class="flex flex-col gap-4">
            <div class="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
              <!-- 頭像區塊 -->
              <div
                class="w-16 h-16 rounded-full bg-navy flex items-center justify-center text-white text-2xl font-bold"
              >
                {{ userStore.account?.charAt(0).toUpperCase() }}
              </div>
              <div>
                <p class="font-bold text-lg">{{ userStore.account }}</p>
                <p class="text-slate-400 text-sm">
                  {{ userStore.isAdmin ? '管理員' : '一般用戶' }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </SideMenu>
</template>

<style scoped></style>
<style scoped></style>
