import { createRouter, createWebHashHistory } from 'vue-router'
import { useUserStore } from '@/store'

// 匯入頁面的原件，用懶加載，User 進到該頁面時才會加載
const Login = () => import('@/components/Login.vue')
const Home = () => import('@/components/Home.vue')
const UserProfile = () => import('@/components/UserProfile.vue')
const MyStore = () => import('@/components/MyStore.vue')
// 定義路由：網址對應到哪個元件
const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    // mate 是路由附加資訊，需登入才能用
    meta: { requiresAuth: true },
  },
  {
    path: '/profile',
    name: 'UserProfile',
    component: UserProfile,
    // mate 是路由附加資訊，需登入才能用
    meta: { requiresAuth: true },
  },
  {
    path: '/mystore',
    name: 'MyStore',
    component: MyStore,
    mate: { requitesAuth: true },
  },
]

const router = createRouter({
  history: createWebHashHistory(),
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
