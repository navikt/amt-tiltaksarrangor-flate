import { setupWorker } from 'msw'

import env from '../utils/environment'
import { appUrl } from '../utils/url-utils'
import { devProxyHandlers } from './handlers/dev-proxy-handlers'
import { mockHandlers } from './handlers/mock-handlers'
import { getDevProxyEnabled } from './utils/dev-proxy-env'

/*
 Pga måten service workers fungerer så må vi legge til trailing slash når vi er på rot-urlen for at msw.js sin service worker
 skal få lov til å intercepte requests.
*/
const path = window.location.pathname
if (path === env.publicUrl && !path.endsWith('/')) {
	// eslint-disable-next-line no-console
	console.log('Redirected with trailing slash')
	window.location.href = `${window.location.origin}${path}/`
}

const handlers = getDevProxyEnabled()
	? devProxyHandlers
	: mockHandlers

setupWorker(...handlers)
	.start({ serviceWorker: { url: appUrl('mockServiceWorker.js') } })
	.catch((e) => {
		// eslint-disable-next-line no-console
		console.error('Unable to setup mocked API endpoints', e)
	})
