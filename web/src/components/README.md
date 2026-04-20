# 🛍️ Vue Shop 電商網站

> 使用 Vue3 + Pinia + Naive UI + Tailwind CSS 製作的前端電商作品集

🔗 **線上預覽**：[https://ggps9924114.github.io/vue-shop/](https://ggps9924114.github.io/vue-shop/)

---

## 📌 專案說明

這是一個使用 Vue3 製作的小型電商網站，包含商品瀏覽、購物車、結帳流程、訂單記錄、會員系統等功能，並區分管理員與一般用戶兩種身份。

---

## 🛠️ 使用技術

- **Vue3** - Composition API / `<script setup>`
- **Pinia** - 全域狀態管理（含 pinia-plugin-persistedstate 持久化）
- **Vue Router** - 前端路由 + 路由守衛（未登入自動導向登入頁）
- **Naive UI** - UI 元件庫
- **Tailwind CSS** - 樣式排版
- **GitHub Actions** - 自動化部署到 GitHub Pages

---

## ✨ 功能介紹

### 會員系統
- 註冊 / 登入（帳號密碼存於 localStorage）
- 路由守衛：未登入無法進入首頁
- 管理員 / 一般用戶權限區分

### 商品管理（管理員）
- 新增、編輯、刪除商品
- 商品類別下拉選單統一管理
- 圖片上傳（Base64）

### 購物車
- 加入購物車自動扣除庫存
- 修改數量、刪除商品（含確認 Dialog）
- 顯示總金額

### 結帳流程
- 確認訂單 Modal（顯示商品清單 + 總金額）
- 結帳後自動清空購物車並記錄訂單

### 我的賣場
- 管理員：商品管理列表 + 統計數字（商品總數、已售完、總庫存價值）
- 一般用戶：歷史訂單記錄

### 個人資料
- 頭像（帳號首字母）
- 身份標籤（管理員 / 一般用戶）
- 數據統計（累計訂單、累計消費、購物車商品數）
- 快捷操作按鈕

---

## 🔐 測試帳號

| 身份 | 帳號 | 密碼 |
|---|---|---|
| 管理員 | admin | admin123 |
| 一般用戶 | user | user123 |

> 建議使用**無痕模式**開啟，確保預設帳號正常建立。

---

## 🚀 如何啟動專案

```bash
# 安裝套件
cd web
npm install

# 啟動開發伺服器
npm run dev

# 打包
npm run build
```

---

## 📁 專案結構

```
src/
├── assets/          # 圖片、SVG 插圖
├── components/      # 元件
│   ├── Login.vue        # 登入 / 註冊頁面
│   ├── Home.vue         # 首頁（商品列表）
│   ├── HomeBanner.vue   # 輪播圖
│   ├── SideMenu.vue     # 側邊選單
│   ├── CartDrawer.vue   # 購物車抽屜
│   ├── ProductModal.vue # 新增 / 編輯商品 Modal
│   ├── MyStore.vue      # 我的賣場
│   └── UserProfile.vue  # 個人資料
├── store/           # Pinia 狀態管理
│   ├── useUserStore.js
│   ├── useProductStore.js
│   ├── useCartStore.js
│   └── useOrderStore.js
├── router/          # Vue Router
│   └── index.js
└── App.vue
```

---

## 📝 未來預計新增功能
### 近期可優化
- 商品搜尋 / 篩選功能
- 商品分頁功能
- RWD 手機版優化
- 串接 Firebase 實現跨裝置資料同步
- 相關商品推薦
- 會員修改密碼功能
- 後台訂單管理
- 深色模式支援