import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/_variables.scss" as *;`
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@shared': fileURLToPath(new URL('./src/shared-types', import.meta.url))
    }
  },
  server: {
    proxy: {
      // 1. Запросы на http://localhost:5173/api-local/... 
      // уйдут на http://localhost:3000/...
      '/api-local': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api-local/, '')
      }
    }
  }
})
