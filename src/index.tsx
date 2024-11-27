import './index.scss'

import dayjs from 'dayjs'
import nb from 'dayjs/locale/nb'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import { App } from './App'
import { DemoBanner } from './component/felles/demo-banner/DemoBanner'
import { ErrorBoundary } from './component/felles/ErrorBoundry'
import { ErrorPage } from './component/page/error/ErrorPage'
import StoreProvider from './store/store-provider'
import env from './utils/environment'
import { setupNavDekorator } from './utils/nav-dekorator'
import { initSentry } from './utils/sentry-utils'

dayjs.locale(nb)
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(isSameOrAfter)
dayjs.extend(isSameOrBefore)
dayjs.extend(customParseFormat)
dayjs.tz.setDefault('Europe/Oslo')

if (env.isPreprod || env.isProd) {
  initSentry()
}

;(async () => {
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
