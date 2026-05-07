<script setup>
import { useUserStore, useOrderStore, useCartStore } from '@/store'
import SideMenu from './SideMenu.vue'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { NButton } from 'naive-ui'

const orderStore = useOrderStore()
const userStore = useUserStore()
const cartStore = useCartStore()
const router = useRouter()

// 取得該帳號所有訂單
const myOrders = computed(() => orderStore.getOrdersByAccount(userStore.account))

// 累計已購的訂單數量
const totalOrders = computed(() => myOrders.value.length)

// 累計消費金額
const totalSpent = computed(() => myOrders.value.reduce((sum, order) => sum + order.totalPrice, 0))
</script>

<template>
  <SideMenu>
    <div class="min-h-screen bg-slate-200">
      <div class="container mx-auto px-6 py-12">
        <div class="flex flex-col gap-4 max-w-2xl mx-auto">
          <!-- 個人資料 -->
          <div class="bg-white rounded-2xl shadow-sm p-8">
            <h2 class="text-xl font-bold text-slate-800 mb-2">個人資料</h2>
            <div class="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
              <div
                class="w-16 h-16 rounded-full bg-navy flex items-center justify-center text-white text-2xl font-bold"
              >
                {{ userStore.account?.charAt(0).toUpperCase() }}
              </div>
              <div>
                <p class="font-bold text-lg">{{ userStore.account }}</p>
                <span
                  class="text-xs px-2 p-1 rounded-full"
                  :class="userStore.isAdmin ? 'bg-navy text-white' : 'bg-slate-200 text-slate-600'"
                >
                  {{ userStore.isAdmin ? '管理員' : '一般用戶' }}
                </span>
              </div>
            </div>
          </div>

          <!-- 🆕 數據統計卡片 -->
          <div class="grid grid-cols-3 gap-3 bg-white p-4 rounded-xl">
            <div class="bg-slate-50 rounded-xl p-4 text-center">
              <p class="text-xl sm:text-2xl font-bold text-navy">{{ totalOrders }}</p>
              <p class="text-xs text-slate-400 mt-1">累計訂單</p>
            </div>
            <div class="bg-slate-50 rounded-xl p-4 text-center">
              <p class="text-md mb-3 sm:text-2xl font-bold text-navy break-all">$ {{ totalSpent }}</p>
              <p class="text-xs text-slate-400 mt-1">累計消費</p>
            </div>
            <div class="bg-slate-50 rounded-xl p-4 text-center">
              <p class="text-xl sm:text-2xl font-bold text-navy">{{ cartStore.totalQuantity }}</p>
              <p class="text-xs text-slate-400 mt-1">購物車商品</p>
            </div>
          </div>

          <!-- 快速連結 -->
          <div class="bg-white rounded-2xl shadow-sm p-6">
            <h3 class="text-xl font-bold text-slate-800 mb-2">快速連結</h3>
            <div class="grid grid-cols-2 gap-3 sm:flex sm:flex-col">
              <!-- 前往我的訂單 -->
              <div
                class="flex items-center gap-3 p-4 bg-slate-50 rounded-xl cursor-pointer hover:bg-slate-100 transition-colors"
                @click="router.push({ name: 'MyStore' })"
              >
                <div
                  class="w-10 h-10 rounded-xl bg-navy flex items-center justify-center text-white flex-shrink-0"
                >
                  📦
                </div>
                <div>
                  <p class="font-bold text-sm">我的訂單</p>
                  <p class="text-xs text-slate-400">查看歷史訂單</p>
                </div>
              </div>

              <!-- 前往我的賣場 -->
              <div
                class="flex items-center gap-3 p-4 bg-slate-50 rounded-xl cursor-pointer hover:bg-slate-100 transition-colors"
                @click="router.push({ name: 'MyStore' })"
              >
                <div
                  class="w-10 h-10 rounded-xl bg-navy flex items-center justify-center text-white flex-shrink-0"
                >
                  🏪
                </div>
                <div>
                  <p class="font-bold text-sm">我的賣場</p>
                  <p class="text-xs text-slate-400">管理商品</p>
                </div>
              </div>
            </div>
          </div>

          <!-- 🆕 最近訂單 -->
          <div class="bg-white rounded-2xl shadow-sm p-6">
            <h3 class="font-bold text-slate-800 mb-4">最近訂單</h3>

            <div v-if="myOrders.length === 0" class="text-center py-6">
              <p class="text-slate-400 text-sm">目前還沒有訂單記錄</p>
            </div>

            <!-- 有訂單時，只顯示最近 3 筆 -->
            <div v-else class="flex flex-col gap-3">
              <div
                v-for="order in myOrders.slice(0, 3)"
                :key="order.id"
                class="flex justify-between items-center p-3 bg-slate-50 rounded-xl"
              >
                <div>
                  <p class="font-bold text-sm">訂單 {{ order.orderNumber }}</p>
                  <p class="text-xs text-slate-400 mt-1">{{ order.date }}</p>
                </div>
                <div class="text-right">
                  <p class="font-bold text-sm text-navy">$ {{ order.totalPrice }}</p>
                  <span class="text-xs bg-green-50 text-green-600 px-2 py-0.5 rounded-full"
                    >已完成</span
                  >
                </div>
              </div>

              <div v-if="myOrders.length > 3" class="text-center mt-2">
                <n-button
                  class="cursor-pointer hover:scale-[1.01] transition-all"
                  size="small"
                  type="primary"
                  @click="router.push({ name: 'MyStore' })"
                  >查看全部訂單
                </n-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </SideMenu>
</template>

<style scoped></style>
