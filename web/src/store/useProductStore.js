import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useProductStore = defineStore(
  'product',
  () => {
    // 用於v-model雙向綁定資料來新增商品
    const newProduct = ref({
      title: '',
      price: 0,
      category: null,
      imageUrl: '',
      description: '',
      stock: 0,
    })

    // 假資料
    const products = ref([
      {
        id: 1,
        title: '質感木紋藍牙喇叭',
        price: 1280,
        category: '電子產品',
        imageUrl:
          'https://plus.unsplash.com/premium_photo-1677159499898-b061fb5bd2d7?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: '極致音質，續航力長達 10 小時，質感木紋外殼設計',
        stock: 15,
      },
      {
        id: 2,
        title: '無線降噪耳機',
        price: 2490,
        category: '電子產品',
        imageUrl:
          'https://plus.unsplash.com/premium_photo-1679513691474-73102089c117?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8d2lyZWxlc3MlMjBoZWFkcGhvbmVzfGVufDB8fDB8fHww',
        description: '主動降噪技術，通話清晰，折疊設計方便攜帶',
        stock: 8,
      },
      {
        id: 3,
        title: '手工燕麥餅乾禮盒',
        price: 380,
        category: '食品',
        imageUrl:
          'https://images.unsplash.com/photo-1772651392135-b891a5e4f8a3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y29va2llcyUyMGdpZnQlMjBib3h8ZW58MHx8MHx8fDA%3D',
        description: '嚴選天然食材，無添加防腐劑，送禮自用兩相宜',
        stock: 30,
      },
      {
        id: 4,
        title: '冷壓初榨橄欖油',
        price: 520,
        category: '食品',
        imageUrl:
          'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8b2xpdmUlMjBvaWx8ZW58MHx8MHx8fDA%3D',
        description: '義大利進口，低溫冷壓萃取，保留完整營養',
        stock: 20,
      },
      {
        id: 5,
        title: '玻尿酸保濕精華液',
        price: 890,
        category: '保養品',
        imageUrl:
          'https://images.unsplash.com/photo-1710410815589-dd83514104d0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c2VydW0lMjBza2luY2FyZXxlbnwwfHwwfHx8MA%3D%3D',
        description: '多重玻尿酸複合配方，深層補水，敏感肌適用',
        stock: 25,
      },
      {
        id: 6,
        title: '植萃防曬隔離乳',
        price: 650,
        category: '保養品',
        imageUrl:
          'https://images.unsplash.com/photo-1657023828553-18c23601c4d7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c3Vuc2NyZWVufGVufDB8fDB8fHww',
        description: 'SPF50+ PA++++，輕薄不黏膩，含抗氧化植萃',
        stock: 18,
      },
      {
        id: 7,
        title: '極簡風帆布托特包',
        price: 780,
        category: '服飾',
        imageUrl:
          'https://plus.unsplash.com/premium_photo-1681324227573-953664cf9b32?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2FudmFzJTIwdG90ZSUyMGJhZ3xlbnwwfHwwfHx8MA%3D%3D',
        description: '厚磅帆布材質，大容量設計，多色可選',
        stock: 12,
      },
      {
        id: 8,
        title: '北歐風香氛蠟燭',
        price: 420,
        category: '生活用品',
        imageUrl:
          'https://images.unsplash.com/photo-1572726729207-a78d6feb18d7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHNjZW50ZWQlMjBjYW5kbGV8ZW58MHx8MHx8fDA%3D',
        description: '天然大豆蠟，精油香氣，燃燒時間長達 40 小時',
        stock: 35,
      },
    ])
    // 新增商品彈出開關
    const showAddProduct = ref(false)

    // 新增商品點取消
    const cxlAddProduct = () => {
      showAddProduct.value = false
    }
    // 新增商品
    const addProduct = () => {
      const item = {
        id: Date.now(),
        title: newProduct.value.title, //取假資料的標題
        price: newProduct.value.price,
        category: newProduct.value.category,
        imageUrl: newProduct.value.imageUrl,
        description: newProduct.value.description,
        stock: newProduct.value.stock,
      }

      products.value.push(item)
      newProduct.value = {
        title: '',
        price: 0,
        category: null,
        imageUrl: '',
        description: '',
        stock: 0,
      }
      showAddProduct.value = false
    }

    // 刪除商品
    const delProduct = (id) => {
      // 跳出詢問是否刪除
      products.value = products.value.filter((item) => item.id !== id)
    }
    // 編輯商品
    const isEdit = ref(false)
    const editProduct = (item) => {
      isEdit.value = true
      newProduct.value = { ...item } // 把原本的舊資料叫出來
      showAddProduct.value = true // 商品的畫面
    }

    // 編輯商品修改後儲存
    // 存檔按鈕觸發 (在 Home.vue 的 handleConfirm 中呼叫)
    const saveProduct = () => {
      if (isEdit.value) {
        // 找到那筆資料並更新
        const index = products.value.findIndex((p) => p.id === newProduct.value.id)
        if (index !== -1) {
          products.value[index] = { ...newProduct.value }
        }
      } else {
        // 走原本的 addProduct 邏輯
        addProduct()
      }
      showAddProduct.value = false
    }

    const openAddModal = () => {
      isEdit.value = false
      newProduct.value = {
        title: '',
        price: 0,
        category: null,
        imageUrl: '',
        description: '',
        stock: 0,
      }
      showAddProduct.value = true
    }
    // 商品類型選單
    const categories = [
      { label: '電子產品', value: '電子產品' },
      { label: '食品', value: '食品' },
      { label: '保養品', value: '保養品' },
      { label: '服飾', value: '服飾' },
      { label: '生活用品', value: '生活用品' },
      { label: '運動', value: '運動' },
    ]

    // 當物品加入購物車時會扣庫存
    const decreaseStock = (productId, quantity = 1) => {
      const target = products.value.find((p) => p.id === productId)
      if (target && target.stock >= quantity) {
        target.stock -= quantity
      }
    }
    // 當物品從購物車移除時會扣庫存
    const increaseStock = (productId, quantity = 1) => {
      const target = products.value.find((p) => p.id === productId)
      if (target) {
        target.stock += quantity
      }
    }

    return {
      newProduct,
      products,
      showAddProduct,
      isEdit,
      saveProduct,
      addProduct,
      delProduct,
      cxlAddProduct,
      editProduct,
      openAddModal,
      decreaseStock,
      increaseStock,
      categories,
    }
  },
  { persist: true }, //這樣檔案就可以持久化保存,
)
