import React from 'react'

import { TilbakelenkeStoreProvider } from './tilbakelenke-store'
import { TiltaksoversiktSokStoreProvider } from './tiltaksoversikt-sok-store'
import { InnloggetBrukerStoreProvider } from './innlogget-bruker-store'
import { KoordinatorsDeltakerlisterStoreProvider } from './koordinators-deltakerlister-store'

interface StoreProviderProps {
	children: React.ReactNode;
}

const StoreProvider = (props: StoreProviderProps): React.ReactElement<StoreProviderProps> => {
	return (
		<TiltaksoversiktSokStoreProvider>
			<KoordinatorsDeltakerlisterStoreProvider>
				<InnloggetBrukerStoreProvider>
					<TilbakelenkeStoreProvider>
						{props.children}
					</TilbakelenkeStoreProvider>
				</InnloggetBrukerStoreProvider>
			</KoordinatorsDeltakerlisterStoreProvider>
		</TiltaksoversiktSokStoreProvider>
	)
}

export default StoreProvider
