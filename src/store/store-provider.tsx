import React from 'react';

import { TiltaksoversiktSokStoreProvider } from './tiltaksoversikt-sok-store';

interface StoreProviderProps {
	children: React.ReactNode;
}

const StoreProvider = (props: StoreProviderProps) => {
	return <TiltaksoversiktSokStoreProvider>{props.children}</TiltaksoversiktSokStoreProvider>;
};

export default StoreProvider;
