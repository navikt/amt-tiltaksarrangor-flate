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
import StoreProvider from './store/store-provider'
import { hentSisteLagretEllerForsteTilgjengeligVirksomhet } from './store/valgt-virksomhet-store'
import { internalUrl } from './utils/url-utils'
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
					<Route path={internalUrl('/user/:brukerId')} element={<BrukerDetaljerPage />} />
					<Route path={internalUrl('/gjennomforing/:gjennomforingId')} element={<GjennomforingDetaljerPage />} />
					<Route path={internalUrl('/informasjon')} element={<InformasjonPage />} />
					<Route path={internalUrl('/')} element={<GjennomforingListePage/>}/>
				</Routes>
				<PageViewMetricCollector />
			</BrowserRouter>
		</StoreProvider>
	)
}
