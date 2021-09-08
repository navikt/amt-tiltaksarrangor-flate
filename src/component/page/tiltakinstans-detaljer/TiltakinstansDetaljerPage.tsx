import React, { useEffect, useState } from 'react';

import { fetchTiltakoversikt } from '../../../api';
import { Bruker } from '../../../api/data/bruker';
import { useTiltaksoversiktSok } from '../../../store/tiltaksoversikt-sok-store';
import { BrukerOversiktTabell } from './bruker-oversikt/BrukerOversiktTabell';
import { FilterMeny } from './FilterMeny';
import { Header } from './Header';
import styles from './TiltakinstansDetaljerPage.module.less';

export const TiltakinstansDetaljerPage = () => {
	const { tiltakTypeFilter, tiltakStatusFilter, navnFnrSok, brukerSortering } = useTiltaksoversiktSok();
	const [brukere, setBrukere] = useState<Bruker[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	useEffect(() => {
		// TODO: this must be debounced
		setIsLoading(true);

		fetchTiltakoversikt()
			.then((res) => setBrukere(res.data))
			.catch(console.error) // TODO: vis feil i alertstripe
			.finally(() => setIsLoading(false));
	}, [tiltakTypeFilter, tiltakStatusFilter, navnFnrSok, brukerSortering]);

	return (
		<>
			<Header />
			<main className={styles.tiltaksoversiktPage}>
				<FilterMeny />
				<BrukerOversiktTabell brukere={brukere} isLoading={isLoading} />
			</main>
		</>
	);
};
