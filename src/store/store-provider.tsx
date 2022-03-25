import React from 'react'

import { InnloggetAnsatt } from '../api/data/ansatt'
import { DataStoreProvider } from './data-store'
import { TiltaksoversiktSokStoreProvider } from './tiltaksoversikt-sok-store'

interface StoreProviderProps {
	innloggetAnsatt: InnloggetAnsatt;
	children: React.ReactNode;
}

const StoreProvider = (props: StoreProviderProps): React.ReactElement<StoreProviderProps> => {
	return (
		<DataStoreProvider initialInnloggetAnsatt={props.innloggetAnsatt}>
			<TiltaksoversiktSokStoreProvider>
				{props.children}
			</TiltaksoversiktSokStoreProvider>
		</DataStoreProvider>
	)
}

export default StoreProvider
