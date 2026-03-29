/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}', // 這行最重要，告訴它掃描 src 下所有的 Vue 檔
  ],
  theme: {
    extend: {
      // 全域文字設定(優先順序)
      fontFamily: {
        sans: ['"Microsoft JhengHei"', 'PingFang TC', 'sans-serif'],
      },
      colors: {
        navy: {
          DEFAULT: '#0d1b2a', // bg-navy
          light: '#1b2e45', // bg-navy-light（hover 用）
          dark: '#060d14', // bg-navy-dark（pressed 用）
        },
        cream: '#f8f9fa', // bg-cream（淺色背景）
      },
    },
  },
  plugins: [],
}
