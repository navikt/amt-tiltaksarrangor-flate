import { AxiosResponse } from 'axios'
import React, { useEffect, useState } from 'react'
import { fetchDeltakeroversikt, fetchMineRoller } from './api/tiltak-api'
import { Header } from './component/felles/header/Header'
import { AppRoutes } from './Routes'
import { isNotStartedOrPending, isRejected, isResolved, usePromise } from './utils/use-promise'
import { SesjonNotifikasjon } from './component/sesjon-notifikasjon/SesjonNotifikasjon'
import { Rolle } from './api/data/ansatt'
import { useInnloggetBrukerStore } from './store/innlogget-bruker-store'
import { MineDeltakerlister } from './api/data/deltaker'
import { useKoordinatorsDeltakerlisterStore } from './store/koordinators-deltakerlister-store'


export const App = (): React.ReactElement => {
	const fetchMineRollerPromise = usePromise<AxiosResponse<Rolle[]>>(fetchMineRoller)
	const fetchMineDeltakerlisterPromise = usePromise<AxiosResponse<MineDeltakerlister>>(
		() => fetchDeltakeroversikt()
	)
	const { roller, setRoller } = useInnloggetBrukerStore()
	const { setKoordinatorsDeltakerlister } = useKoordinatorsDeltakerlisterStore()

	const [ isLoggedIn, setIsLoggedIn ] = useState<boolean>(false)

	useEffect(() => {
		if (isResolved(fetchMineRollerPromise)) {
			setRoller(fetchMineRollerPromise.result.data)
			setIsLoggedIn(true)
		}
		if (isResolved(fetchMineDeltakerlisterPromise) && fetchMineDeltakerlisterPromise.result.data) {
			setKoordinatorsDeltakerlister(fetchMineDeltakerlisterPromise.result.data)
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ fetchMineRollerPromise.result, fetchMineDeltakerlisterPromise.result ])

	return (
		<>
			<Header isLoggedIn={isLoggedIn}/>
			<main>
				<SesjonNotifikasjon/>
				<AppRoutes
					// Vi må vente på at innloggetAnsatt er lagt inn i storen før vi rendrer routes
					isLoading={isNotStartedOrPending(fetchMineRollerPromise) || !isLoggedIn}
					isRejected={isRejected(fetchMineRollerPromise)}
					roller={roller}
				/>
			</main>
		</>
	)
}
