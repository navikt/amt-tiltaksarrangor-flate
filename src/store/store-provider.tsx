import React from 'react'

import { AuthStoreProvider } from './data-store'
import { TiltaksoversiktSokStoreProvider } from './tiltaksoversikt-sok-store'

interface StoreProviderProps {
	children: React.ReactNode;
}

const StoreProvider = (props: StoreProviderProps): React.ReactElement<StoreProviderProps> => {
	return (
		<AuthStoreProvider>
			<TiltaksoversiktSokStoreProvider>
				{props.children}
			</TiltaksoversiktSokStoreProvider>
		</AuthStoreProvider>
	)
}

export default StoreProvider
