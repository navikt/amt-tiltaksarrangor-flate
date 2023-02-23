import React from 'react'
import { Navigate, Route,Routes } from 'react-router-dom'

import { SpinnerPage } from './component/felles/spinner-page/SpinnerPage'
import { DeltakerDetaljerPage } from './component/page/bruker-detaljer/DeltakerDetaljerPage'
import { ErrorPage } from './component/page/error/ErrorPage'
import { GjennomforingDetaljerPage } from './component/page/gjennomforing-detaljer/GjennomforingDetaljerPage'
import { GjennomforingListePage } from './component/page/gjennomforing-page/GjennomforingListePage'
import { IngenRollePage } from './component/page/ingen-rolle-page/IngenRollePage'
import { LeggTilDeltakerlistePage } from './component/page/legg-til-deltakerliste/LeggTilDeltakerlistePage'
import { Driftsmelding } from './Driftsmelding'
import {
	DELTAKER_DETALJER_PAGE_ROUTE,
	DU_ER_LOGGET_UT_PAGE_ROUTE,
	GJENNOMFORING_DETALJER_PAGE_ROUTE,
	GJENNOMFORING_LISTE_PAGE_ROUTE,
	INFORMASJON_PAGE_ROUTE, INGEN_ROLLE_PAGE_ROUTE,
	LEGG_TIL_DELTAKERLISTE_PAGE_ROUTE
} from './navigation'
import { LoggetUtPage } from './component/page/LoggetUtPage'


interface AppRoutesProps {
	isLoading: boolean
	isRejected: boolean
	harTilgangTilArrangor: boolean
}

export const AppRoutes = ({ isLoading, isRejected, harTilgangTilArrangor }: AppRoutesProps) => {
	if (isLoading) return <SpinnerPage/>
	if (isRejected) return <ErrorPage/>
	else if (!harTilgangTilArrangor) return <IngenRolleRoutes/>
	return <PrivateRoutes/>
}

const PrivateRoutes = (): React.ReactElement => {
	return (
		<>
			<Driftsmelding />
			<Routes>
				<Route path={DELTAKER_DETALJER_PAGE_ROUTE} element={<DeltakerDetaljerPage />} />
				<Route path={GJENNOMFORING_DETALJER_PAGE_ROUTE} element={<GjennomforingDetaljerPage />} />
				<Route path={INFORMASJON_PAGE_ROUTE} />
				<Route path={GJENNOMFORING_LISTE_PAGE_ROUTE} element={<GjennomforingListePage />} />
				<Route path={LEGG_TIL_DELTAKERLISTE_PAGE_ROUTE} element={<LeggTilDeltakerlistePage />} />
				<Route path={DU_ER_LOGGET_UT_PAGE_ROUTE} element={<LoggetUtPage/>}/>
				<Route path="*" element={<Navigate replace to={GJENNOMFORING_LISTE_PAGE_ROUTE}/>} />
			</Routes>
		</>
	)
}

const IngenRolleRoutes = (): React.ReactElement => {
	return (
		<Routes>
			<Route path={INGEN_ROLLE_PAGE_ROUTE} element={<IngenRollePage />} />
			<Route path={INFORMASJON_PAGE_ROUTE} />
			<Route path="*" element={<Navigate replace to={INGEN_ROLLE_PAGE_ROUTE}/>} />
		</Routes>
	)
}
