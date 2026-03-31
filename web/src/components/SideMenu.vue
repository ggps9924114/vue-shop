<script setup>
import {
  //   BookOutline as BookIcon,
  PersonOutline as PersonIcon,
  //   WineOutline as WineIcon,
  //   UserCircle as UserIcon,
  StorefrontOutline as Store,
  HomeOutline as Home,
} from '@vicons/ionicons5'
import { NIcon, NMenu, NLayoutContent, NSpace, NSwitch, NLayout, NLayoutSider } from 'naive-ui'
import { h, ref } from 'vue'
import { Edit } from '@vicons/tabler'
import { useRouter } from 'vue-router'

const router = useRouter()
const handleMenuSelect = (key) => {
  // 對照表:用來對應每個key的router name
  const routeMap = {
    home: { name: 'Home' },
    editPersonalInfo: { name: 'UserProfile' },
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
// 選單資訊
const menuOptions = [
  { label: '首頁', key: 'home', icon: renderIcon(Home) },
  {
    label: '會員資料',
    key: 'userProfile',
    icon: renderIcon(PersonIcon),
    // 下拉選單(名字不可改)
    children: [{ label: '修改個人資訊', key: 'editPersonalInfo', icon: renderIcon(Edit) }],
  },
  {
    label: '我的賣場',
    key: 'myStore',
    icon: renderIcon(Store),
  },
]

const inverted = ref(false)
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
      >
        <n-menu :inverted="inverted" :options="menuOptions" @update:value="handleMenuSelect" />
      </n-layout-sider>

      <n-layout-content content-style="padding: 24px;" :native-scrollbar="false" scrollable>
        <slot></slot>
      </n-layout-content>
    </n-layout>
  </div>
</template>

<style scoped></style>
