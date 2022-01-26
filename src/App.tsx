import { AxiosError, AxiosResponse } from 'axios'
import React, { useMemo } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { fetchInnloggetAnsatt } from './api/tiltak-api'
import { Banner } from './component/felles/menu/Banner'
import { Spinner } from './component/felles/spinner/Spinner'
import { BrukerDetaljerPage } from './component/page/bruker-detaljer/BrukerDetaljerPage'
import { GjennomforingDetaljerPage } from './component/page/gjennomforing-detaljer/GjennomforingDetaljerPage'
import { GjennomforingListePage } from './component/page/gjennomforing-page/GjennomforingListePage'
import { InformasjonPage } from './component/page/informasjon-page/InformasjonPage'
import { LandingPage, LandingPageView } from './component/page/landing-page/LandingPage'
import { PageViewMetricCollector } from './component/PageViewMetricCollector'
import { InnloggetAnsatt, Virksomhet } from './domeneobjekter/ansatt'
import {
	BRUKER_DETALJER_PAGE_ROUTE,
	GJENNOMFORING_DETALJER_PAGE_ROUTE,
	GJENNOMFORING_LISTE_PAGE_ROUTE,
	INFORMASJON_PAGE_ROUTE
} from './navigation'
import StoreProvider from './store/store-provider'
import { hentSisteLagretEllerForsteTilgjengeligVirksomhet } from './store/valgt-virksomhet-store'
import { isNotStartedOrPending, isRejected, usePromise } from './utils/use-promise'

export const App = (): React.ReactElement => {
	const fetchInnloggetAnsattPromise = usePromise<AxiosResponse<InnloggetAnsatt>, AxiosError>(fetchInnloggetAnsatt)

	const defaultValgtVirksomhet = useMemo<Virksomhet | undefined>(() => {
		if (fetchInnloggetAnsattPromise.result) {
			return hentSisteLagretEllerForsteTilgjengeligVirksomhet(fetchInnloggetAnsattPromise.result.data.arrangorer)
		}
	}, [ fetchInnloggetAnsattPromise.result ])

	const erIkkeInnlogget = fetchInnloggetAnsattPromise.error?.response?.status === 401

	if (isNotStartedOrPending(fetchInnloggetAnsattPromise)) {
		return <Spinner />
	}

	if (erIkkeInnlogget) {
		return <LandingPage view={LandingPageView.LOGIN} />
	}

	if (!defaultValgtVirksomhet || isRejected(fetchInnloggetAnsattPromise)) {
		return <LandingPage view={LandingPageView.IKKE_TILGANG} />
	}

	const innloggetAnsatt = fetchInnloggetAnsattPromise.result.data

	return (
		<StoreProvider innloggetAnsatt={innloggetAnsatt} defaultValgtVirksomhet={defaultValgtVirksomhet}>
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
