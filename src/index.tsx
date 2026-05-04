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
import { ErrorPage } from './component/page/error/ErrorPage'
import StoreProvider from './store/store-provider'
import env from './utils/environment'
import { setupNavDekorator } from './utils/nav-dekorator'
import { initSentry } from './utils/sentry-utils'
import { enableMocking } from './mock/setupMocks'
import { initializeFaro } from '@grafana/faro-web-sdk'
import { FaroErrorBoundary } from '@grafana/faro-react'

dayjs.locale(nb)
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(isSameOrAfter)
dayjs.extend(isSameOrBefore)
dayjs.extend(customParseFormat)
dayjs.tz.setDefault('Europe/Oslo')

await setupNavDekorator()

if (env.isPreprod || env.isProd) {
  initSentry()
}

const renderAsReactRoot = () => {
  const container = document.getElementById('root')
  const root = createRoot(container!)

  root.render(
    <React.StrictMode>
      <FaroErrorBoundary fallback={<ErrorPage />}>
        <StoreProvider>
          {env.isDemo && <DemoBanner />}
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </StoreProvider>
      </FaroErrorBoundary>
    </React.StrictMode>
  )
}

enableMocking().then(() => {
  if (env.faroUrl) {
    initializeFaro({
      url: env.faroUrl,
      app: {
        name: 'amt-deltaker-innbyggers-flate',
        version: import.meta.env.VITE_APP_VERSION || 'local'
      },
      isolate: true,
      beforeSend: faroBeforeSend
    })
  }

  renderAsReactRoot()
})

// Faro beforeSend callback for å rense telemetri-data før de sendes til Faro. Dette inkluderer:
// 1. Fjerne query-parametere fra side-URLer for å unngå at sensitive data som tokens eller autorisasjonskoder logges.
// 2. Dropp hele telemetri-elementet hvis payloaden inneholder et 11-sifret mønster som kan være et fødselsnummer, for å beskytte personopplysninger.

interface TransportItem {
  meta?: {
    page?: {
      url?: string
    }
  }
}

const faroBeforeSend = <T extends TransportItem>(item: T): T | null => {
  // Fjern query-parametere fra side-URLer.
  // Kan inneholde tokens, autorisasjonskoder eller andre identifikatorer.
  if (item.meta?.page?.url) {
    try {
      const url = new URL(item.meta.page.url)
      url.search = ''
      item.meta.page.url = url.toString()
    } catch {
      /* ignore malformed URLs */
    }
  }

  // Dropp hele telemetri-elementet hvis payloaden inneholder et
  // 11-sifret mønster som kan være et fødselsnummer.
  const payload = JSON.stringify(item)
  if (/\d{11}/.test(payload)) {
    return null
  }

  return item
}
