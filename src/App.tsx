import { AxiosError, AxiosResponse } from 'axios'
import React from 'react'
import { BrowserRouter, matchPath, Route, Routes } from 'react-router-dom'

import { InnloggetAnsatt } from './api/data/ansatt'
import { fetchInnloggetAnsatt } from './api/tiltak-api'
import { Banner } from './component/felles/menu/Banner'
import { SpinnerPage } from './component/felles/spinner-page/SpinnerPage'
import { BrukerDetaljerPage } from './component/page/bruker-detaljer/BrukerDetaljerPage'
import { GjennomforingDetaljerPage } from './component/page/gjennomforing-detaljer/GjennomforingDetaljerPage'
import { GjennomforingListePage } from './component/page/gjennomforing-page/GjennomforingListePage'
import { InformasjonPage } from './component/page/informasjon-page/InformasjonPage'
import { LandingPage, LandingPageView } from './component/page/landing-page/LandingPage'
import { TilgangInvitasjonLandingPage } from './component/page/tilgang-invitasjon-landing-page/TilgangInvitasjonLandingPage'
import { TilgangInvitasjonPage } from './component/page/tilgang-invitasjon-page/TilgangInvitasjonPage'
import { PageViewMetricCollector } from './component/PageViewMetricCollector'
import {
	BRUKER_DETALJER_PAGE_ROUTE,
	GJENNOMFORING_DETALJER_PAGE_ROUTE,
	GJENNOMFORING_LISTE_PAGE_ROUTE,
	INFORMASJON_PAGE_ROUTE,
	TILGANG_INVITASJON_PAGE_ROUTE
} from './navigation'
import StoreProvider from './store/store-provider'
import { isNotStartedOrPending, isRejected, usePromise } from './utils/use-promise'

export const App = (): React.ReactElement => {
	const fetchInnloggetAnsattPromise = usePromise<AxiosResponse<InnloggetAnsatt>, AxiosError>(fetchInnloggetAnsatt)
	const erIkkeInnlogget = fetchInnloggetAnsattPromise.error?.response?.status === 401

	const tilgangInvitasjonMatchPath = matchPath(
		TILGANG_INVITASJON_PAGE_ROUTE,
		window.location.pathname
	)

	const visTilgangInvitasjon = !!tilgangInvitasjonMatchPath

	if (isNotStartedOrPending(fetchInnloggetAnsattPromise)) {
		return <SpinnerPage />
	}

	if (visTilgangInvitasjon) {
		if (erIkkeInnlogget) {
			return <TilgangInvitasjonLandingPage />
		} else {
			return <TilgangInvitasjonPage invitasjonId={tilgangInvitasjonMatchPath?.params.invitasjonId || ''} />
		}
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
				<Routes>
					<Route path={BRUKER_DETALJER_PAGE_ROUTE} element={<BrukerDetaljerPage />} />
					<Route path={GJENNOMFORING_DETALJER_PAGE_ROUTE} element={<GjennomforingDetaljerPage />} />
					<Route path={INFORMASJON_PAGE_ROUTE} element={<InformasjonPage />} />
					<Route path={GJENNOMFORING_LISTE_PAGE_ROUTE} element={<GjennomforingListePage/>}/>
				</Routes>
				<PageViewMetricCollector />
			</BrowserRouter>
		</StoreProvider>
	)
}
