import React from 'react';

import { DataStoreProvider } from './data-store';
import { ValgtVirksomhettoreProvider } from './valgt-virksomhet-store';
import { TiltaksoversiktSokStoreProvider } from './tiltaksoversikt-sok-store';

interface StoreProviderProps {
	children: React.ReactNode;
}

const StoreProvider = (props: StoreProviderProps) => {
	return (
		<DataStoreProvider>
			<ValgtVirksomhettoreProvider>
				<TiltaksoversiktSokStoreProvider>
					{props.children}
				</TiltaksoversiktSokStoreProvider>
			</ValgtVirksomhettoreProvider>
		</DataStoreProvider>
	);
};

export default StoreProvider;
