import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
const publicBasePath = process.env.VITE_PUBLIC_BASE_PATH || './'

export default defineConfig({
  base: publicBasePath,
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost',
        changeOrigin: true,
        rewrite: (path) => `/web/HapHap${path}`,
      },
    },
  },
})
