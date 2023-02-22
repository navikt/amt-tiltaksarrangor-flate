import { AxiosResponse } from 'axios'
import React, { useEffect } from 'react'

import { InnloggetAnsatt } from './api/data/ansatt'
import { fetchInnloggetAnsatt } from './api/tiltak-api'
import { Header } from './component/felles/header/Header'
import { AppRoutes } from './Routes'
import { useAuthStore } from './store/data-store'
import { isNotStartedOrPending, isRejected, isResolved, usePromise } from './utils/use-promise'
import { SesjonNotifikasjon } from './component/sesjon-notifikasjon/SesjonNotifikasjon'


export const App = (): React.ReactElement => {
	const fetchInnloggetAnsattPromise = usePromise<AxiosResponse<InnloggetAnsatt>>(fetchInnloggetAnsatt)
	const { innloggetAnsatt, setInnloggetAnsatt } = useAuthStore()

	const harTilgangTilArrangor = !!innloggetAnsatt && innloggetAnsatt.arrangorer
		.filter(arrangor => arrangor.roller.length > 0)
		.length > 0

	useEffect(() => {
		if (isResolved(fetchInnloggetAnsattPromise)) {
			setInnloggetAnsatt(fetchInnloggetAnsattPromise.result.data)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ fetchInnloggetAnsattPromise ])

	return (
		<>
			<Header/>
			<main>
				<SesjonNotifikasjon />
				<AppRoutes
					// Vi må vente på at innloggetAnsatt er lagt inn i storen før vi rendrer routes
					isLoading={isNotStartedOrPending(fetchInnloggetAnsattPromise) || !innloggetAnsatt}
					isRejected={isRejected(fetchInnloggetAnsattPromise)}
					harTilgangTilArrangor={harTilgangTilArrangor}
				/>
			</main>
		</>
	)
}
