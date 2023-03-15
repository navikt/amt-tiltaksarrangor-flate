import React from 'react'

import { TilbakelenkeStoreProvider } from './tilbakelenke-store'
import { TiltaksoversiktSokStoreProvider } from './tiltaksoversikt-sok-store'
import { InnloggetBrukerStoreProvider } from './innlogget-bruker-store'

interface StoreProviderProps {
	children: React.ReactNode;
}

const StoreProvider = (props: StoreProviderProps): React.ReactElement<StoreProviderProps> => {
	return (
		<TiltaksoversiktSokStoreProvider>
			<InnloggetBrukerStoreProvider>
				<TilbakelenkeStoreProvider>
					{props.children}
				</TilbakelenkeStoreProvider>
			</InnloggetBrukerStoreProvider>
		</TiltaksoversiktSokStoreProvider>
	)
}

export default StoreProvider
