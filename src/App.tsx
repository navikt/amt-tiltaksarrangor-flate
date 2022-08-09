import { AxiosError, AxiosResponse } from 'axios'
import React from 'react'

import { InnloggetAnsatt } from './api/data/ansatt'
import { fetchInnloggetAnsatt } from './api/tiltak-api'
import { Banner } from './component/felles/menu/Banner'
import { SpinnerPage } from './component/felles/spinner-page/SpinnerPage'
import { IngenRollePage } from './component/page/ingen-rolle-page/IngenRollePage'
import { LandingPage, LandingPageView } from './component/page/landing-page/LandingPage'
import { RouteProvider } from './RouteProvider'
import StoreProvider from './store/store-provider'
import { isNotStartedOrPending, isRejected, usePromise } from './utils/use-promise'

export const App = (): React.ReactElement => {
	const fetchInnloggetAnsattPromise = usePromise<AxiosResponse<InnloggetAnsatt>, AxiosError>(fetchInnloggetAnsatt)
	const erIkkeInnlogget = fetchInnloggetAnsattPromise.error?.response?.status === 401

	if (isNotStartedOrPending(fetchInnloggetAnsattPromise)) {
		return <SpinnerPage/>
	}

	if (erIkkeInnlogget) {
		return <LandingPage view={LandingPageView.LOGIN}/>
	}

	if (isRejected(fetchInnloggetAnsattPromise)) {
		return <LandingPage view={LandingPageView.IKKE_TILGANG}/>
	}

	const innloggetAnsatt = fetchInnloggetAnsattPromise.result.data

	let feilmelding = null

	const harTilgang = fetchInnloggetAnsattPromise.result.data.arrangorer
		.filter(arrangor => arrangor.roller.length > 0)
		.length > 0

	if (!harTilgang) {
		feilmelding = <IngenRollePage/>
	}

	return (
		<StoreProvider innloggetAnsatt={innloggetAnsatt}>
			<Banner/>
			{!!feilmelding && feilmelding}
			{!feilmelding && <RouteProvider/>}
		</StoreProvider>
	)
}
