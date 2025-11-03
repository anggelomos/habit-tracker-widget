import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const isDev = env.DEV_ENVIRONMENT === 'dev'
  
  return {
    server: isDev ? {
      host: '0.0.0.0',  // expose to LAN
      port: 5173,
      strictPort: true,
      hmr: {
        host: env.DEV_HOST_IP || 'localhost', // your PC's LAN IP from .env
        port: 24678          // default Vite HMR
      }
    } : {
      port: 5173,
    },
    plugins: [
      react({
        babel: {
          plugins: [['babel-plugin-react-compiler']],
        },
      }),
    ],
  }
})
