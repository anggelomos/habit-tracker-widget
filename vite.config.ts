import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',  // expose to LAN
    port: 5173,
    strictPort: true,
    hmr: {
      host: '192.168.1.7', // your PC’s LAN IP
      port: 24678          // default Vite HMR
    }
  },
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
})
