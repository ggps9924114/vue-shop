<script setup>
import { useUserStore, useOrderStore, useProductStore } from '@/store'
import { useDialog, useMessage, NButton } from 'naive-ui'
import SideMenu from './SideMenu.vue'
import ProductModal from './ProductModal.vue'
import { computed } from 'vue'

const userStore = useUserStore()
const orderStore = useOrderStore()
const productStore = useProductStore()

const message = useMessage()
const dialog = useDialog()
// 商品總數
const totalProducts = computed(() => productStore.products.length)
// 售完的商品數量
const soldOutProducts = computed(() => productStore.products.filter((p) => p.stock === 0).length)
// 總價值：用 reduce 把每個商品的（價格 × 庫存）加總
const totalStockValue = computed(() =>
  productStore.products.reduce((sum, p) => sum + p.price * p.stock, 0),
)
// 依照權限看有哪一些訂單
const myOrders = computed(() => orderStore.getOrdersByAccount(userStore.account))

// 管理員刪除商品
const handleProductDel = (item) => {
  dialog.error({
    title: '刪除商品',
    content: `您確定要刪除「${item.title}嗎?刪除後無法恢復唷！」`,
    positiveText: '確定刪除',
    negativeText: '取消',
    onPositiveClick: () => {
      productStore.delProduct(item.id)
      message.success('已成功刪除商品')
    },
  })
}
</script>
<template>
  <SideMenu>
    <ProductModal></ProductModal>
    <div class="container mb-2 px-4 mx-auto h-16 flex justify-between items-center">
      <p>登入成功，歡迎{{ userStore.account }}</p>
      <div class="flex gap-2 items-center">
        <n-button type="error" @click="userStore.logOut">登出</n-button>
        <n-button
          v-if="userStore.isAdmin"
          type="primary"
          size="medium"
          @click.prevent="productStore.openAddModal"
          >新增商品</n-button
        >
      </div>
    </div>
    <div class="min-h-screen bg-slate-200">
      <div class="container mx-auto p-6">
        <!-- 商品數據  只有管理員看得到 -->
        <div v-if="userStore.isAdmin">
          <h2 class="text-2xl font-bold mb-6">我的賣場</h2>
          <div class="grid grid-cols-3 gap-4">
            <div class="bg-white text-center p-5 rounded-md shadow-sm">
              <p class="text-2xl font-bold text-navy">{{ totalProducts }}</p>
              <p class="text-sm mt-2">商品總數</p>
            </div>
            <div class="bg-white text-center p-5 rounded-md shadow-sm">
              <p class="text-2xl font-bold text-red-500">{{ soldOutProducts }}</p>
              <p class="text-sm text-slate-500 mt-2">已售完</p>
            </div>
            <div class="bg-white text-center p-5 rounded-md shadow-sm">
              <p class="text-3xl font-bold text-green-600">$ {{ totalStockValue }}</p>
              <p class="text-sm mt-2">庫存總價值</p>
            </div>
          </div>
          <!-- 商品管理列表標題 -->
          <div class="bg-white mt-6 rounded-md shadow-sm">
            <div class="p-4 border-b border-slate-100">
              <h3 class="text-3xl font-bold text-navy">商品管理列表</h3>
            </div>
            <!-- 沒有商品時 -->
            <div
              v-if="productStore.products.length === 0"
              class="text-2xl p-8 text-navy-light text-center"
            >
              哎呀！目前似乎沒有商品了呢！
            </div>
            <!-- 商品列表 -->
            <div
              v-for="item in productStore.products"
              :key="item.id"
              class="flex items-center gap-4 p-4 border-b border-slate-50 hover:bg-slate-50 transition-colors"
            >
              <img :src="item.imageUrl" class="w-12 h-12 object-cover rounded-lg flex-shrink-0" />

              <div class="flex-1 min-w-0">
                <p class="font-bold truncate">{{ item.title }}</p>
                <p class="text-xs text-slate-400">{{ item.category }} ‧ 庫存 {{ item.stock }} 件</p>
              </div>

              <p class="font-bold text-navy flex-shrink-0">$ {{ item.price }}</p>

              <span
                class="text-xs px-2 py-1 rounded-full flex-shrink-0"
                :class="
                  item.stock > 0 ? 'bg-green-50 text-green-600' : 'bg-slate-100 text-slate-400'
                "
              >
                {{ item.stock > 0 ? '上架中' : '已售完' }}
              </span>

              <div class="flex gap-2 flex-shrink-0">
                <n-button size="small" type="primary" ghost @click="productStore.editProduct(item)">
                  編輯
                </n-button>
                <n-button size="small" type="error" ghost @click="handleProductDel(item)">
                  刪除
                </n-button>
              </div>
            </div>
          </div>
        </div>

        <!-- 用戶列表 -->
        <div v-else>
          <h2 class="text-2xl font-bold text-slate-800 mb-6">我的訂單</h2>

          <!-- 沒有訂單時 -->
          <div v-if="myOrders.length === 0" class="bg-white rounded-2xl shadow-sm p-12 text-center">
            <p class="text-slate-400">目前還沒有訂單記錄</p>
            <p class="text-sm text-slate-300 mt-1">去首頁挑選喜歡的商品吧！</p>
          </div>

          <!-- 訂單列表 -->
          <div v-else class="flex flex-col gap-4">
            <div
              v-for="order in myOrders"
              :key="order.id"
              class="bg-white rounded-2xl shadow-sm overflow-hidden"
            >
              <div class="flex justify-between items-center p-4 border-b border-slate-100">
                <div>
                  <p class="font-bold text-slate-800">訂單 {{ order.orderNumber }}</p>
                  <p class="text-xs text-slate-400 mt-1">{{ order.date }}</p>
                </div>
                <span class="text-xs bg-green-50 text-green-600 px-3 py-1 rounded-full">
                  已完成
                </span>
              </div>

              <div class="p-4 flex flex-col gap-3">
                <div v-for="item in order.items" :key="item.id" class="flex items-center gap-3">
                  <img
                    :src="item.imageUrl"
                    class="w-12 h-12 object-cover rounded-lg flex-shrink-0"
                  />
                  <div class="flex-1 min-w-0">
                    <p class="font-bold text-sm truncate">{{ item.title }}</p>
                    <p class="text-xs text-slate-400">x {{ item.quantity }}</p>
                  </div>
                  <p class="font-bold text-sm text-navy flex-shrink-0">
                    $ {{ item.price * item.quantity }}
                  </p>
                </div>
              </div>

              <div
                class="flex justify-between items-center p-4 border-t border-slate-100 bg-slate-50"
              >
                <span class="text-sm text-slate-400">共 {{ order.items.length }} 樣商品</span>
                <span class="font-bold text-navy">總計 $ {{ order.totalPrice }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </SideMenu>
</template>
<style scoped></style>
