<script setup>
import { ref } from 'vue'
const account = ref()
const password = ref()

// 登入功能
const login = () => {
  const savedUser = JSON.parse(localStorage.getItem('registeredUser')) || []
  console.log(savedUser)
  if (account.value === savedUser.acc && password.value === savedUser.pwd) {
    alert('登入成功')
  } else {
    alert('請先完成註冊後再登入')
  }
}
// 儲存註冊時寫的資料
// 呼叫註冊事件
const handleSignup = () => {
  const savedUser = [
    {
      acc: account.value,
      pwd: password.value,
    },
  ]
  localStorage.setItem('registeredUser', JSON.stringify(savedUser))
}
</script>

<template>
  <form action="" class="loginForm" @submit.prevent="login">
    <label for="">帳號：</label>
    <input type="text" name="" id="account" v-model="account" placeholder="請輸入帳號" /><br />
    <label for="">密碼：</label>
    <input type="text" name="" id="password" v-model="password" placeholder="請輸入密碼" /><br />
    <button type="submit">登入</button>
    <button @click="handleSignup">註冊</button>
  </form>
</template>
<style scoped></style>
