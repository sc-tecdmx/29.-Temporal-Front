import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  //base: 'https://jel.tecdmx.org.mx',
    base: '/account/login',
     server:{
        https:true,
        host: 'https://jel.tecdmx.org.mx',
     },
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
