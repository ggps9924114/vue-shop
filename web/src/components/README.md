# 🐾 塊點下單 — 寵物選品電商

> 使用 Vue3 + Pinia + Naive UI + Tailwind CSS 製作的寵物電商作品集

🔗 **線上預覽**：[https://ggps9924114.github.io/vue-shop/](https://ggps9924114.github.io/vue-shop/)

---

## 📌 專案說明

這是一個以領養的貓咪「兩塊」為靈感打造的寵物選品電商網站「塊點下單」，為**純前端作品**，不依賴後端伺服器，所有資料透過 **localStorage** 實現本地持久化儲存。

包含商品瀏覽、搜尋篩選、分頁、購物車、結帳流程、訂單記錄、會員系統等完整功能，並區分管理員與一般用戶兩種身份，展示 Vue3 Composition API 與 Pinia 狀態管理的實際應用。
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
- 預設測試帳號自動建立

### 商品管理（管理員）
- 新增、編輯、刪除商品
- 商品類別下拉選單統一管理
- 圖片上傳（Base64）
- 商品上下架功能
- 庫存管理（加入購物車自動扣除）

### 首頁
- 輪播 Banner
- 商品搜尋（即時篩選）
- 類別篩選按鈕
- 商品分頁（每頁 8 筆）
- 商品詳情 Modal（含庫存即時預覽）

### 購物車
- 加入購物車自動扣除庫存
- 修改數量、刪除商品（含確認 Dialog）
- 數量上限不超過剩餘庫存
- 空狀態插圖

### 結帳流程
- 確認訂單 Modal（顯示商品清單 + 總金額）
- 結帳後自動清空購物車並記錄訂單

### 我的賣場
- 管理員：商品管理列表 + 統計數字（商品總數、已下架、已售完、總庫存價值）
- 一般用戶：歷史訂單記錄（含空狀態插圖）

### 個人資料
- 頭像（帳號首字母）
- 身份標籤（管理員 / 一般用戶）
- 數據統計（累計訂單、累計消費、購物車商品數）
- 快捷操作按鈕
- 最近 3 筆訂單記錄

### 其他
- SideMenu 高亮目前所在頁面
- 404 頁面
- 品牌 Logo（塊點下單 × 兩塊）

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
├── assets/          # 圖片、SVG 插圖、Logo
├── components/      # 元件
│   ├── Login.vue        # 登入 / 註冊頁面
│   ├── Home.vue         # 首頁（商品列表）
│   ├── HomeBanner.vue   # 輪播圖
│   ├── SideMenu.vue     # 側邊選單（含 Logo）
│   ├── CartDrawer.vue   # 購物車抽屜
│   ├── ProductModal.vue # 新增 / 編輯商品 Modal
│   ├── MyStore.vue      # 我的賣場
│   ├── UserProfile.vue  # 個人資料
│   └── NotFound.vue     # 404 頁面
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

## 🐱 關於品牌

「塊點下單」的靈感來自家中的貓咪「兩塊」，取「塊」字與「快點下單」諧音，希望每位毛孩家長都能快速找到適合的好物。

---

## 📝 未來可擴充方向

- 串接 Firebase 實現跨裝置資料同步
- 相關商品推薦
- 會員修改密碼功能
- 後台訂單管理
- RWD 手機版優化
- 深色模式支援