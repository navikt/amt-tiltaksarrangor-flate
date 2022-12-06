import React from 'react'
import { Navigate, Route,Routes } from 'react-router-dom'

import { SpinnerPage } from './component/felles/spinner-page/SpinnerPage'
import { DeltakerDetaljerPage } from './component/page/bruker-detaljer/DeltakerDetaljerPage'
import { GjennomforingDetaljerPage } from './component/page/gjennomforing-detaljer/GjennomforingDetaljerPage'
import { GjennomforingListePage } from './component/page/gjennomforing-page/GjennomforingListePage'
import { InformasjonPage } from './component/page/informasjon-page/InformasjonPage'
import { IngenRollePage } from './component/page/ingen-rolle-page/IngenRollePage'
import { LandingPage, LandingPageView } from './component/page/landing-page/LandingPage'
import { LeggTilDeltakerlistePage } from './component/page/legg-til-deltakerliste/LeggTilDeltakerlistePage'
import { PersonopplysningerPage } from './component/page/personopplysninger-page/PersonopplysningerPage'
import { SesjonNotifikasjon } from './component/sesjon-notifikasjon/SesjonNotifikasjon'
import { Driftsmelding } from './Driftsmelding'
import {
	BRUKER_DETALJER_PAGE_ROUTE,
	GJENNOMFORING_DETALJER_PAGE_ROUTE,
	GJENNOMFORING_LISTE_PAGE_ROUTE,
	INFORMASJON_PAGE_ROUTE, INGEN_ROLLE_PAGE_ROUTE,
	LEGG_TIL_DELTAKERLISTE_PAGE_ROUTE,
	PERSONOPPLYSNINGER_PAGE_ROUTE
} from './navigation'


interface AppRoutesProps {
	erInnlogget: boolean,
	isLoading: boolean
	isRejected: boolean
	harTilgangTilArrangor: boolean
}

export const AppRoutes = ({ erInnlogget, isLoading, isRejected, harTilgangTilArrangor }: AppRoutesProps) => {
	if (isLoading) return <SpinnerPage/>
	else if (!erInnlogget) return <PublicRoutes landingPageView={LandingPageView.LOGIN}/>
	else if (isRejected) return <PublicRoutes landingPageView={LandingPageView.IKKE_TILGANG}/>
	else if (!harTilgangTilArrangor) return <IngenRolleRoutes/>
	return <PrivateRoutes/>
}

const PrivateRoutes = (): React.ReactElement => {
	return (
		<>
			<SesjonNotifikasjon />
			<Driftsmelding />
			<Routes>
				<Route path={BRUKER_DETALJER_PAGE_ROUTE} element={<DeltakerDetaljerPage />} />
				<Route path={GJENNOMFORING_DETALJER_PAGE_ROUTE} element={<GjennomforingDetaljerPage />} />
				<Route path={INFORMASJON_PAGE_ROUTE} element={<InformasjonPage />} />
				<Route path={GJENNOMFORING_LISTE_PAGE_ROUTE} element={<GjennomforingListePage />} />
				<Route path={LEGG_TIL_DELTAKERLISTE_PAGE_ROUTE} element={<LeggTilDeltakerlistePage />} />
				<Route path={PERSONOPPLYSNINGER_PAGE_ROUTE} element={<PersonopplysningerPage />} />
				<Route path="*" element={<Navigate replace to={GJENNOMFORING_LISTE_PAGE_ROUTE}/>} />
			</Routes>
		</>
	)
}

const PublicRoutes = (props: { landingPageView: LandingPageView }): React.ReactElement => {
	return (
		<Routes>
			<Route path={PERSONOPPLYSNINGER_PAGE_ROUTE} element={<PersonopplysningerPage />} />
			<Route path="*" element={<LandingPage view={props.landingPageView} />} />
		</Routes>
	)
}

const IngenRolleRoutes = (): React.ReactElement => {
	return (
		<Routes>
			<Route path={INGEN_ROLLE_PAGE_ROUTE} element={<IngenRollePage />} />
			<Route path={INFORMASJON_PAGE_ROUTE} element={<InformasjonPage />} />
			<Route path="*" element={<Navigate replace to={INGEN_ROLLE_PAGE_ROUTE}/>} />
		</Routes>
	)
}
