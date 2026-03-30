<script setup>
import { NConfigProvider, NMessageProvider, NDialogProvider } from 'naive-ui'
// Naive UI 元件用的自定義顏色
const themeColor = {
  common: {
    primaryColor: '#2d3a5e', // 自定義 Primary 按鈕預設
    primaryColorHover: '#3a4a78', // 滑過
    primaryColorPressed: '#1e2740', // 點下
    primaryColorSuppl: '#3a4a78', // 淺色背景
  },
}
</script>

<template>
  <n-config-provider :theme-overrides="themeColor">
    <n-dialog-provider>
      <n-message-provider>
        <router-view />
      </n-message-provider>
    </n-dialog-provider>
  </n-config-provider>
</template>

<style scoped></style>
