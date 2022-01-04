import { AxiosResponse } from 'axios'
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper'
import React, { useMemo } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { fetchInnloggetAnsatt } from './api/tiltak-api'
import { Banner } from './component/felles/menu/Banner'
import { Spinner } from './component/felles/spinner/Spinner'
import { BrukerDetaljerPage } from './component/page/bruker-detaljer/BrukerDetaljerPage'
import { GjennomforingDetaljerPage } from './component/page/gjennomforing-detaljer/GjennomforingDetaljerPage'
import { GjennomforingListePage } from './component/page/gjennomforing-page/GjennomforingListePage'
import { LoginPage } from './component/page/login/LoginPage'
import { PageViewMetricCollector } from './component/PageViewMetricCollector'
import { InnloggetAnsatt, Virksomhet } from './domeneobjekter/ansatt'
import StoreProvider from './store/store-provider'
import { hentSisteLagretEllerForsteTilgjengeligVirksomhet } from './store/valgt-virksomhet-store'
import { internalUrl } from './utils/url-utils'
import { isNotStartedOrPending, isRejected, usePromise } from './utils/use-promise'

export const App = (): React.ReactElement => {
	const fetchInnloggetAnsattPromise = usePromise<AxiosResponse<InnloggetAnsatt>>(fetchInnloggetAnsatt)

	const defaultValgtVirksomhet = useMemo<Virksomhet | undefined>(() => {
		if (fetchInnloggetAnsattPromise.result) {
			return hentSisteLagretEllerForsteTilgjengeligVirksomhet(fetchInnloggetAnsattPromise.result.data.arrangorer)
		}
	}, [ fetchInnloggetAnsattPromise.result ])

	if (isNotStartedOrPending(fetchInnloggetAnsattPromise)) {
		return <Spinner />
	}

	if (isRejected(fetchInnloggetAnsattPromise)) {
		return <LoginPage />
	}

	if (!defaultValgtVirksomhet) {
		return <AlertStripeAdvarsel>Du har ikke blitt tildelt tilgang til en virksomhet</AlertStripeAdvarsel>
	}

	const innloggetAnsatt = fetchInnloggetAnsattPromise.result.data

	return (
		<StoreProvider innloggetAnsatt={innloggetAnsatt} defaultValgtVirksomhet={defaultValgtVirksomhet}>
			<BrowserRouter>
				<Banner/>
				<Switch>
					<Route path={internalUrl('/user/:brukerId')}>
						<BrukerDetaljerPage />
					</Route>
					<Route path={internalUrl('/gjennomforing/:gjennomforingId')}>
						<GjennomforingDetaljerPage />
					</Route>
					<Route path={internalUrl('/')}>
						<GjennomforingListePage/>
					</Route>
				</Switch>
				<PageViewMetricCollector />
			</BrowserRouter>
		</StoreProvider>
	)
}
