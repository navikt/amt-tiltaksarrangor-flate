import 'dayjs/locale/nb'
import './index.scss'

import dayjs from 'dayjs'
import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import { App } from './App'
import { DemoBanner } from './component/felles/demo-banner/DemoBanner'
import { ErrorBoundary } from './component/felles/ErrorBoundry'
import { ErrorPage } from './component/page/error/ErrorPage'
import StoreProvider from './store/store-provider'
import { initAmplitude } from './utils/amplitude-utils'
import env from './utils/environment'
import { setupNavDekorator } from './utils/nav-dekorator'
import { initSentry } from './utils/sentry-utils'

dayjs.locale('nb')

if (env.isPreprod || env.isProd) {
	initSentry()
	initAmplitude()
}

(async() => {
	if (import.meta.env.DEV) {
		await import('./mock')
	}

	await setupNavDekorator()

	const container = document.getElementById('root')

	// eslint-disable-next-line  @typescript-eslint/no-non-null-assertion
	const root = createRoot(container!)

	root.render(
		<React.StrictMode>
			<ErrorBoundary renderOnError={() => <ErrorPage />}>
				<StoreProvider>
					{env.isDemo && <DemoBanner />}
					<BrowserRouter>
						<App />
					</BrowserRouter>
				</StoreProvider>
			</ErrorBoundary>
		</React.StrictMode>
	)
})()
