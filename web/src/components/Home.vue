<script setup>
import { ref } from 'vue'
import { useUserStore, useProductStore, useCartStore } from '@/store'
import {
  useDialog,
  useMessage,
  NCard,
  NButton,
  NModal,
  NInput,
  NForm,
  NFormItem,
  NInputNumber,
  NUpload,
  NBadge,
} from 'naive-ui'
// import { Discount } from '@vicons/tabler'
import HomeBanner from './HomeBanner.vue'
import SideMenu from './SideMenu.vue'
import CartDrawer from './CartDrawer.vue'

const userStore = useUserStore()
const productStore = useProductStore()
const cartStore = useCartStore()
const dialog = useDialog()
const message = useMessage()
// 購物車開關
const showCart = ref(false)
// 上傳成功的照片預覽開關
const showImagePreview = ref(false)
// 上傳成功的照片網址
const previewImageUrl = ref('')
// 上傳照片功能
const handleUploadChange = (data) => {
  if (!data.fileList || data.fileList.length === 0) {
    console.log('未選取任何檔案')
    return
  }

  const file = data.fileList[0]?.file
  if (!file) return

  const reader = new FileReader()
  reader.onload = (e) => {
    // 圖片文字
    const base64 = e.target.result
    productStore.newProduct.imageUrl = base64
    if (data.fileList && data.fileList[0]) {
      data.fileList[0].status = 'finished'
      data.fileList[0].url = base64
      console.log('讀取完成，Base64 字串已產生')
    }
  }
  reader.readAsDataURL(file)
}

const handlePreview = () => {
  // 把存進 useProduct 的網址拿出來顯示
  previewImageUrl.value = productStore.newProduct.imageUrl
  showImagePreview.value = true
}
//

const handleProductAddAndSave = () => {
  if (!productStore.newProduct.title) {
    message.error('請輸入商品名稱')
    return
  }

  productStore.saveProduct()

  if (productStore.isEdit) {
    message.success('更新商品成功')
  } else {
    message.success('新增商品成功')
  }
}

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
  console.log()

  message.success(`已經將${item.title}放入購物車`)
}
</script>

<template>
  <!-- 購物車畫面 -->
  <CartDrawer v-model:show="showCart"></CartDrawer>
  <SideMenu>
    <!-- 頂端橫幅 -->
    <div class="min-h-screen bg-slate-200">
      <!-- nav跟div意思一樣 , 但nav讓無障礙可以讀出 -->
      <nav class="bg-white shadow-sm mb-8">
        <div class="container mb-2 px-4 mx-auto h-16 flex justify-between items-center">
          <p>登入成功，歡迎{{ userStore.account }}</p>
          <div class="flex gap-2 items-center">
            <n-button type="error" @click="userStore.logOut">登出</n-button>
            <n-button type="primary" size="medium" @click.prevent="productStore.openAddModal"
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
        <n-modal v-model:show="productStore.showAddProduct">
          <!-- 新增商品彈出視窗 -->
          <n-card
            style="width: 600px"
            :bordered="false"
            size="huge"
            role="dialog"
            aria-modal="true"
            class="border-2 border-solid rounded-xl shadow-md"
          >
            <div class="text-2xl m-4 mt-0 text-center">
              {{ productStore.isEdit ? '編輯商品' : '新增商品' }}
            </div>

            <n-form label-placement="left">
              <n-form-item label="名稱：">
                <n-input
                  v-model:value="productStore.newProduct.title"
                  type="text"
                  placeholder="請輸入商品名稱"
                />
              </n-form-item>
              <n-form-item label="價格：">
                <n-input-number
                  v-model:value="productStore.newProduct.price"
                  placeholder="請輸入價格"
                  :min="0"
              /></n-form-item>
              <n-form-item label="類型：">
                <n-input
                  v-model:value="productStore.newProduct.category"
                  placeholder="請輸入商品類型"
                  type="text"
              /></n-form-item>
              <n-form-item label="說明：">
                <n-input
                  v-model:value="productStore.newProduct.description"
                  type="text"
                  placeholder="請描述商品"
              /></n-form-item>
              <n-form-item label="庫存：">
                <n-input
                  v-model:value="productStore.newProduct.stock"
                  type="number"
                  placeholder="請輸入商品庫存"
              /></n-form-item>
              <!-- 上傳圖片 -->
              <n-form-item label="封面：" label-placement="left">
                <n-upload
                  action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f"
                  list-type="image-card"
                  :default-upload="false"
                  @change="handleUploadChange"
                  @preview="handlePreview"
                >
                  新增圖片
                </n-upload>
              </n-form-item>
              <n-modal v-model:show="showImagePreview" preset="card" style="width: 600px" title="">
                <img :src="previewImageUrl" style="width: 100%" />
              </n-modal>

              <div class="gap-6 flex justify-center items-center">
                <n-button type="primary" @click.prevent="handleProductAddAndSave">{{
                  productStore.isEdit ? '修改儲存' : '新增商品'
                }}</n-button>

                <n-button type="error" @click="productStore.cxlAddProduct">取消</n-button>
              </div>
            </n-form>
          </n-card>
        </n-modal>
        <section v-if="productStore.products.length === 0" class="w-full">
          <div class="flex">
            <h3 class="text-2xl text-slate-500 mx-auto">目前尚未有商品，請稍後再重新查看</h3>
          </div>
        </section>
        <!-- 顯示在網頁上的商品卡片 -->
        <div
          v-else
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 p-4"
        >
          <div v-for="item in productStore.products" :key="item.id" class="group">
            <n-card
              content-style="padding: 0;"
              class="overflow-hidden border-0 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div class="h-48 bg-slate-200 overflow-hidden">
                <img
                  :src="item.imageUrl"
                  class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div class="p-4">
                <h3 class="font-bold text-lg truncate mb-1">{{ item.title }}</h3>
                <div class="flex justify-between items-center mb-4">
                  <span class="text-xl font-bold text-navy">$ {{ item.price }}</span>
                  <span class="text-xs text-slate-400">庫存: {{ item.stock }}</span>
                </div>

                <div class="grid grid-cols-2 gap-2">
                  <n-button
                    size="small"
                    type="primary"
                    ghost
                    @click="productStore.editProduct(item)"
                    >編輯</n-button
                  >
                  <n-button size="small" type="error" ghost @click="handleProductDel(item)"
                    >刪除</n-button
                  >
                  <n-button
                    size="small"
                    type="primary"
                    class="col-span-2"
                    @click="handleAddToCart(item)"
                    >加入購物車</n-button
                  >
                </div>
              </div>
            </n-card>
          </div>
        </div>
      </main>
    </div>
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
