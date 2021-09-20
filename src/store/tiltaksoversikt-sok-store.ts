import constate from 'constate';
import { useState } from 'react';

import { BrukerSortering } from '../component/page/tiltakinstans-detaljer/bruker-oversikt/types';
import { TiltakDeltagerStatus } from '../api/data/deltager';

export const [TiltaksoversiktSokStoreProvider, useTiltaksoversiktSokStore] = constate(() => {
	const [navnFnrSok, setNavnFnrSok] = useState<string>('');
	const [tiltakStatusFilter, setTiltakStatusFilter] = useState<TiltakDeltagerStatus[]>([]);
	const [brukerSortering, setBrukerSortering] = useState<BrukerSortering>();

	const leggTilTiltakStatus = (tiltakStatus: TiltakDeltagerStatus) => {
		setTiltakStatusFilter((prevStatuser) => {
			if (prevStatuser.includes(tiltakStatus)) {
				return prevStatuser;
			}

			return [...prevStatuser, tiltakStatus];
		});
	};

	const fjernFraTiltakStatus = (tiltakStatus: TiltakDeltagerStatus) => {
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
