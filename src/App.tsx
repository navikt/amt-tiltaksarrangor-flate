import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { BrukerDetaljerPage } from './component/page/bruker-detaljer/BrukerDetaljerPage';
import { TiltakinstansDetaljerPage } from './component/page/tiltakinstans-detaljer/TiltakinstansDetaljerPage';
import StoreProvider from './store/store-provider';
import { LoginPage } from './component/page/login/LoginPage';
import { Spinner } from './component/felles/spinner/Spinner';
import { fetchInnloggetAnsatt } from './api';
import { TiltakinstansOversiktPage } from './component/page/tiltakinstans-oversikt/TiltakinstansOversiktPage';
import { Menu } from './component/felles/menu/Menu';
import { InnloggetAnsatt } from './api/data/ansatt';
import { isNotStartedOrPending, isRejected, usePromise } from './utils/use-promise';
import { AxiosResponse } from 'axios';

export const App = () => {
	const fetchInnloggetAnsattPromise = usePromise<AxiosResponse<InnloggetAnsatt>>(fetchInnloggetAnsatt);

	if (isNotStartedOrPending(fetchInnloggetAnsattPromise)) {
		return <Spinner/>;
	}

	if (isRejected(fetchInnloggetAnsattPromise)) {
		return <LoginPage />;
	}

	const innloggetAnsatt = fetchInnloggetAnsattPromise.result.data;

	return (
		<StoreProvider innloggetAnsatt={innloggetAnsatt}>
			<Menu/>
			<BrowserRouter>
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
			</BrowserRouter>
		</StoreProvider>
	);
};
