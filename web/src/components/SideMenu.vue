<script setup>
import {
  PersonOutline as PersonIcon,
  StorefrontOutline as Store,
  HomeOutline as Home,
} from '@vicons/ionicons5'
import { NIcon, NMenu, NLayoutContent, NLayout, NLayoutSider } from 'naive-ui'
import { h, ref, computed } from 'vue'
import { Edit } from '@vicons/tabler'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

// 以目前路由的名稱到對應選單的Key
const activeKey = computed(() => {
  const routeToKeyMap = {
    Home: 'home',
    UserProfile: 'editpersonalInfo',
    MyStore: 'MyStore',
  }
  return routeToKeyMap[route.name] || null
})

const handleMenuSelect = (key) => {
  // 對照表:用來對應每個key的router name
  const routeMap = {
    home: { name: 'Home' },
    editPersonalInfo: { name: 'UserProfile' },
    MyStore: { name: 'MyStore' },
  }
  // 用點到的key去抓是否存在，如果存在就去找並跳轉
  if (routeMap[key]) {
    router.push(routeMap[key])
  }
}

// NMenu一定要寫接收的渲染函數
function renderIcon(icon) {
  // 返回一個函數，選單在需要畫圖示時執行
  return () =>
    // h = Hyperscript(NIcon, ...) 是建一個 Naive UI icon的容器
    h(NIcon, null, {
      // 在容器的預設插槽 (default) 裡放傳進去的 icon 組件
      default: () => h(icon),
    })
}
// 選單資訊(對應routeMap)
const menuOptions = [
  { label: '首頁', key: 'home', icon: renderIcon(Home) },
  {
    label: '會員資料',
    key: 'userProfile',
    icon: renderIcon(PersonIcon),
    // 下拉選單(名字不可改)
    children: [{ label: '訂單資訊', key: 'editPersonalInfo', icon: renderIcon(Edit) }],
  },
  {
    label: '我的賣場',
    key: 'MyStore',
    icon: renderIcon(Store),
  },
]

const inverted = ref(false)

// 判斷是否為手機尺寸
const isMobile = ref(window.innerWidth < 768)
window.addEventListener('resize', () => {
  isMobile.value = window.innerWidth < 768
})
// 手機預設收合，電腦預設展開
const collapsed = ref(isMobile.value)
</script>
<template>
  <div class="h-screen flex flex-col">
    <n-layout has-sider class="flex-1">
      <n-layout-sider
        bordered
        collapse-mode="width"
        :collapsed-width="64"
        :width="240"
        show-trigger
        :inverted="inverted"
        v-model:collapsed="collapsed"
      >
        <div class="flex items-center gap-3 px-4 py-4 border-b border-slate-100">
          <img src="/src/assets/logo.png" class="w-10 h-10 object-cover flex-shrink-0" />
          <!-- 文字區塊：側邊欄 -->
          <div class="overflow-hidden">
            <p class="font-bold text-lg tracking-[22px] text-[#7e6031] whitespace-nowrap">
              塊點下單
            </p>
            <p class="text-xs text-slate-[#7e6031] opacity-60 whitespace-nowrap">
              HERRY SHOPPING NOW
            </p>
          </div>
        </div>
        <n-menu
          :inverted="inverted"
          :options="menuOptions"
          :value="activeKey"
          @update:value="handleMenuSelect"
        />
      </n-layout-sider>

      <n-layout-content content-style="padding: 24px;" :native-scrollbar="false" scrollable>
        <slot></slot>
      </n-layout-content>
    </n-layout>
  </div>
</template>

<style scoped></style>
