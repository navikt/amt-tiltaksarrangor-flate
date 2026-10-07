import react from '@vitejs/plugin-react'
import { configDefaults, defineConfig } from 'vitest/config'

// https://vitejs.dev/config/
export default defineConfig(async ({ mode }: { mode: string }) => {
  const isOffline = mode === 'offline'

  return {
    test: {
      include: ['src/**/*.{test,spec}.{ts,tsx}'],
      exclude: [...configDefaults.exclude, 'tests/**']
    },
    build: {
      target: 'esnext',
      outDir: 'build'
    },
    server: {
      port: 3001,
      open:
        !isOffline && !process.env.CI && process.env.OPEN_BROWSER !== 'false',
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
