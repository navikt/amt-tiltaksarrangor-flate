import React, { useEffect, useState } from 'react';
import { UserTable } from '../../user-table/UserTable';
import { PaginationBar } from '../../user-table/pagination-bar/PaginationBar';
import { Header } from '../../header/Header';
import styles from './TiltaksoversiktPage.module.less';
import { FilterMenu } from './FilterMenu';
import { Bruker } from '../../../api/data/bruker';
import { useTiltaksoversiktFilter } from '../../../store/tiltaksoversikt-filter-store';
import { brukerSok } from '../../../api';

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
				<FilterMenu/>
				<div>
					<PaginationBar totalUsers={brukere.length}/>
					<UserTable brukere={brukere} isLoading={isLoading} />
				</div>
			</main>
		</>
	);
}
