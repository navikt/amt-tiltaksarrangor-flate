import constate from 'constate';
import { useState } from 'react';

import { BrukerSortering } from '../component/page/tiltakinstans-detaljer/bruker-oversikt/types';
import { TiltakStatus } from '../api/data/bruker';

export const [TiltaksoversiktSokStoreProvider, useTiltaksoversiktSokStore] = constate(() => {
	const [navnFnrSok, setNavnFnrSok] = useState<string>('');
	const [tiltakStatusFilter, setTiltakStatusFilter] = useState<TiltakStatus[]>([]);
	const [brukerSortering, setBrukerSortering] = useState<BrukerSortering>();

	const leggTilTiltakStatus = (tiltakStatus: TiltakStatus) => {
		setTiltakStatusFilter((prevStatuser) => {
			if (prevStatuser.includes(tiltakStatus)) {
				return prevStatuser;
			}

			return [...prevStatuser, tiltakStatus];
		});
	};

	const fjernFraTiltakStatus = (tiltakStatus: TiltakStatus) => {
		setTiltakStatusFilter((prevStatuser) => {
			return prevStatuser.filter((status) => status !== tiltakStatus);
		});
	};

	return {
		navnFnrSok,
		setNavnFnrSok,
		tiltakStatusFilter,
		leggTilTiltakStatus,
		fjernFraTiltakStatus,
		brukerSortering,
		setBrukerSortering,
	};
});
