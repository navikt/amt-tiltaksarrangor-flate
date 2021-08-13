import React from 'react';
import { TiltaksoversiktFilterStoreProvider } from './tiltaksoversikt-filter-store';

interface StoreProviderProps {
	children: React.ReactNode;
}

const StoreProvider = (props: StoreProviderProps) => {
	return (
		<TiltaksoversiktFilterStoreProvider>
			{props.children}
		</TiltaksoversiktFilterStoreProvider>
	);
};

export default StoreProvider;
