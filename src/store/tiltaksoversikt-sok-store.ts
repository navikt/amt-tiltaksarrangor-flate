import { useState } from 'react';
import constate from 'constate';
import { TiltakStatus, TiltakType } from '../api/data/bruker';
import { UserSort } from '../component/page/tiltaksoversikt/bruker-oversikt/TabellHeader';

export const [TiltaksoversiktSokStoreProvider, useTiltaksoversiktSok] = constate(() => {
	const [navnFnrSok, setNavnFnrSok] = useState<string>('');
	const [tiltakTyper, setTiltakTyper] = useState<TiltakType[]>([]);
	const [tiltakStatuser, setTiltakStatuser] = useState<TiltakStatus[]>([]);
	const [userSort, setUserSort] = useState<UserSort>();

	const leggTilTiltakType = (tiltakType: TiltakType) => {
		setTiltakTyper(prevTyper => {
			if (prevTyper.includes(tiltakType)) {
				return prevTyper;
			}

			return [...prevTyper, tiltakType];
		});
	};

	const fjernTilTiltakType = (tiltakType: TiltakType) => {
		setTiltakTyper(prevTyper => {
			return prevTyper.filter((type) => type !== tiltakType);
		});
	};

	const leggTilTiltakStatus = (tiltakStatus: TiltakStatus) => {
		setTiltakStatuser(prevStatuser => {
			if (prevStatuser.includes(tiltakStatus)) {
				return prevStatuser;
			}

			return [...prevStatuser, tiltakStatus];
		});
	};

	const fjernTilTiltakStatus = (tiltakStatus: TiltakStatus) => {
		setTiltakStatuser(prevStatuser => {
			return prevStatuser.filter((status) => status !== tiltakStatus);
		});
	};

	return {
		navnFnrSok, setNavnFnrSok,
		tiltakTyper, leggTilTiltakType, fjernTilTiltakType,
		tiltakStatuser, leggTilTiltakStatus, fjernTilTiltakStatus,
		userSort, setUserSort
	};
});
