import React from 'react';
import { TiltaksoversiktPage } from './component/page/tiltaksoversikt/TiltaksoversiktPage';
import StoreProvider from './store/store-provider';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { UserInfoPage } from './component/page/user-info/UserInfoPage';

export const App = () => {
	return (
		<StoreProvider>
			<BrowserRouter>
				<Switch>
					<Route path='/user/:id'><UserInfoPage /></Route>
					<Route path='/'><TiltaksoversiktPage/></Route>
				</Switch>
			</BrowserRouter>		</StoreProvider>

	);
}
