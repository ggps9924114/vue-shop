import router from '@/router'
import { defineStore } from 'pinia'
import { ref } from 'vue'
// 用於登入與首頁的切換

export const useUserStore = defineStore(
  'user',
  () => {
    // 判斷是否登入，若登入成功切換到電商網站
    const isLogin = ref(false)
    // 是否是管理員
    const isAdmin = ref(false)
    const account = ref('')

    // 預設帳號密碼
    const initDefaultUsers = () => {
      // 先看本地有沒有帳號
      const existingUsers = localStorage.getItem('registeredUser')
      if (!existingUsers) {
        // 如果沒資料就建預設資料
        const defaultUsers = [
          { acc: 'admin', pwd: 'admin' },
          { acc: 'user', pwd: 'user' },
        ]
        localStorage.setItem('registeredUser', JSON.stringify(defaultUsers))
      }
    }
    initDefaultUsers()

    // 登出返回登入頁面
    const logOut = () => {
      alert('您已登出')
      isLogin.value = false
      account.value = ''
      router.push({ name: 'Login' })
      // 管理員權限
      isAdmin.value = false
    }
    // 登入成功
    const setLoginSuccess = (name) => {
      isLogin.value = true
      account.value = name
      isAdmin.value = name === 'admin'
    }

    // 修改密碼
    const changePassword = (oldPwd, newPwd) => {
      // 從 localStorage 拿到所有帳號資料
      const userList = JSON.parse(localStorage.getItem('registeredUser')) || []
      // 找目前登入帳號
      const targerUser = userList.find((u) => u.acc === account.value)
      // 比對原本密碼如果錯誤直接回傳
      if (!targerUser || targerUser.pwd !== oldPwd) {
        return { success: false, message: '舊密碼輸入錯誤' }
      }
      targerUser.pwd = newPwd
      // 改完密碼存回 localStorage
      localStorage.setItem('registeredUser', JSON.stringify(userList))

      return { success: true, message: '密碼修改成功' }
    }

    return {
      isAdmin,
      isLogin,
      account,
      logOut,
      setLoginSuccess,
      changePassword,
    }
  },
  { persist: true }, //這樣檔案就可以持久化保存,
)
