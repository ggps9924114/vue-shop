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
      isActive: true,
    })

    // // 假資料(電商)
    // const products = ref([
    //   {
    //     id: 1,
    //     title: '質感木紋藍牙喇叭',
    //     price: 1280,
    //     category: '電子產品',
    //     imageUrl:
    //       'https://plus.unsplash.com/premium_photo-1677159499898-b061fb5bd2d7?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    //     description: '極致音質，續航力長達 10 小時，質感木紋外殼設計',
    //     stock: 15,
    //     isActive: true,
    //   },
    //   {
    //     id: 2,
    //     title: '無線降噪耳機',
    //     price: 2490,
    //     category: '電子產品',
    //     imageUrl:
    //       'https://plus.unsplash.com/premium_photo-1679513691474-73102089c117?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8d2lyZWxlc3MlMjBoZWFkcGhvbmVzfGVufDB8fDB8fHww',
    //     description: '主動降噪技術，通話清晰，折疊設計方便攜帶',
    //     stock: 8,
    //     isActive: true,
    //   },
    //   {
    //     id: 3,
    //     title: '手工燕麥餅乾禮盒',
    //     price: 380,
    //     category: '食品',
    //     imageUrl:
    //       'https://images.unsplash.com/photo-1772651392135-b891a5e4f8a3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y29va2llcyUyMGdpZnQlMjBib3h8ZW58MHx8MHx8fDA%3D',
    //     description: '嚴選天然食材，無添加防腐劑，送禮自用兩相宜',
    //     stock: 30,
    //     isActive: true,
    //   },
    //   {
    //     id: 4,
    //     title: '冷壓初榨橄欖油',
    //     price: 520,
    //     category: '食品',
    //     imageUrl:
    //       'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8b2xpdmUlMjBvaWx8ZW58MHx8MHx8fDA%3D',
    //     description: '義大利進口，低溫冷壓萃取，保留完整營養',
    //     isActive: true,
    //     stock: 20,
    //     isActive: true,
    //   },
    //   {
    //     id: 5,
    //     title: '玻尿酸保濕精華液',
    //     price: 890,
    //     category: '保養品',
    //     imageUrl:
    //       'https://images.unsplash.com/photo-1710410815589-dd83514104d0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c2VydW0lMjBza2luY2FyZXxlbnwwfHwwfHx8MA%3D%3D',
    //     description: '多重玻尿酸複合配方，深層補水，敏感肌適用',
    //     stock: 25,
    //     isActive: true,
    //   },
    //   {
    //     id: 6,
    //     title: '植萃防曬隔離乳',
    //     price: 650,
    //     category: '保養品',
    //     imageUrl:
    //       'https://images.unsplash.com/photo-1657023828553-18c23601c4d7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c3Vuc2NyZWVufGVufDB8fDB8fHww',
    //     description: 'SPF50+ PA++++，輕薄不黏膩，含抗氧化植萃',
    //     stock: 18,
    //     isActive: true,
    //   },
    //   {
    //     id: 7,
    //     title: '極簡風帆布托特包',
    //     price: 780,
    //     category: '服飾',
    //     imageUrl:
    //       'https://plus.unsplash.com/premium_photo-1681324227573-953664cf9b32?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2FudmFzJTIwdG90ZSUyMGJhZ3xlbnwwfHwwfHx8MA%3D%3D',
    //     description: '厚磅帆布材質，大容量設計，多色可選',
    //     stock: 12,
    //     isActive: true,
    //   },
    //   {
    //     id: 8,
    //     title: '北歐風香氛蠟燭',
    //     price: 420,
    //     category: '生活用品',
    //     imageUrl:
    //       'https://images.unsplash.com/photo-1572726729207-a78d6feb18d7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHNjZW50ZWQlMjBjYW5kbGV8ZW58MHx8MHx8fDA%3D',
    //     description: '天然大豆蠟，精油香氣，燃燒時間長達 40 小時',
    //     stock: 35,
    //     isActive: true,
    //   },
    // ])

    // 假資料(寵物)
    const products = ref([
      {
        id: 1,
        title: '鮭魚凍乾零食',
        price: 280,
        category: '食品',
        imageUrl:
          'https://images.unsplash.com/photo-1702571076915-683c3c5bbc28?q=80&w=1024&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: '100% 純鮭魚製成，低溫凍乾保留營養，貓咪超愛的香氣',
        stock: 50,
        isActive: true,
      },
      {
        id: 2,
        title: '主食罐頭禮盒組',
        price: 520,
        category: '食品',
        imageUrl:
          'https://images.unsplash.com/photo-1597843786271-1027c561c6ff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: '精選六種口味，無穀物配方，適合挑嘴貓咪',
        stock: 30,
        isActive: true,
      },
      {
        id: 3,
        title: '電動逗貓棒',
        price: 680,
        category: '互動玩具',
        imageUrl:
          'https://plus.unsplash.com/premium_photo-1776720101165-cc8bfee4b46e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: '自動旋轉羽毛，360度隨機擺動，讓貓咪自己玩',
        stock: 25,
        isActive: true,
      },
      {
        id: 4,
        title: '貓薄荷玩具球',
        price: 150,
        category: '互動玩具',
        imageUrl:
          'https://images.unsplash.com/photo-1736331552081-e716cfe8cf25?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: '天然貓薄荷填充，多種造型隨機出貨，讓貓咪愛不釋手',
        stock: 80,
        isActive: true,
      },
      {
        id: 5,
        title: '貓咪化毛膏',
        price: 320,
        category: '保健品',
        imageUrl:
          'https://images.unsplash.com/photo-1640223321014-8659ca225cba?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: '幫助排出毛球，含有多種維生素，鮭魚口味貓咪愛吃',
        stock: 40,
        isActive: true,
      },
      {
        id: 6,
        title: '益生菌腸胃保健粉',
        price: 480,
        category: '保健品',
        imageUrl:
          'https://plus.unsplash.com/premium_photo-1726842346934-39f0c2c360cf?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: '專為貓咪設計，改善腸胃消化，增強免疫力',
        stock: 35,
        isActive: true,
      },
      {
        id: 7,
        title: '天然酵素沐浴乳',
        price: 390,
        category: '清潔美容',
        imageUrl:
          'https://images.unsplash.com/photo-1699158660282-a57e60ccced2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: '植物酵素配方，溫和不刺激，洗後毛髮柔順有光澤',
        stock: 45,
        isActive: true,
      },
      {
        id: 8,
        title: '貓咪專用梳子',
        price: 250,
        category: '清潔美容',
        imageUrl:
          'https://media.istockphoto.com/id/1495356032/photo/cat-and-dog-grooming-brush-and-nail-clippers-top-view.webp?a=1&b=1&s=612x612&w=0&k=20&c=T2eBuTdfXo2w1mTfrlIGoRuGlGR2cvv74t-lEIxrdqk=',
        description: '不鏽鋼細齒設計，有效去除浮毛，按摩皮膚促進血液循環',
        stock: 60,
        isActive: true,
      },
      {
        id: 9,
        title: '麻繩貓抓板',
        price: 420,
        category: '生活用品',
        imageUrl:
          'https://media.istockphoto.com/id/1038647378/photo/gray-shorthair-cat-playful.webp?a=1&b=1&s=612x612&w=0&k=20&c=87JRpBskcPTsHm_-KqTThiO78vBCl6K8P8jvjyv4q3c=',
        description: '天然麻繩纏繞，耐抓耐磨，保護你的沙發',
        stock: 20,
        isActive: true,
      },
      {
        id: 10,
        title: '四層貓跳台',
        price: 1980,
        category: '生活用品',
        imageUrl:
          'https://images.unsplash.com/photo-1718995398658-4469fd08cb04?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: '穩固底座設計，多層跳台滿足貓咪攀爬需求，附贈玩具球',
        stock: 10,
        isActive: true,
      },
      {
        id: 11,
        title: '貓咪外出背包',
        price: 1280,
        category: '外出用品',
        imageUrl:
          'https://images.unsplash.com/photo-1736470250074-c1660519d7f7?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: '透氣網面設計，太空艙造型，讓貓咪安心出門',
        stock: 15,
        isActive: true,
      },
      {
        id: 12,
        title: '皮革寵物項圈',
        price: 380,
        category: '外出用品',
        imageUrl:
          'https://plus.unsplash.com/premium_photo-1692392181661-96c4b34759db?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2F0JTIwbGVhdGhlciUyMGNvbGxhcnxlbnwwfHwwfHx8MA%3D%3D',
        description: '真皮材質，附反光條設計，夜間出行更安全',
        stock: 30,
        isActive: true,
        // Unsplash 搜尋：cat leather collar
      },
      {
        id: 13,
        title: '貓咪自動飲水機',
        price: 890,
        category: '生活用品',
        imageUrl: 'https://images.unsplash.com/photo-1571131116858-2295ade82a72?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2F0JTIwd2F0ZXIlMjBmb3VudGFpbnxlbnwwfHwwfHx8MA%3D%3D',
        description: '循環過濾系統，保持水質新鮮，鼓勵貓咪多喝水',
        stock: 20,
        isActive: true,
      },
      {
        id: 14,
        title: '除臭貓砂',
        price: 350,
        category: '生活用品',
        imageUrl: 'https://media.istockphoto.com/id/1770493959/photo/close-up-to-tofu-cat-litter-sand-in-the-sandbox.jpg?s=612x612&w=0&k=20&c=dJ110KyrqVaMMdundS2It0AbG2s6K2Xh9vTu7tOakRc=',
        description: '天然礦石配方，超強除臭，結塊迅速好清理',
        stock: 60,
        isActive: true,
      },
      {
        id: 15,
        title: '貓咪睡窩',
        price: 680,
        category: '生活用品',
        imageUrl: 'https://images.unsplash.com/photo-1541188495357-ad2dc89487f4?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2F0JTIwYmVkfGVufDB8fDB8fHww',
        description: '柔軟珊瑚絨材質，可拆洗設計，四季皆適用',
        stock: 25,
        isActive: true,
      },
      {
        id: 16,
        title: '反光寵物牽繩',
        price: 290,
        category: '外出用品',
        imageUrl: 'https://images.unsplash.com/photo-1708062270783-0e9fa7f4c1c1?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGV0JTIwbGVhc2glMjByZWZsZWN0aXZlfGVufDB8fDB8fHww',
        description: '夜間反光設計，彈力伸縮材質，附安全鎖扣',
        stock: 40,
        isActive: true,
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
        isActive: true,
      }
      showAddProduct.value = true
    }
    // // 商品類型選單(電商)
    // const categories = [
    //   { label: '電子產品', value: '電子產品' },
    //   { label: '食品', value: '食品' },
    //   { label: '保養品', value: '保養品' },
    //   { label: '服飾', value: '服飾' },
    //   { label: '生活用品', value: '生活用品' },
    //   { label: '運動', value: '運動' },
    // ]

    // // 商品類型選單(寵物)
    const categories = [
      { label: '食品', value: '食品' },
      { label: '互動玩具', value: '互動玩具' },
      { label: '保健品', value: '保健品' },
      { label: '清潔美容', value: '清潔美容' },
      { label: '生活用品', value: '生活用品' },
      { label: '外出用品', value: '外出用品' },
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
    // 切換上下架
    const toggleActive = (productId) => {
      const target = products.value.find((p) => p.id === productId)
      if (target) {
        target.isActive = !target.isActive
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
      toggleActive,
    }
  },
  { persist: true }, //這樣檔案就可以持久化保存,
)
