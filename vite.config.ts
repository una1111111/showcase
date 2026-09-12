import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: './' —— 全部构建产物使用相对路径，
// 可直接部署到国内任意静态托管的根目录或子目录（云闪流 / OSS / Vercel 均可）。
export default defineConfig({
  plugins: [react()],
  base: './',
})
