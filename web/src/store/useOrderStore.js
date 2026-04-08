import { zhTW } from 'naive-ui'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useOrderStore = defineStore(
  'order',
  () => {
    // 每筆訂單都是一個物件
    const orders = ref([])

    //   新增訂單
    const addOrder = (cartList, totalPrice, account) => {
      const newOrder = {
        // 以當下時間做訂單id，避免重複
        id: Date.now(),
        // 訂單編號格式#001,#002...
        orderNumber: `#${String(orders.value.length + 1).padStart(3, '0')}`,
        // 訂單的現在建立時間並格式化成台灣時間
        date: new Date().toLocaleString('zh-TW'),
        // 用展開運算子複製，避免之後購物車清空影響到訂單紀錄
        items: cartList.map((item) => ({ ...item })),
        // 總金額(等於 totalPrice: totalPrice（當 key 和 value 同名可以簡寫）)

        totalPrice,
        //   誰下的單(等於 account: account)
        account,
      }
      // 把這筆新訂單推進訂單陣列
      orders.value.push(newOrder)
    }
    // 取得指定帳號的訂單（一般用戶只看自己的
    const getOrdersByAccount = computed(() => {
      return (account) => orders.value.filter((order) => order.account === account)
    })
    return {
      orders,
      addOrder,
      getOrdersByAccount,
    }
  },
  { persist: true },
)
