import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { BrukerDetaljerPage } from './component/page/bruker-detaljer/BrukerDetaljerPage';
import { TiltakinstansDetaljerPage } from './component/page/tiltakinstans-detaljer/TiltakinstansDetaljerPage';
import StoreProvider from './store/store-provider';
import { LoginPage } from './component/page/login/LoginPage';
import { Spinner } from './component/felles/spinner/Spinner';
import { checkIsAuthenticated } from './api';
import { TiltakinstansOversiktPage } from './component/page/tiltakinstans-oversikt/TiltakinstansOversiktPage';

export const App = () => {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		checkIsAuthenticated()
			.then((res) => setIsAuthenticated(res.data.isAuthenticated))
			.catch(() => setIsAuthenticated(false))
			.finally(() => setIsLoading(false));
	}, []);

	if (isLoading) {
		return <Spinner/>;
	}

	if (!isAuthenticated) {
		return <LoginPage />;
	}

	return (
		<StoreProvider>
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
