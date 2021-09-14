import React, { useEffect, useState } from 'react';
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

export const App = () => {
	const [innloggetAnsatt, setInnloggetAnsatt] = useState<InnloggetAnsatt>();
	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		fetchInnloggetAnsatt()
			.then((res) => setInnloggetAnsatt(res.data))
			.catch(console.error)
			.finally(() => setIsLoading(false));
	}, []);

	if (isLoading) {
		return <Spinner/>;
	}

	if (!innloggetAnsatt) {
		return <LoginPage />;
	}

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
