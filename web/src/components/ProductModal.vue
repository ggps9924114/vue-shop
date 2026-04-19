<script setup>
import { ref } from 'vue'
import { useProductStore } from '@/store'
import {
  NCard,
  NButton,
  NModal,
  NInput,
  NForm,
  NFormItem,
  NInputNumber,
  NUpload,
  useMessage,
  NSelect,
} from 'naive-ui'

const productStore = useProductStore()
const message = useMessage()

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

// 圖片預覽
const handlePreview = () => {
  // 把存進 useProduct 的網址拿出來顯示
  previewImageUrl.value = productStore.newProduct.imageUrl
  showImagePreview.value = true
}

// 新增或編輯儲存
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
</script>

<template>
  <n-modal v-model:show="productStore.showAddProduct">
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
          />
        </n-form-item>
        <n-form-item label="類型：">
          <n-select
            v-model:value="productStore.newProduct.category"
            :options="productStore.categories"
            placeholder="請選擇商品類型"
          />
        </n-form-item>
        <n-form-item label="說明：">
          <n-input
            v-model:value="productStore.newProduct.description"
            type="text"
            placeholder="請描述商品"
          />
        </n-form-item>
        <n-form-item label="庫存：">
          <n-input-number
            v-model:value="productStore.newProduct.stock"
            type="number"
            placeholder="請輸入商品庫存"
            :min="0"
          />
        </n-form-item>

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

        <!-- 圖片預覽 Modal -->
        <n-modal v-model:show="showImagePreview" preset="card" style="width: 600px" title="">
          <img :src="previewImageUrl" style="width: 100%" />
        </n-modal>

        <!-- 按鈕 -->
        <div class="gap-6 flex justify-center items-center">
          <n-button type="primary" @click.prevent="handleProductAddAndSave">
            {{ productStore.isEdit ? '修改儲存' : '新增商品' }}
          </n-button>
          <n-button type="error" @click="productStore.cxlAddProduct">取消</n-button>
        </div>
      </n-form>
    </n-card>
  </n-modal>
</template>

<style scoped></style>
