import constate from 'constate';
import { useState } from 'react';

interface ValgtVirksomhet {
	id: string;
	virksomhetsnavn: string;
	virksomhetsnummer: string;
}

export const [ValgtVirksomhettoreProvider, useValgtVirksomhetStore] = constate(() => {
	const [valgtVirksomhet, setValgtVirksomhet] = useState<ValgtVirksomhet>();

	return {
		valgtVirksomhet,
		setValgtVirksomhet,
	};
});