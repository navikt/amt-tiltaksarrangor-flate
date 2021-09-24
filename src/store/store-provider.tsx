import React from 'react';

import { DataStoreProvider } from './data-store';
import { ValgtVirksomhet, ValgtVirksomhettoreProvider } from './valgt-virksomhet-store';
import { TiltaksoversiktSokStoreProvider } from './tiltaksoversikt-sok-store';
import { InnloggetAnsatt } from '../api/data/ansatt';

interface StoreProviderProps {
	innloggetAnsatt: InnloggetAnsatt;
	defaultValgtVirksomhet: ValgtVirksomhet;
	children: React.ReactNode;
}

const StoreProvider = (props: StoreProviderProps) => {
	return (
		<DataStoreProvider initialInnloggetAnsatt={props.innloggetAnsatt}>
			<ValgtVirksomhettoreProvider defaultValgtVirksomhet={props.defaultValgtVirksomhet}>
				<TiltaksoversiktSokStoreProvider>
					{props.children}
				</TiltaksoversiktSokStoreProvider>
			</ValgtVirksomhettoreProvider>
		</DataStoreProvider>
	);
};

export default StoreProvider;
