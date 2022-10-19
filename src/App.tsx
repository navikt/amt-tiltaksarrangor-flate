import { AxiosError, AxiosResponse } from 'axios'
import React, { useEffect } from 'react'

import { InnloggetAnsatt } from './api/data/ansatt'
import { fetchInnloggetAnsatt } from './api/tiltak-api'
import { Banner } from './component/felles/menu/Banner'
import { SpinnerPage } from './component/felles/spinner-page/SpinnerPage'
import { IngenRollePage } from './component/page/ingen-rolle-page/IngenRollePage'
import { LandingPageView } from './component/page/landing-page/LandingPage'
import { PrivateRoutes, PublicRoutes } from './Routes'
import { useAuthStore } from './store/data-store'
import { isNotStartedOrPending, isRejected, isResolved, usePromise } from './utils/use-promise'

export const App = (): React.ReactElement => {
	const fetchInnloggetAnsattPromise = usePromise<AxiosResponse<InnloggetAnsatt>, AxiosError>(fetchInnloggetAnsatt)
	const erIkkeInnlogget = fetchInnloggetAnsattPromise.error?.response?.status === 401
	const { setInnloggetAnsatt } = useAuthStore()

	useEffect(() => {
		if (isResolved(fetchInnloggetAnsattPromise)) {
			setInnloggetAnsatt(fetchInnloggetAnsattPromise.result.data)
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ fetchInnloggetAnsattPromise ])

	if (isNotStartedOrPending(fetchInnloggetAnsattPromise)) {
		return <SpinnerPage />
	}

	if (erIkkeInnlogget) {
		return <PublicRoutes landingPageView={LandingPageView.LOGIN} />
	}

	if (isRejected(fetchInnloggetAnsattPromise)) {
		return <PublicRoutes landingPageView={LandingPageView.IKKE_TILGANG} />
	}

	const harTilgang = fetchInnloggetAnsattPromise.result.data.arrangorer
		.filter(arrangor => arrangor.roller.length > 0)
		.length > 0

	return (
		<>
			<Banner />
			{harTilgang ? <PrivateRoutes /> : <IngenRollePage />}
		</>
	)
}
