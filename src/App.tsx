import React from 'react';
import { TiltaksoversiktPage } from './component/page/tiltaksoversikt/TiltaksoversiktPage';
import StoreProvider from './store/store-provider';

export const App = () => {
	return (
		<StoreProvider>
			<TiltaksoversiktPage/>
		</StoreProvider>
	);
}
