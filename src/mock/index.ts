import { setupWorker } from 'msw'
import { RequestHandler } from 'msw/lib/types/handlers/RequestHandler'

import env from '../utils/environment'
import { appUrl } from '../utils/url-utils'
import { devProxyHandlers } from './handlers/dev-proxy-handlers'
import { localAppHandlers } from './handlers/local-app-handlers'
import { mockHandlers } from './handlers/mock-handlers'
import { pullRequestHandlers } from './handlers/pull-request-handlers'
import { getRequestHandler, RequestHandlerType } from './utils/mock-env'

const resolveHandlers = (
  requestHandlerType: RequestHandlerType
): RequestHandler[] => {
  switch (requestHandlerType) {
    case RequestHandlerType.MOCK:
      return mockHandlers
    case RequestHandlerType.DEV:
      return devProxyHandlers
    case RequestHandlerType.LOCAL:
      return localAppHandlers
    case RequestHandlerType.PULL_REQUEST:
      return pullRequestHandlers
    default:
      throw Error('Unknown handler: ' + requestHandlerType)
  }
}

/* eslint-disable no-console */

/*
 Pga måten service workers fungerer så må vi legge til trailing slash når vi er på rot-urlen for at msw.js sin service worker
 skal få lov til å intercepte requests.
*/
const path = window.location.pathname
if (path === env.baseUrl && !path.endsWith('/')) {
  console.log('Redirected with trailing slash')
  window.location.href = `${window.location.origin}${path}/`
}

const requestHandler = getRequestHandler()

console.info(`Running with request handler: ${requestHandler}`)

await setupWorker(...resolveHandlers(requestHandler))
  .start({
    serviceWorker: { url: appUrl('mockServiceWorker.js') },
    onUnhandledRequest: ({ method, url }) => {
      if (url.pathname.startsWith('/deltakeroversikt')) {
        console.warn(`Unhandled ${method} request to ${url}`)
      }
    }
  })
  .catch((e) => console.error('Unable to setup mocked API endpoints', e))
