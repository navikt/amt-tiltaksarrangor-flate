import constate from 'constate';
import { useState } from 'react';
import { mockVirksomheter } from '../mock/data/virksomheter';

interface Virksomhet {
	id: string;
	navn: string;
	virksomhetsnummer: string;
}

export const [DataStoreProvider, useDataStore] = constate(() => {
	const [tilgjengeligeVirksomheter, setTilgjengeligeVirksomheter] = useState<Virksomhet[]>(mockVirksomheter);

	return {
		tilgjengeligeVirksomheter,
		setTilgjengeligeVirksomheter,
	};
});