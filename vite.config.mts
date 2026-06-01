import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		target: 'esnext',
		outDir: 'build'
	},
	server: {
		port: 3001,
		open: true,
		proxy: {
			'/deltakeroversikt/amt-tiltaksarrangor-bff': {
				target: 'http://localhost:8088',
				changeOrigin: true,
				rewrite: (path: string) => path.replace(/^\/deltakeroversikt\/amt-tiltaksarrangor-bff/, ''),
			}
		}
	},
	base: process.env.BASE || '/deltakeroversikt/',
	plugins: [ react() ],
})
