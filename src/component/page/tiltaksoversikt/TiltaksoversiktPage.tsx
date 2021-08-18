import React, { useEffect, useState } from 'react';

import { brukerSok } from '../../../api';
import { Bruker } from '../../../api/data/bruker';
import { BrukerSokParams } from '../../../api/data/request-types';
import { useTiltaksoversiktSok } from '../../../store/tiltaksoversikt-sok-store';
import { SorteringType } from '../../../utils/sortering-utils';
import { BrukerOversiktTabell } from './bruker-oversikt/BrukerOversiktTabell';
import { FilterMeny } from './FilterMeny';
import { Header } from './Header';
import { PaginationBar } from './paginering/PaginationBar';
import styles from './TiltaksoversiktPage.module.less';

export const TiltaksoversiktPage = () => {
	const { tiltakTyper, tiltakStatuser, navnFnrSok, brukerSortering } = useTiltaksoversiktSok();
	const [brukere, setBrukere] = useState<Bruker[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	useEffect(() => {
		// TODO: this must be debounced
		setIsLoading(true);

		const sokParams: BrukerSokParams = {
			filter: {
				navnFnrSok,
				tiltakTyper,
				tiltakStatuser,
			},
			sortering:
				brukerSortering && brukerSortering.sorteringType !== SorteringType.NONE
					? { kolonnenavn: brukerSortering.kolonnenavn, sorteringType: brukerSortering.sorteringType }
					: undefined,
		};

		brukerSok(sokParams)
			.then((res) => setBrukere(res.data))
			.catch(console.error) // TODO: vis feil i alertstripe
			.finally(() => setIsLoading(false));
	}, [tiltakTyper, tiltakStatuser, navnFnrSok, brukerSortering]);

	return (
		<>
			<Header />
			<main className={styles.tiltaksoversiktPage}>
				<FilterMeny />
				<div>
					<PaginationBar totalUsers={brukere.length} />
					<BrukerOversiktTabell brukere={brukere} isLoading={isLoading} />
				</div>
			</main>
		</>
	);
};
