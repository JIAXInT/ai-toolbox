import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  // GitHub Pages 部署配置
  // 如果部署到 https://<USERNAME>.github.io/<REPO>/
  // 请将 base 设置为 '/<REPO>/'
  // 如果部署到自定义域名或根路径，请设置为 '/'
  base: process.env.NODE_ENV === 'production' ? '/ai-agent/' : '/',
})
