import constate from 'constate';
import { useState } from 'react';
import { InnloggetAnsatt } from '../domeneobjekter/ansatt';

export const [DataStoreProvider, useDataStore] = constate((props: {initialInnloggetAnsatt: InnloggetAnsatt}) => {
	const [innloggetAnsatt, setInnloggetAnsatt] = useState<InnloggetAnsatt>(props.initialInnloggetAnsatt);

	return {
		innloggetAnsatt,
		setInnloggetAnsatt,
	};
});