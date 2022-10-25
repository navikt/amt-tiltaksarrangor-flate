import { AxiosError, AxiosResponse } from 'axios'
import React, { useEffect } from 'react'
import { matchPath, useLocation, useNavigate } from 'react-router-dom'

import { InnloggetAnsatt } from './api/data/ansatt'
import { fetchInnloggetAnsatt } from './api/tiltak-api'
import { Banner } from './component/felles/menu/Banner'
import { SpinnerPage } from './component/felles/spinner-page/SpinnerPage'
import { LandingPageView } from './component/page/landing-page/LandingPage'
import { INGEN_ROLLE_PAGE_ROUTE, rollePaakrevet } from './navigation'
import { PrivateRoutes, PublicRoutes } from './Routes'
import { useAuthStore } from './store/data-store'
import { isNotStartedOrPending, isRejected, isResolved, usePromise } from './utils/use-promise'

export const App = (): React.ReactElement => {
	const fetchInnloggetAnsattPromise = usePromise<AxiosResponse<InnloggetAnsatt>, AxiosError>(fetchInnloggetAnsatt)
	const erIkkeInnlogget = fetchInnloggetAnsattPromise.error?.response?.status === 401
	const { innloggetAnsatt, setInnloggetAnsatt } = useAuthStore()
	const navigate = useNavigate()
	const location = useLocation()

	useEffect(() => {
		if (isResolved(fetchInnloggetAnsattPromise)) {
			setInnloggetAnsatt(fetchInnloggetAnsattPromise.result.data)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ fetchInnloggetAnsattPromise ])

	useEffect(() => {
		if (!innloggetAnsatt) return

		const harTilgang = innloggetAnsatt.arrangorer
			.filter(arrangor => arrangor.roller.length > 0)
			.length > 0

		const trengerRolle = rollePaakrevet(location.pathname)
		const erPaaIngenRollePage = matchPath(INGEN_ROLLE_PAGE_ROUTE, location.pathname)

		if (trengerRolle && !harTilgang && !erPaaIngenRollePage) {
			navigate(INGEN_ROLLE_PAGE_ROUTE, { replace: true })
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ innloggetAnsatt, location.pathname ])

	if (isNotStartedOrPending(fetchInnloggetAnsattPromise)) {
		return <SpinnerPage/>
	}

	if (erIkkeInnlogget) {
		return <PublicRoutes landingPageView={LandingPageView.LOGIN}/>
	}

	if (isRejected(fetchInnloggetAnsattPromise)) {
		return <PublicRoutes landingPageView={LandingPageView.IKKE_TILGANG}/>
	}
	return (
		<>
			<Banner/>
			<PrivateRoutes/>
		</>
	)
}
