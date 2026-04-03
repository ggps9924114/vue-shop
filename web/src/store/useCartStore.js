// store/useCart.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore(
  'cart',
  () => {
    // 購物車商品陣列，一筆一個商品物件(含 quantity 數量)
    const cartList = ref([])

    // 加入購物車
    const addToCart = (product) => {
      // 檢查購物車是否已經有這件商品(以 id 來比對)
      const targetItem = cartList.value.find((item) => item.id === product.id)

      if (targetItem) {
        // 如果有，數量 +1 ，不重複新增
        targetItem.quantity += 1
      } else {
        // 沒有這個商品 → 把商品資料展開（...product），並補上 quantity: 1 後加入陣列
        // 一開始一定會跑quantity:1，因為原本沒有這個值就會先跑
        cartList.value.push({
          ...product,
          quantity: 1,
        })
      }
    }

    // 計算總金額
    const totalPrice = computed(() => {
      return cartList.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
    })

    // 計算總數量（用來顯示在導覽列的小紅點）
    const totalQuantity = computed(() => {
      return cartList.value.reduce((sum, item) => sum + item.quantity, 0)
    })

    // 移除商品
    const removeFromCart = (productId) => {
      // filter 會建立新陣列，只保留 id 不相符的商品（等於把目標商品過濾掉）
      cartList.value = cartList.value.filter((item) => item.id !== productId)
    }

    // 更新商品數量
    const updateQuantity = (productId, newQuantity) => {
      // 如果新數量 <= 0，直接呼叫 removeFromCart 把商品移除，避免出現 0 或負數
      if (newQuantity <= 0) {
        removeFromCart(productId)
        return
      }
      // 用 find 找到目標商品（回傳的是原陣列的參考，改它就等於改 cartList 裡的資料）
      const target = cartList.value.find((item) => item.id === productId)
      if (target) {
        // 如果有照到就更新成新值
        target.quantity = newQuantity
      }
    }

    // 清空購物車，結帳成功後呼叫，把 cartList 重設為空陣列
    const clearCart = () => {
      cartList.value = []
    }

    // 購物車確認結帳開關
    const showCheckoutModal = ref(false)

    // 開啟確認結帳
    const openCheckoutModal = () => {
      showCheckoutModal.value = true
    }
    // 關閉結帳
    const closeCheckoutModal = () => {
      showCheckoutModal.value = false
    }

    return {
      cartList,
      addToCart,
      totalPrice,
      totalQuantity,
      removeFromCart,
      updateQuantity,
      clearCart,
      showCheckoutModal,
      openCheckoutModal,
      closeCheckoutModal,
    }
  },
  { persist: true },
)
