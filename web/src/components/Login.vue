<script setup>
import { ref, computed } from 'vue'
import { useUserStore } from '@/store/useUserStore'
import { NButton, NForm, NFormItem, NInput, useMessage } from 'naive-ui'
import { useRouter } from 'vue-router'
import { sign_in, sign_up } from '@/assets'

const router = useRouter()
const message = useMessage()

// user的狀態管理
const userStore = useUserStore()

// 登入表單管理
const formData = ref({
  // 登入帳號
  account: '',
  // 登入密碼
  password: '',
})
// 註冊
const isRegistered = ref(false)
// 切換註冊或登入模式
const toggleMode = () => {
  isRegistered.value = !isRegistered.value
  formData.value = { account: '', password: '' }
}
// 登入功能
const login = () => {
  // 先拿到本地資料目前儲存的資料
  const userList = localStorage.getItem('registeredUser')
  // 如果本地資料是空的，就提醒要先註冊
  if (!userList) {
    message.error('找不到註冊資料，請先註冊！')
    return
  }
  // 有這筆資料就進行解析
  const savedUser = JSON.parse(userList)
  // 開始比對本地資料是否有這組帳號
  const foundUser = savedUser.find(
    (savedUser) =>
      formData.value.account === savedUser.acc && formData.value.password === savedUser.pwd,
  )

  if (foundUser) {
    message.success('登入成功！')
    userStore.setLoginSuccess(formData.value.account)
    router.push({ name: 'Home' })
  } else {
    message.error('帳號或密碼錯誤')
  }
}
// 切換登入或註冊畫面
const toggleRegistered = () => {
  isRegistered.value = true
  formData.value = { account: '', password: '' }
}
// 註冊功能：儲存本地註冊的使用者資料
const handleSignup = () => {
  if (!formData.value.account || !formData.value.password) {
    message.error('請先輸入帳密後再註冊')
    return
  }
  // 1. 先從本地資料確認是否有這組帳號，如果沒有就給空陣列[]
  const userList = JSON.parse(localStorage.getItem('registeredUser')) || []
  // 2. 判斷帳號是否被重複註冊，如果已經註冊則結束不再跑push
  const isAccountUsed = userList.some((savedUser) => savedUser.acc === formData.value.account)
  if (isAccountUsed) {
    message.warning('帳號已有人註冊囉，換一個吧~')
    return
  }
  // 3. 註冊帳號跟密碼的資料
  const signupData = { acc: formData.value.account, pwd: formData.value.password }
  // 4. 如果沒有找到帳號就新增這組帳密進去
  userList.push(signupData)
  // 5. 將註冊資料存進本地
  localStorage.setItem('registeredUser', JSON.stringify(userList))
  message.success('註冊成功')
  formData.value.account = ''
  formData.value.password = ''
  isRegistered.value = false
}

// 驗證規則
const rule = {
  required: true,
  message: '此欄位為必填',
  trigger: 'blur',
}

// 登入頁面左側區塊
const leftPanel = computed(() => {
  if (!isRegistered.value) {
    return {
      title: '準備好就登入開始購物吧！',
      img: sign_in,
      heading: '找商品?',
      desc: '就從這裡出發探索最好的商品吧！',
    }
  } else {
    return {
      title: '先成為會員吧！',
      img: sign_up,
      heading: '沒帳號?',
      desc: '在沒有會員前一切都免談！',
    }
  }
})
</script>
<template>
  <!-- 登入外框背景 -->
  <div class="min-h-screen bg-slate-100 flex justify-center items-center">
    <!-- 置中大區塊 -->
    <div
  class="flex w-full lg:w-[60vw] lg:h-[70vh] min-w-[800px] min-h-[580px] bg-white rounded-2xl shadow-xl overflow-hidden"
>
      <!-- 左邊區塊 -->
      <div class="hidden lg:flex lg:w-1/2 flex-col p-12 justify-between bg-navy text-white">
        <Transition
          enter-active-class="transition duration-400 ease-out"
          enter-from-class="opacity-0 transform -translate-x-4"
          enter-to-class="opacity-100 transform translate-x-0"
          leave-active-class="transition duration-300 ease-in"
          leave-from-class="opacity-100 transform translate-x-0"
          leave-to-class="opacity-0 transform -translate-x-4"
          mode="out-in"
        >
          <div :key="isRegistered" class="flex flex-col justify-between h-full">
            <h1 class="text-2xl font-bold tracking-wider">{{ leftPanel.title }}</h1>
            <img :src="leftPanel.img" class="w-full min-w-52 min-h-52 object-contain mx-auto" />
            <div class="">
              <p class="text-2xl font-bold tracking-[0.25em] leading-[1.5]">
                {{ leftPanel.heading }}
              </p>
              <p class="mt-2 text-white/60 text-sm tracking-[0.3em]">{{ leftPanel.desc }}</p>
            </div>
          </div>
        </Transition>
      </div>
      <!-- 右邊區塊 -->
      <div class="flex flex-col justify-center w-full lg:w-1/2 p-10 bg-white">
        <div class="w-full max-w-[380px] mx-auto">
          <!-- 表單動畫過渡 -->
          <Transition
            enter-active-class="transition duration-300 ease-out"
            enter-from-class="opacity-0 transform translate-y-2"
            enter-to-class="opacity-100 transform translate-y-0"
            leave-active-class="transition duration-300 ease-in"
            leave-from-class="opacity-100 transform duration-100 translate-x-4"
            leave-to-class="opacity-0 transform duration-200 translate-x-10"
            mode="out-in"
          >
            <!-- 登入畫面 -->
            <n-form :model="formData" v-if="!isRegistered" @submit.prevent="login">
              <div class="mb-8">
                <h2 class="text-3xl font-bold text-slate-800">登入</h2>
                <p class="mt-2 text-slate-400">請輸入帳號密碼，還沒有帳號請先進行註冊</p>
              </div>
              <n-form-item label="帳號：" path="account" :rule="rule">
                <n-input v-model:value="formData.account" placeholder="請輸入帳號" />
              </n-form-item>
              <n-form-item label="密碼：" path="password" :rule="rule">
                <n-input
                  type="password"
                  show-password-on="mousedown"
                  v-model:value="formData.password"
                  placeholder="請輸入密碼"
                />
              </n-form-item>
              <div class="flex flex-col gap-3">
                <n-button type="primary" attr-type="submit">登入</n-button>
                <n-button ghost block @click="toggleRegistered"
                  >沒有帳號嗎?進行<span class="underline text-blue-500">註冊</span></n-button
                >
              </div>
            </n-form>

            <!-- 註冊畫面 -->
            <n-form :model="formData" v-else @submit.prevent="handleSignup">
              <div class="mb-8">
                <h2 class="text-3xl font-bold text-slate-800">註冊</h2>
                <p class="mt-2 text-slate-400">如果你已經有帳號，請返回直接登入吧！</p>
              </div>
              <n-form-item label="帳號：" path="account" :rule="rule">
                <n-input v-model:value="formData.account" placeholder="請輸入帳號" />
              </n-form-item>
              <n-form-item label="密碼：" path="password" :rule="rule">
                <n-input
                  type="password"
                  show-password-on="mousedown"
                  v-model:value="formData.password"
                  placeholder="請輸入密碼"
                />
              </n-form-item>
              <div class="flex flex-col gap-3">
                <n-button type="primary" @click="handleSignup">確認註冊</n-button>
                <n-button ghost block @click="toggleMode">已有帳號?返回登入</n-button>
              </div>
            </n-form>
          </Transition>
        </div>
      </div>
    </div>
  </div>
  <!-- 登入畫面 -->
</template>

<style scoped></style>
