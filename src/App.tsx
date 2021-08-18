import React from 'react';
import { TiltaksoversiktPage } from './component/page/tiltaksoversikt/TiltaksoversiktPage';
import StoreProvider from './store/store-provider';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { BrukerDetaljerPage } from './component/page/bruker-detaljer/BrukerDetaljerPage';

export const App = () => {
	return (
		<StoreProvider>
			<BrowserRouter>
				<Switch>
					<Route path="/user/:brukerId">
						<BrukerDetaljerPage />
					</Route>
					<Route path="/">
						<TiltaksoversiktPage />
					</Route>
				</Switch>
			</BrowserRouter>{' '}
		</StoreProvider>
	);
};
