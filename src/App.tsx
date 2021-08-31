import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { BrukerDetaljerPage } from './component/page/bruker-detaljer/BrukerDetaljerPage';
import { TiltaksoversiktPage } from './component/page/tiltaksoversikt/TiltaksoversiktPage';
import StoreProvider from './store/store-provider';
import { LoginPage } from './component/page/login/LoginPage';
import { Spinner } from './component/felles/spinner/Spinner';
import { checkIsAuthenticated } from './api';

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

	return (
		<StoreProvider>
			<BrowserRouter>
				<Switch>
					<Route path="/user/:brukerId">
						<BrukerDetaljerPage />
					</Route>

					<Route path="/">
						{isAuthenticated
							? <TiltaksoversiktPage />
							: <LoginPage />
						}
					</Route>
				</Switch>
			</BrowserRouter>
		</StoreProvider>
	);
};
