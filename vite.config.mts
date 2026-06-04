import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig(async ({ mode }: { mode: string }) => {
  const isOffline = mode === 'offline'

  return {
    build: {
      target: 'esnext',
      outDir: 'build'
    },
    server: {
      port: 3001,
      open: !isOffline,
      proxy: isOffline
        ? {
            '/deltakeroversikt/amt-tiltaksarrangor-bff': {
              // Sender request via sim-nav, som legger på autentiseringstoken mm.
              target: 'http://localhost:9100',
              changeOrigin: true,
              headers: {
                'x-local-app-source': 'tiltaksarrangor-flate'
              },
              rewrite: (path: string) => path.replace(/^\/deltakeroversikt/, '')
            }
          }
        : undefined
    },
    base: '/deltakeroversikt/',
    plugins: [react()]
  }
})
