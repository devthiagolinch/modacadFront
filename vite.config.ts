import { resolve } from 'path';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      $fonts: resolve('./src/assets/fonts')
    }
  },
  build: {
    chunkSizeWarningLimit: 2000
  }
})
