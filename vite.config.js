import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// GitHub Pages 網址為 https://margin-protocol.github.io/studio/ ，所以 base 設為 '/studio/'。
// 若之後改用自訂網域、或 repo 改名為 margin-protocol.github.io，請改成 '/'。
export default defineConfig({
  base: '/studio/',
  plugins: [react(), tailwindcss()],
})
