<script setup>
import login from './components/login.vue'
import home from './components/home.vue'
import { useUserStore } from './store/useUserStore'
import { NConfigProvider, NMessageProvider, NDialogProvider } from 'naive-ui'
const userStore = useUserStore()
const themeColor = {
  common: {
    // 主色調：海軍藍
    primaryColor: '#001f3f',
    // 滑鼠移上去的顏色（稍微淺一點點點）
    primaryColorHover: '#003366',
    // 按下去後的顏色（稍微深一點點點）
    primaryColorPressed: '#001122',
    // 補充：如果你想要文字選取時的顏色也是海军藍
    primaryColorSuppl: '#003366',
  },
}
</script>

<template>
  <n-config-provider :theme-overrides="themeColor">
    <n-dialog-provider>
      <n-message-provider>
        <login v-if="!userStore.isLogin"></login>
        <home v-else></home>

      </n-message-provider>
    </n-dialog-provider>
  </n-config-provider>
</template>

<style scoped></style>
