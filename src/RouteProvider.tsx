import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { BrukerDetaljerPage } from './component/page/bruker-detaljer/BrukerDetaljerPage'
import { GjennomforingDetaljerPage } from './component/page/gjennomforing-detaljer/GjennomforingDetaljerPage'
import { GjennomforingListePage } from './component/page/gjennomforing-page/GjennomforingListePage'
import { GjennomforingListePageV2 } from './component/page/gjennomforing-page/GjennomforingListePageV2'
import { InformasjonPage } from './component/page/informasjon-page/InformasjonPage'
import { LeggTilDeltakerlistePage } from './component/page/legg-til-deltakerliste/LeggTilDeltakerlistePage'
import {
	BRUKER_DETALJER_PAGE_ROUTE,
	GJENNOMFORING_DETALJER_PAGE_ROUTE,
	GJENNOMFORING_LISTE_PAGE_ROUTE,
	INFORMASJON_PAGE_ROUTE,
	LEGG_TIL_DELTAKERLISTE_PAGE_ROUTE
} from './navigation'
import toggle from './utils/toggle'

export const RouteProvider = (): React.ReactElement => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path={BRUKER_DETALJER_PAGE_ROUTE} element={<BrukerDetaljerPage/>}/>
				<Route path={GJENNOMFORING_DETALJER_PAGE_ROUTE} element={<GjennomforingDetaljerPage/>}/>
				<Route path={INFORMASJON_PAGE_ROUTE} element={<InformasjonPage/>}/>
				<Route path={GJENNOMFORING_LISTE_PAGE_ROUTE} element={
					toggle.visNyTilgangskontroll
						? <GjennomforingListePageV2/>
						: <GjennomforingListePage/>
				}/>
				<Route path={LEGG_TIL_DELTAKERLISTE_PAGE_ROUTE} element={<LeggTilDeltakerlistePage/>}/>
			</Routes>
		</BrowserRouter>
	)
}
