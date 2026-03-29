<script setup>
import { useCartStore } from '@/store'
import { NDrawer, NDrawerContent, NEmpty, NButton, useMessage, useDialog } from 'naive-ui'
// defineProps 和 defineEmits 在 script setup 裡不需要 import，直接用
const message = useMessage()
const dialog = useDialog()
const cartStore = useCartStore()

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits(['update:modelValue'])

const handleCheckout = () => {
  if (cartStore.cartList.length === 0) return
  message.success('購物車訂單已送出')
  cartStore.clearCart()
  emit('update:modelValue', false)
}

// 刪除確認按鈕
const headleRemoveFromCart = (item) => {
  dialog.warning({
    title: '確認刪除',
    content: `確認要將${item.title}從購物車刪除嗎?`,
    positiveText: '確認刪除',
    negativeText: '再想想',
    onPositiveClick: () => {
      cartStore.removeFromCart(item.id)
      message.success(`已將${item.title}成功從購物車刪除`)
    },
  })
}
</script>

<template>
  <!-- :show 要加冒號才是綁定變數 -->
  <!-- placement 是純字串，不需要冒號 -->
  <n-drawer
    :show="modelValue"
    :width="400"
    placement="right"
    @update:show="emit('update:modelValue', $event)"
  >
    <n-drawer-content title=" 購物車" closable>
      <!-- 購物車是空的 → 顯示提示 -->
      <n-empty
        v-if="cartStore.cartList.length === 0"
        description="目前購物車沒有商品，請去挑選幾樣商品吧~"
        class="mt-20"
      />

      <!-- 購物車有商品 → 顯示清單 -->
      <div v-else class="flex flex-col gap-4">
        <div
          v-for="item in cartStore.cartList"
          :key="item.id"
          class="flex items-center gap-3 p-3 bg-slate-50 rounded-xl"
        >
          <!-- :src 要加冒號才會讀變數的值 -->
          <img :src="item.imageUrl" class="w-16 h-16 object-cover rounded-lg flex-shrink-0" />

          <div class="flex-1 min-w-0">
            <p class="font-bold truncate">{{ item.title }}</p>
            <p class="text-slate-400 text-sm">$ {{ item.price }}</p>

            <div class="flex items-center gap-2 mt-2">
              <!-- - 按鈕在左邊，數量減少 -->
              <n-button size="tiny" @click="cartStore.updateQuantity(item.id, item.quantity - 1)"
                >-</n-button
              >

              <span class="w-6 text-center text-sm">{{ item.quantity }}</span>

              <!-- + 按鈕在右邊，數量增加 -->
              <n-button size="tiny" @click="cartStore.updateQuantity(item.id, item.quantity + 1)"
                >+</n-button
              >
            </div>
          </div>

          <div class="flex flex-col items-end gap-2 flex-shrink-0">
            <p class="font-bold text-sm">$ {{ item.price * item.quantity }}</p>
            <n-button size="tiny" type="error" ghost @click="headleRemoveFromCart(item)"
              >刪除</n-button
            >
          </div>
        </div>
      </div>

      <!-- #footer 要在 n-drawer-content 裡面 -->
      <template #footer>
        <div class="flex justify-between items-center w-full">
          <span class="text-lg font-bold">總金額：$ {{ cartStore.totalPrice }}</span>
          <n-button
            type="primary"
            :disabled="cartStore.cartList.length === 0"
            @click="handleCheckout"
            >進行結帳</n-button
          >
        </div>
      </template>
    </n-drawer-content>
  </n-drawer>
</template>

<style scoped></style>
