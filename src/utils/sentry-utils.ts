import * as Sentry from '@sentry/react'
import { Integrations } from '@sentry/tracing'

import env from './environment'

export const initSentry = (): void => {
	Sentry.init({
		dsn: 'https://25638817aa76462089796015a4d3b6eb@sentry.gc.nav.no/102',
		integrations: [ new Integrations.BrowserTracing() ],
		environment: env.name,
		tracesSampleRate: 0.25
	})
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const captureError = (err: any): void => {
	Sentry.captureException(err)
}