import { AxiosResponse } from 'axios'
import React, { useEffect, useState } from 'react'
import { fetchMineRoller } from './api/tiltak-api'
import { Header } from './component/felles/header/Header'
import { AppRoutes } from './Routes'
import { isNotStartedOrPending, isRejected, isResolved, usePromise } from './utils/use-promise'
import { SesjonNotifikasjon } from './component/sesjon-notifikasjon/SesjonNotifikasjon'


export const App = (): React.ReactElement => {
	const fetchMineRollerPromise = usePromise<AxiosResponse<string[]>>(fetchMineRoller)

	const [ isLoggedIn, setIsLoggedIn ] = useState<boolean>(false)
	const [ roller, setRoller ] = useState<string[]>([])

	useEffect(() => {
		if (isResolved(fetchMineRollerPromise)) {
			setRoller(fetchMineRollerPromise.result.data)
			setIsLoggedIn(true)
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ fetchMineRollerPromise ])

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
