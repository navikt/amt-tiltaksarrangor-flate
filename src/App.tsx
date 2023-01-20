import { AxiosResponse } from 'axios'
import React, { useEffect } from 'react'

import { InnloggetAnsatt } from './api/data/ansatt'
import { fetchInnloggetAnsatt } from './api/tiltak-api'
import { Header } from './component/felles/header/Header'
import { AppRoutes } from './Routes'
import { useAuthStore } from './store/data-store'
import { isNotStartedOrPending, isRejected, isResolved, usePromise } from './utils/use-promise'


export const App = (): React.ReactElement => {
	const fetchInnloggetAnsattPromise = usePromise<AxiosResponse<InnloggetAnsatt>>(fetchInnloggetAnsatt)
	const { innloggetAnsatt, setInnloggetAnsatt } = useAuthStore()
	const autentisert = fetchInnloggetAnsattPromise.error?.response?.status !== 401
	const harTilgangTilArrangor = !!innloggetAnsatt && innloggetAnsatt.arrangorer
		.filter(arrangor => arrangor.roller.length > 0)
		.length > 0

	useEffect(() => {
		if (isResolved(fetchInnloggetAnsattPromise)) {
			setInnloggetAnsatt(fetchInnloggetAnsattPromise.result.data)
		}
	}, [ fetchInnloggetAnsattPromise, setInnloggetAnsatt ])

	return (
		<>
			<Header/>
			<main>
				<AppRoutes
					erInnlogget={autentisert && !!innloggetAnsatt}
					isLoading={isNotStartedOrPending(fetchInnloggetAnsattPromise)}
					isRejected={isRejected(fetchInnloggetAnsattPromise)}
					harTilgangTilArrangor={harTilgangTilArrangor}
				/>
			</main>
		</>
	)
}
