<script setup>
import { ref } from 'vue'
import { useUserStore, useProductStore, useCartStore, useOrderStore } from '@/store'
import { useDialog, useMessage, NCard, NButton, NModal, NBadge } from 'naive-ui'
// import { Discount } from '@vicons/tabler'
import HomeBanner from './HomeBanner.vue'
import SideMenu from './SideMenu.vue'
import CartDrawer from './CartDrawer.vue'
import ProductModal from './ProductModal.vue'
const userStore = useUserStore()
const productStore = useProductStore()
const cartStore = useCartStore()
const orderStore = useOrderStore()

const dialog = useDialog()
const message = useMessage()
// 購物車開關
const showCart = ref(false)

// 加Dialog的刪除商品
const handleProductDel = (item) => {
  dialog.error({
    title: '確認刪除',
    content: `你確定要刪除「${item.title}」嗎？這操作無法復原。`,
    positiveText: '刪除',
    negativeText: '取消刪除',
    onPositiveClick: () => {
      productStore.delProduct(item.id)
      message.success('已成功刪除商品')
    },
  })
}

const handleAddToCart = (item) => {
  cartStore.addToCart(item)
  message.success(`已經將${item.title}放入購物車`)
}
// 商品詳情開關
const showProductDetail = ref(false)
// 存放點到商品的資訊
const saveSelectedProduct = ref(null)
// 點商品顯示資訊
const handleShowDetail = (item) => {
  // 將點到的商品存起來
  saveSelectedProduct.value = item
  modalQuantity.value = 1
  // 顯示商品詳情內容
  showProductDetail.value = true
}
// 詳情Modal的數量
const modalQuantity = ref(1)

// 詳情數量增加且不能超過庫存
const increaseQty = () => {
  if (modalQuantity.value < saveSelectedProduct.value.stock) {
    modalQuantity.value++
  }
}

// 詳情數量減少且不能低於1
const decreaseQty = () => {
  if (modalQuantity.value > 1) {
    modalQuantity.value--
  }
}
// 詳情使用加入購物車處理
const handleAddToCartWithQty = () => {
  for (let i = 0; i < modalQuantity.value; i++) {
    cartStore.addToCart(saveSelectedProduct.value)
  }
  message.success(
    `已將 ${modalQuantity.value} 件「${saveSelectedProduct.value.title}」加入購物車！`,
  )
  showProductDetail.value = false
}

// 確認送出訂單
const handleConfirmCheckout = () => {
  const itemCount = cartStore.cartList.length
  // 清空前先存訂單並傳入清單、總金額、目前登入帳號
  orderStore.addOrder(cartStore.cartList, cartStore.totalPrice, userStore.account)
  cartStore.clearCart()
  cartStore.closeCheckoutModal()
  message.success(`本次購物共購買了 ${itemCount} 樣商品`)
}
</script>

<template>
  <!-- 購物車畫面 -->
  <CartDrawer v-model:show="showCart"></CartDrawer>
  <ProductModal />
  <!-- 確認訂單 Modal -->
  <n-modal v-model:show="cartStore.showCheckoutModal">
    <n-card
      style="width: 90vw; max-width: 560px"
      :bordered="false"
      role="dialog"
      aria-modal="true"
      class="rounded-2xl overflow-hidden"
    >
      <div class="flex flex-col gap-4">
        <!-- 標題 -->
        <h2 class="text-xl font-bold text-slate-800">確認訂單</h2>

        <!-- 購物車的商品清單 -->
        <div class="flex flex-col gap-2 max-h-60 overflow-y-auto">
          <div
            v-for="item in cartStore.cartList"
            :key="item.id"
            class="flex justify-between items-center p-3 bg-slate-50 rounded-xl"
          >
            <div class="flex items-center gap-3">
              <img :src="item.imageUrl" class="w-12 h-12 object-cover rounded-lg flex-shrink-0" />
              <div>
                <p class="font-bold text-sm truncate max-w-[200px]">{{ item.title }}</p>
                <p class="text-xs text-slate-400">x {{ item.quantity }}</p>
              </div>
            </div>
            <p class="font-bold text-sm text-navy">$ {{ item.price * item.quantity }}</p>
          </div>
        </div>

        <!-- 分隔線 -->
        <hr class="border-slate-100" />

        <!-- 總金額 -->
        <div class="flex justify-between items-center">
          <span class="text-slate-500">總金額</span>
          <span class="text-2xl font-bold text-navy">$ {{ cartStore.totalPrice }}</span>
        </div>

        <!-- 按鈕 -->
        <div class="flex gap-3">
          <n-button type="primary" class="flex-1" @click="handleConfirmCheckout"
            >確認送出訂單</n-button
          >
          <n-button @click="cartStore.closeCheckoutModal">取消</n-button>
        </div>
      </div>
    </n-card>
  </n-modal>
  <SideMenu>
    <!-- 頂端橫幅 -->
    <div class="min-h-screen bg-slate-200">
      <!-- nav跟div意思一樣 , 但nav讓無障礙可以讀出 -->
      <nav class="bg-white shadow-sm mb-8">
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
            <n-badge :value="cartStore.totalQuantity" max="99">
              <n-button type="primary" size="medium" @click="showCart = true">購物車</n-button>
            </n-badge>
          </div>
        </div>
      </nav>

      <main class="container mx-auto px-6 pb-12">
        <!-- 輪播圖 -->
        <section class="mb-10">
          <HomeBanner />
        </section>

        <section v-if="productStore.products.filter((p) => p.isActive).length === 0" class="w-full">
          <div class="flex">
            <h3 class="text-2xl text-slate-500 mx-auto">目前尚未有商品，請稍後再重新查看</h3>
          </div>
        </section>
        <!-- 顯示在網頁上的商品卡片 -->
        <div
          v-else
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 p-4"
        >
          <div
            v-for="item in productStore.products.filter((p) => p.isActive)"
            :key="item.id"
            class="group"
          >
            <n-card
              content-style="padding: 0;"
              class="overflow-hidden border-0 shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer"
              @click="handleShowDetail(item)"
            >
              <div class="h-48 bg-slate-200 overflow-hidden">
                <img
                  :src="item.imageUrl"
                  class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div class="p-4">
                <h3 class="font-bold text-lg truncate mb-1">{{ item.title }}</h3>
                <div class="flex justify-between items-center mb-2">
                  <span class="text-xl font-bold text-navy">$ {{ item.price }}</span>
                  <span class="text-xs text-slate-400">庫存: {{ item.stock }}</span>
                </div>
                <div class="flex mb-2">
                  <span class="text-xs text-slate-500 truncate">{{ item.description }}</span>
                </div>
                <div class="grid grid-cols-2 gap-2">
                  <n-button
                    v-if="userStore.isAdmin"
                    size="small"
                    type="primary"
                    ghost
                    @click.stop="productStore.editProduct(item)"
                    >編輯</n-button
                  >
                  <n-button
                    v-if="userStore.isAdmin"
                    size="small"
                    type="error"
                    ghost
                    @click.stop="handleProductDel(item)"
                    >刪除</n-button
                  >
                  <n-button
                    size="small"
                    type="primary"
                    class="col-span-2"
                    @click.stop="handleAddToCart(item)"
                    >加入購物車</n-button
                  >
                </div>
              </div>
            </n-card>
          </div>
        </div>
      </main>
    </div>
    <!-- 點擊後的商品詳情內容 -->
    <n-modal v-model:show="showProductDetail">
      <n-card
        style="width: 90vw; max-width: 680px; max-width: 1000px"
        :bordered="false"
        role="dialog"
        aria-modal="true"
        class="rounded-2xl shadow-xl overflow-hidden"
        content-style="padding: 0;"
      >
        <div v-if="saveSelectedProduct" class="flex">
          <!-- 左商品圖片 -->
          <div class="w-2/5 min-h-[400px] flex-shrink-0 overflow-hidden">
            <img :src="saveSelectedProduct.imageUrl" class="w-full h-full object-cover" />
          </div>

          <!-- 右商品資訊 -->
          <div class="flex-1 p-6 flex flex-col gap-4">
            <div class="flex items-center gap-3 flex-wrap">
              <h2 class="text-2xl font-bold text-slate-800">{{ saveSelectedProduct.title }}</h2>
              <span class="text-xs bg-slate-100 text-slate-500 px-3 py-1 rounded-full">
                {{ saveSelectedProduct.category }}
              </span>
            </div>
            <p class="text-3xl font-bold text-navy">$ {{ saveSelectedProduct.price }}</p>
            <p class="text-slate-500 text-sm leading-relaxed">
              {{ saveSelectedProduct.description }}
            </p>
            <hr class="border-slate-100" />

            <!-- 服務保障區塊 -->
            <div class="flex flex-col-3 gap-2 py-2">
              <div
                class="flex w-1/3 justify-center items-center gap-3 p-2 bg-slate-50 border-navy/40 border-[1px] rounded-xl"
              >
                <span class="text-xl flex-shrink-0">🚚</span>
                <div>
                  <p class="text-xs font-bold text-slate-700">免費配送</p>
                  <p class="text-xs text-slate-400">滿 $500 免運</p>
                </div>
              </div>
              <div
                class="flex w-1/3 justify-center items-center gap-3 p-2 bg-slate-50 border-navy/40 border-[1px] rounded-xl"
              >
                <span class="text-xl flex-shrink-0">↩️</span>
                <div>
                  <p class="text-xs font-bold text-slate-700">7天退換</p>
                  <p class="text-xs text-slate-400">不滿意免費退</p>
                </div>
              </div>

              <div
                class="flex w-1/3 justify-center items-center gap-3 p-2 bg-slate-50 border-navy/40 border-[1px] rounded-xl"
              >
                <span class="text-xl flex-shrink-0">🔒</span>
                <div>
                  <p class="text-xs font-bold text-slate-700">安全付款</p>
                  <p class="text-xs text-slate-400">多種付款方式</p>
                </div>
              </div>
            </div>
            <p class="text-sm">
              庫存：
              <span :class="saveSelectedProduct.stock > 0 ? 'text-green-500' : 'text-red-500'">
                {{ saveSelectedProduct.stock > 0 ? `${saveSelectedProduct.stock} 件` : '已售完' }}
              </span>
            </p>

            <!-- 數量選擇器 -->
            <div class="flex items-center gap-4">
              <span class="text-sm text-slate-500">數量</span>
              <div class="flex items-center gap-3">
                <!-- - 按鈕：數量等於 1 時變灰色無法點擊 -->
                <n-button size="small" :disabled="modalQuantity <= 1" @click="decreaseQty"
                  >-</n-button
                >

                <span class="w-8 text-center font-bold">{{ modalQuantity }}</span>

                <!-- + 按鈕：數量等於庫存時變灰色無法點擊 -->
                <n-button
                  size="small"
                  :disabled="modalQuantity >= saveSelectedProduct.stock"
                  @click="increaseQty"
                  >+</n-button
                >
              </div>
            </div>

            <hr class="border-slate-100" />

            <!-- 底部按鈕 -->
            <div class="flex gap-3 mt-auto">
              <n-button
                type="primary"
                class="flex-1"
                :disabled="saveSelectedProduct.stock === 0"
                @click="handleAddToCartWithQty"
              >
                {{ saveSelectedProduct.stock > 0 ? '加入購物車' : '已售完' }}
              </n-button>
              <n-button @click="showProductDetail = false">關閉</n-button>
            </div>
          </div>
        </div>
      </n-card>
    </n-modal>
  </SideMenu>
</template>
<style scoped>
/* * {
  border: solid 0.5px black !important;
} */
.n-card {
  max-width: 320px;
}
</style>
