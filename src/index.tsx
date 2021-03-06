import 'dayjs/locale/nb'
import './index.scss'

import dayjs from 'dayjs'
import React from 'react'
import ReactDOM from 'react-dom'

import { App } from './App'
import { DemoBanner } from './component/felles/demo-banner/DemoBanner'
import { ErrorBoundary } from './component/felles/ErrorBoundry'
import { ErrorPage } from './component/page/error/ErrorPage'
import { initAmplitude } from './utils/amplitude-utils'
import env from './utils/environment'
import { initSentry } from './utils/sentry-utils'

dayjs.locale('nb')
initAmplitude()

if (env.isDevelopment) {
	require('./mock')
}

if (env.isPreprod || env.isProd) {
	initSentry()
}

ReactDOM.render(
	<React.StrictMode>
		<ErrorBoundary renderOnError={() => <ErrorPage />}>
			{ env.isDemo &&	<DemoBanner /> }
			<App />
		</ErrorBoundary>
	</React.StrictMode>,
	document.getElementById('root')
)
