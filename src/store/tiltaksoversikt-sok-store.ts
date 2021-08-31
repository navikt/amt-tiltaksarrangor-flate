import constate from 'constate';
import { useState } from 'react';

import { TiltakStatus, TiltakType } from '../api/data/bruker';
import { BrukerSortering } from '../component/page/tiltaksoversikt/bruker-oversikt/types';

export const [TiltaksoversiktSokStoreProvider, useTiltaksoversiktSok] = constate(() => {
	const [navnFnrSok, setNavnFnrSok] = useState<string>('');
	const [tiltakTypeFilter, setTiltakTypeFilter] = useState<TiltakType[]>([]);
	const [tiltakStatusFilter, setTiltakStatusFilter] = useState<TiltakStatus[]>([]);
	const [brukerSortering, setBrukerSortering] = useState<BrukerSortering>();

	const leggTilTiltakFilter = (tiltakType: TiltakType) => {
		setTiltakTypeFilter((prevTyper) => {
			if (prevTyper.includes(tiltakType)) {
				return prevTyper;
			}

			return [...prevTyper, tiltakType];
		});
	};

	const fjernTilTiltakFilter = (tiltakType: TiltakType) => {
		setTiltakTypeFilter((prevTyper) => {
			return prevTyper.filter((type) => type !== tiltakType);
		});
	};

	const leggTilTiltakStatus = (tiltakStatus: TiltakStatus) => {
		setTiltakStatusFilter((prevStatuser) => {
			if (prevStatuser.includes(tiltakStatus)) {
				return prevStatuser;
			}

			return [...prevStatuser, tiltakStatus];
		});
	};

	const fjernTilTiltakStatus = (tiltakStatus: TiltakStatus) => {
		setTiltakStatusFilter((prevStatuser) => {
			return prevStatuser.filter((status) => status !== tiltakStatus);
		});
	};

	return {
		navnFnrSok,
		setNavnFnrSok,
		tiltakTypeFilter,
		leggTilTiltakFilter,
		fjernTilTiltakFilter,
		tiltakStatusFilter,
		leggTilTiltakStatus,
		fjernTilTiltakStatus,
		brukerSortering,
		setBrukerSortering,
	};
});
