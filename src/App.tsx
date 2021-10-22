import React, { useMemo } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { BrukerDetaljerPage } from './component/page/bruker-detaljer/BrukerDetaljerPage';
import { TiltakinstansDetaljerPage } from './component/page/tiltakinstans-detaljer/TiltakinstansDetaljerPage';
import StoreProvider from './store/store-provider';
import { LoginPage } from './component/page/login/LoginPage';
import { Spinner } from './component/felles/spinner/Spinner';
import { fetchInnloggetAnsatt } from './api/tiltak-api';
import { TiltakinstansOversiktPage } from './component/page/tiltakinstans-oversikt/TiltakinstansOversiktPage';
import { Banner } from './component/felles/menu/Banner';
import { isNotStartedOrPending, isRejected, usePromise } from './utils/use-promise';
import { AxiosResponse } from 'axios';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import { hentSisteLagretEllerForsteTilgjengeligVirksomhet } from './store/valgt-virksomhet-store';
import { InnloggetAnsatt, Virksomhet } from './domeneobjekter/ansatt';
import { PageViewMetricCollector } from './component/PageViewMetricCollector';

export const App = () => {
	const fetchInnloggetAnsattPromise = usePromise<AxiosResponse<InnloggetAnsatt>>(fetchInnloggetAnsatt);

	const defaultValgtVirksomhet = useMemo<Virksomhet | undefined>(() => {
		if (fetchInnloggetAnsattPromise.result) {
			return hentSisteLagretEllerForsteTilgjengeligVirksomhet(fetchInnloggetAnsattPromise.result.data.virksomheter);
		}
	}, [fetchInnloggetAnsattPromise.result]);

	if (isNotStartedOrPending(fetchInnloggetAnsattPromise)) {
		return <Spinner />;
	}

	if (isRejected(fetchInnloggetAnsattPromise)) {
		return <LoginPage />;
	}

	if (!defaultValgtVirksomhet) {
		return <AlertStripeAdvarsel>Du har ikke blitt tildelt tilgang til en virksomhet</AlertStripeAdvarsel>;
	}

	const innloggetAnsatt = fetchInnloggetAnsattPromise.result.data;

	return (
		<StoreProvider innloggetAnsatt={innloggetAnsatt} defaultValgtVirksomhet={defaultValgtVirksomhet}>
			<BrowserRouter>
				<Banner/>
				<Switch>
					<Route path="/user/:brukerId">
						<BrukerDetaljerPage />
					</Route>
					<Route path="/instans/:tiltakinstansId">
						<TiltakinstansDetaljerPage />
					</Route>
					<Route path="/">
						<TiltakinstansOversiktPage/>
					</Route>
				</Switch>
				<PageViewMetricCollector />
			</BrowserRouter>
		</StoreProvider>
	);
};
