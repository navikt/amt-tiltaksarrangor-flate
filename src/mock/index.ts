import { setupWorker } from 'msw'

import { devProxyHandlers } from './handlers/dev-proxy-handlers'
import { mockHandlers } from './handlers/mock-handlers'
import { getDevProxyEnabled } from './utils/dev-proxy-env'

const handlers = getDevProxyEnabled()
	? devProxyHandlers
	: mockHandlers

setupWorker(...handlers)
	.start({ serviceWorker: { url: process.env.PUBLIC_URL + '/mockServiceWorker.js' } })
	.catch((e) => {
		// eslint-disable-next-line no-console
		console.error('Unable to setup mocked API endpoints', e)
	})
