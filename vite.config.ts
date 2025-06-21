import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { radar } from 'vite-plugin-radar'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    radar({
      analytics: {
        id: 'G-643G3CEQCG'
      }
    })
  ],
})
