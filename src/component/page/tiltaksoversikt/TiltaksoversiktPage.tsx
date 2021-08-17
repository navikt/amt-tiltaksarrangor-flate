import React, { useEffect, useState } from 'react';
import { BrukerOversikt } from './bruker-oversikt/BrukerOversikt';
import { PaginationBar } from './paginering/PaginationBar';
import { Header } from './Header';
import { FilterMeny } from './FilterMeny';
import { Bruker } from '../../../api/data/bruker';
import { useTiltaksoversiktFilter } from '../../../store/tiltaksoversikt-filter-store';
import { brukerSok } from '../../../api';
import styles from './TiltaksoversiktPage.module.less';

export const TiltaksoversiktPage = () => {
	const { tiltakTyper, tiltakStatuser, navnFnrSok } = useTiltaksoversiktFilter();
	const [brukere, setBrukere] = useState<Bruker[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	useEffect(() => {
		// TODO: this must be debounced
		setIsLoading(true);

		const sokParams = {
			filter: {
				navnFnrSok,
				tiltakTyper,
				tiltakStatuser
			}
		};

		brukerSok(sokParams)
			.then(res => setBrukere(res.data))
			.catch(console.error) // TODO: vis feil i alertstripe
			.finally(() => setIsLoading(false));
	}, [tiltakTyper, tiltakStatuser, navnFnrSok]);

	return (
		<>
			<Header/>
			<main className={styles.tiltaksoversiktPage}>
				<FilterMeny/>
				<div>
					<PaginationBar totalUsers={brukere.length}/>
					<BrukerOversikt brukere={brukere} isLoading={isLoading} />
				</div>
			</main>
		</>
	);
}
