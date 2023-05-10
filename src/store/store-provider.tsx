import React from 'react'

import { TilbakelenkeStoreProvider } from './tilbakelenke-store'
import { TiltaksoversiktSokStoreProvider } from './tiltaksoversikt-sok-store'
import { InnloggetBrukerStoreProvider } from './innlogget-bruker-store'
import { KoordinatorsDeltakerlisterStoreProvider } from './koordinators-deltakerlister-store'
import {
	KoordinatorFilterMenyStoreProvider
} from '../component/page/deltakerliste-detaljer/store/koordinator-filter-meny-store-provider'
import { VeilederFilterMenyStoreProvider } from '../component/page/veileder/store/veileder-filter-meny-store-provider'

interface StoreProviderProps {
	children: React.ReactNode;
}

const StoreProvider = (props: StoreProviderProps): React.ReactElement<StoreProviderProps> => {
	return (
		<TiltaksoversiktSokStoreProvider>
			<KoordinatorsDeltakerlisterStoreProvider>
				<KoordinatorFilterMenyStoreProvider>
					<VeilederFilterMenyStoreProvider>
						<InnloggetBrukerStoreProvider>
							<TilbakelenkeStoreProvider>
								{props.children}
							</TilbakelenkeStoreProvider>
						</InnloggetBrukerStoreProvider>
					</VeilederFilterMenyStoreProvider>
				</KoordinatorFilterMenyStoreProvider>
			</KoordinatorsDeltakerlisterStoreProvider>
		</TiltaksoversiktSokStoreProvider>
	)
}

export default StoreProvider
