import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useProductStore = defineStore(
  'product',
  () => {
    // 用於v-model雙向綁定資料來新增商品
    const newProduct = ref({
      title: '',
      price: 0,
      category: '',
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
          'data:image/webp;base64,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',
        description: '極致音質，續航力長達 10 小時...',
        stock: 5,
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
        category: '',
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
        category: '',
        imageUrl: '',
        description: '',
        stock: 0,
      }
      showAddProduct.value = true
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
    }
  },
  { persist: true }, //這樣檔案就可以持久化保存,
)
