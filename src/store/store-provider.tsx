import React from 'react'

import { TilbakelenkeStoreProvider } from './tilbakelenke-store'
import { TiltaksoversiktSokStoreProvider } from './tiltaksoversikt-sok-store'

interface StoreProviderProps {
	children: React.ReactNode;
}

const StoreProvider = (props: StoreProviderProps): React.ReactElement<StoreProviderProps> => {
	return (
		<TiltaksoversiktSokStoreProvider>
			<TilbakelenkeStoreProvider>
				{props.children}
			</TilbakelenkeStoreProvider>
		</TiltaksoversiktSokStoreProvider>
	)
}

export default StoreProvider
