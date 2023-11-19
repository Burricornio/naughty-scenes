import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'

export default defineConfig({
  plugins: [vue(), vueI18nPlugin({})],
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
        @import "./src/styles/main.scss";
      `
      }
    }
  }
})
