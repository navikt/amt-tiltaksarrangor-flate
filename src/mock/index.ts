import { setupWorker } from 'msw'

import { internalUrl } from '../utils/url-utils'
import { devProxyHandlers } from './handlers/dev-proxy-handlers'
import { mockHandlers } from './handlers/mock-handlers'
import { getDevProxyEnabled } from './utils/dev-proxy-env'

const handlers = getDevProxyEnabled()
	? devProxyHandlers
	: mockHandlers

setupWorker(...handlers)
	.start({ serviceWorker: { url: internalUrl('mockServiceWorker.js') } })
	.catch((e) => {
		// eslint-disable-next-line no-console
		console.error('Unable to setup mocked API endpoints', e)
	})
