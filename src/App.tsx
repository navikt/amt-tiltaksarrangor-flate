import { AxiosError, AxiosResponse } from 'axios'
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { InnloggetAnsatt } from './api/data/ansatt'
import { fetchInnloggetAnsatt } from './api/tiltak-api'
import { Banner } from './component/felles/menu/Banner'
import { SpinnerPage } from './component/felles/spinner-page/SpinnerPage'
import { BrukerDetaljerPage } from './component/page/bruker-detaljer/BrukerDetaljerPage'
import { GjennomforingDetaljerPage } from './component/page/gjennomforing-detaljer/GjennomforingDetaljerPage'
import { GjennomforingListePage } from './component/page/gjennomforing-page/GjennomforingListePage'
import { GjennomforingListePageV2 } from './component/page/gjennomforing-page/GjennomforingListePageV2'
import { InformasjonPage } from './component/page/informasjon-page/InformasjonPage'
import { LandingPage, LandingPageView } from './component/page/landing-page/LandingPage'
import { LeggTilDeltakerlistePage } from './component/page/legg-til-deltakerliste/LeggTilDeltakerlistePage'
import { PageViewMetricCollector } from './component/PageViewMetricCollector'
import { SesjonNotifikasjon } from './component/sesjon-notifikasjon/SesjonNotifikasjon'
import {
	BRUKER_DETALJER_PAGE_ROUTE,
	GJENNOMFORING_DETALJER_PAGE_ROUTE,
	GJENNOMFORING_LISTE_PAGE_ROUTE,
	INFORMASJON_PAGE_ROUTE, LEGG_TIL_DELTAKERLISTE_PAGE_ROUTE
} from './navigation'
import StoreProvider from './store/store-provider'
import toggle from './utils/toggle'
import { isNotStartedOrPending, isRejected, usePromise } from './utils/use-promise'

export const App = (): React.ReactElement => {
	const fetchInnloggetAnsattPromise = usePromise<AxiosResponse<InnloggetAnsatt>, AxiosError>(fetchInnloggetAnsatt)
	const erIkkeInnlogget = fetchInnloggetAnsattPromise.error?.response?.status === 401

	if (isNotStartedOrPending(fetchInnloggetAnsattPromise)) {
		return <SpinnerPage />
	}

	if (erIkkeInnlogget) {
		return <LandingPage view={LandingPageView.LOGIN} />
	}

	if (isRejected(fetchInnloggetAnsattPromise)) {
		return <LandingPage view={LandingPageView.IKKE_TILGANG} />
	}

	const innloggetAnsatt = fetchInnloggetAnsattPromise.result.data

	return (
		<StoreProvider innloggetAnsatt={innloggetAnsatt}>
			<BrowserRouter>
				<Banner/>
				<SesjonNotifikasjon/>
				<Routes>
					<Route path={BRUKER_DETALJER_PAGE_ROUTE} element={<BrukerDetaljerPage />} />
					<Route path={GJENNOMFORING_DETALJER_PAGE_ROUTE} element={<GjennomforingDetaljerPage />} />
					<Route path={INFORMASJON_PAGE_ROUTE} element={<InformasjonPage />} />
					<Route path={GJENNOMFORING_LISTE_PAGE_ROUTE} element={
						toggle.visNyTilgangskontroll
							? <GjennomforingListePageV2/>
							: <GjennomforingListePage/>
					}/>
					<Route path={LEGG_TIL_DELTAKERLISTE_PAGE_ROUTE} element={<LeggTilDeltakerlistePage/>}/>
				</Routes>
				<PageViewMetricCollector />
			</BrowserRouter>
		</StoreProvider>
	)
}
