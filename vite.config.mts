import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

async function resolveLocalDevJwt(): Promise<string | undefined> {
  const tokenEndpoint = 'http://localhost:9000/tokenx/token'
  const clientId = 'amt-tiltaksarrangor-flate'
  const clientSecret = 'frontend-secret'
  const audience = 'amt-tiltaksarrangor-bff'

  const formBody = new URLSearchParams({
    grant_type: 'client_credentials',
    client_id: clientId,
    client_secret: clientSecret,
    aud: audience
  })

  let response: Response
  try {
    response = await fetch(tokenEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: formBody
    })
  } catch (error) {
    console.warn(
      `[vite] Failed to fetch local JWT from ${tokenEndpoint}:`,
      error
    )
    console.warn('[vite] Continuing without Authorization header.')
    return undefined
  }

  if (!response.ok) {
    console.warn(`[vite] Token endpoint returned HTTP ${response.status}.`)
    console.warn('[vite] Continuing without Authorization header.')
    return undefined
  }

  const data = (await response.json()) as { access_token?: string }
  if (!data.access_token) {
    console.warn('[vite] Missing access_token in token response.')
    console.warn('[vite] Continuing without Authorization header.')
    return undefined
  }

  return data.access_token
}

// https://vitejs.dev/config/
export default defineConfig(async ({ mode }: { mode: string }) => {
  const isOffline = mode === 'offline'
  const localDevJwt = isOffline ? await resolveLocalDevJwt() : undefined

  return {
    build: {
      target: 'esnext',
      outDir: 'build'
    },
    server: {
      port: 3001,
      open: true,
      proxy: isOffline
        ? {
            '/deltakeroversikt/amt-tiltaksarrangor-bff': {
              target: 'http://localhost:8088',
              changeOrigin: true,
              rewrite: (path: string) =>
                path.replace(
                  /^\/deltakeroversikt\/amt-tiltaksarrangor-bff/,
                  ''
                ),
              headers: localDevJwt
                ? { Authorization: `Bearer ${localDevJwt}` }
                : undefined
            }
          }
        : undefined
    },
    base: '/deltakeroversikt/',
    plugins: [react()]
  }
})
