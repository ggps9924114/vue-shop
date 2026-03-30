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
      // class用的自定義顏色
      colors: {
        navy: {
          DEFAULT: '#2d3a5e', // bg-navy
          light: '#3a4a78', // bg-navy-light
          dark: '#1e2740', // bg-navy-dark
        },
        cream: '#f8f9fa', // bg-cream（淺色背景）
      },
    },
  },
  plugins: [],
}
