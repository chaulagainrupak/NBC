import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['nbc.chaulagainrupak.com.np' ,'raspberrypi.clouded-char.ts.net', 'localhost', '0.0.0.0']
  }
})
