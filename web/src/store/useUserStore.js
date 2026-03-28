import { defineStore } from 'pinia'
import { ref } from 'vue'

// 用於登入與首頁的切換

export const useUserStore = defineStore('user', () => {
  // 判斷是否登入，若登入成功切換到電商網站
  const isLogin = ref(true)

  const account = ref('')

  // 登出返回登入頁面
  const logOut = () => {
    alert('您已登出')
    isLogin.value = false
    account.value = ''
  }
  // 登入成功
  const setLoginSuccess = (name) => {
    isLogin.value = true
    account.value = name
  }
  return {
    isLogin,
    account,
    logOut,
    setLoginSuccess,
  }
})
