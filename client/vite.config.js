import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000', 
        changeOrigin: true,  // Ensure the origin of the host header is changed to the target URL
        secure: false,       // If the API server uses self-signed SSL certificates, set this to false
      },
    },
  },
});

