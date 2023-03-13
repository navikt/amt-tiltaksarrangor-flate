import React from 'react'
import { Navigate, Route,Routes } from 'react-router-dom'

import { SpinnerPage } from './component/felles/spinner-page/SpinnerPage'
import { DeltakerDetaljerPage } from './component/page/bruker-detaljer/DeltakerDetaljerPage'
import { ErrorPage } from './component/page/error/ErrorPage'
import { GjennomforingDetaljerPage } from './component/page/gjennomforing-detaljer/GjennomforingDetaljerPage'
import { GjennomforingListePage } from './component/page/gjennomforing-page/GjennomforingListePage'
import { IngenRollePage } from './component/page/ingen-rolle-page/IngenRollePage'
import { Driftsmelding } from './Driftsmelding'
import {
	DELTAKER_DETALJER_PAGE_ROUTE, DELTAKERLISTE_VEILEDER_PAGE_ROUTE,
	DU_ER_LOGGET_UT_PAGE_ROUTE,
	GJENNOMFORING_DETALJER_PAGE_ROUTE,
	GJENNOMFORING_LISTE_PAGE_ROUTE,
	INGEN_ROLLE_PAGE_ROUTE,
	LEGG_TIL_DELTAKERLISTE_PAGE_ROUTE
} from './navigation'
import { LoggetUtPage } from './component/page/LoggetUtPage'
import { DeltakerlisteVeilederPage } from './component/page/deltakerliste-veileder/DeltakerlisteVeilederPage'
import toggle from './utils/toggle'
import {
	AdministrerDeltakerlisterPage
} from './component/page/administrer-deltakerlister-page/AdministrerDeltakerlisterPage'


interface AppRoutesProps {
	isLoading: boolean
	isRejected: boolean
	roller: string[]
}

export const AppRoutes = ({ isLoading, isRejected, roller }: AppRoutesProps) => {
	if (isLoading) return <SpinnerPage/>
	if (isRejected) return <ErrorPage/>
	else if (toggle.veilederEnabled && roller.includes('KOORDINATOR') && roller.includes('VEILEDER')) return <VeilederOgKoordinatorRoutes/>
	else if (roller.includes('KOORDINATOR')) return <KoordinatorRoutes/>
	else if (toggle.veilederEnabled && roller.includes('VEILEDER')) return <VeilederRoutes/>
	return <IngenRolleRoutes/>
}

const KoordinatorRoutes = (): React.ReactElement => {
	return (
		<>
			<Driftsmelding />
			<Routes>
				<Route path={DELTAKER_DETALJER_PAGE_ROUTE} element={<DeltakerDetaljerPage />} />
				<Route path={GJENNOMFORING_DETALJER_PAGE_ROUTE} element={<GjennomforingDetaljerPage />} />
				<Route path={GJENNOMFORING_LISTE_PAGE_ROUTE} element={<GjennomforingListePage />} />
				<Route path={LEGG_TIL_DELTAKERLISTE_PAGE_ROUTE} element={<AdministrerDeltakerlisterPage />} />
				<Route path={DU_ER_LOGGET_UT_PAGE_ROUTE} element={<LoggetUtPage/>}/>
				<Route path="*" element={<Navigate replace to={GJENNOMFORING_LISTE_PAGE_ROUTE}/>} />
			</Routes>
		</>
	)
}

const VeilederRoutes = (): React.ReactElement => {
	return (
		<>
			<Driftsmelding />
			<Routes>
				<Route path={DELTAKERLISTE_VEILEDER_PAGE_ROUTE} element={<DeltakerlisteVeilederPage />} />
				<Route path={DELTAKER_DETALJER_PAGE_ROUTE} element={<DeltakerDetaljerPage />} />
				<Route path={DU_ER_LOGGET_UT_PAGE_ROUTE} element={<LoggetUtPage/>}/>
				<Route path="*" element={<Navigate replace to={DELTAKERLISTE_VEILEDER_PAGE_ROUTE}/>} />
			</Routes>
		</>
	)
}

const VeilederOgKoordinatorRoutes = (): React.ReactElement => {
	return (
		<>
			<Driftsmelding />
			<Routes>
				<Route path={DELTAKERLISTE_VEILEDER_PAGE_ROUTE} element={<DeltakerlisteVeilederPage />} />
				<Route path={DELTAKER_DETALJER_PAGE_ROUTE} element={<DeltakerDetaljerPage />} />
				<Route path={GJENNOMFORING_DETALJER_PAGE_ROUTE} element={<GjennomforingDetaljerPage />} />
				<Route path={GJENNOMFORING_LISTE_PAGE_ROUTE} element={<GjennomforingListePage />} />
				<Route path={LEGG_TIL_DELTAKERLISTE_PAGE_ROUTE} element={<AdministrerDeltakerlisterPage />} />
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
			<Route path="*" element={<Navigate replace to={INGEN_ROLLE_PAGE_ROUTE}/>} />
		</Routes>
	)
}
