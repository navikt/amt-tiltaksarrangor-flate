import React from 'react';

import { DataStoreProvider } from './data-store';
import { ValgtVirksomhettoreProvider } from './valgt-virksomhet-store';
import { TiltaksoversiktSokStoreProvider } from './tiltaksoversikt-sok-store';
import { InnloggetAnsatt } from '../api/data/ansatt';

interface StoreProviderProps {
	innloggetAnsatt: InnloggetAnsatt;
	children: React.ReactNode;
}

const StoreProvider = (props: StoreProviderProps) => {
	return (
		<DataStoreProvider initialInnloggetAnsatt={props.innloggetAnsatt}>
			<ValgtVirksomhettoreProvider>
				<TiltaksoversiktSokStoreProvider>
					{props.children}
				</TiltaksoversiktSokStoreProvider>
			</ValgtVirksomhettoreProvider>
		</DataStoreProvider>
	);
};

export default StoreProvider;
