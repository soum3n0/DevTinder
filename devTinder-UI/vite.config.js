import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://devtinder-backend-5xo0.onrender.com', // backend server
        changeOrigin: true,
        // secure: false,
      },
    },
  },
})
