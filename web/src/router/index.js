import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/store'

// 匯入頁面的原件，用軟加載，User 進到該頁面時才會加載
const Login = () => import('@/components/Login.vue')
const Home = () => import('@/components/Home.vue')

// 定義路由：網址對應到哪個元件
const routes = [
  {
    path: '/login',
    name: 'Login',
    Component: Login,
  },
  {
    path: '/',
    name: 'Home',
    Component: Home,
    // mate 是路由附加資訊，需登入才能用
    meta: { requiresAuth: true },
  },
]

const router = createRouter({
  // history 決定網址的呈現方式
  history: createWebHistory(),
  // 把上面定義的路由表傳進來
  routes,
})


  // to   > 要進的路由
  // from > 從哪個路由來
  // next > 函數，決定要去哪裡
router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  // 該頁面需要登入若沒有登入，就強制跳轉登入頁面
  if (to.meta.requiresAuth && !userStore.isLogin) {
    next({ name: 'Login' })
    // 已經登入者如果要去登入葉面則直接跳轉首頁
  } else if (to.name === 'Login' && userStore.isLogin) {
    next({ name: 'Home' })
  } else {
    // 以上都不符合就直接進入
    next()
  }
})

export default router
