import React from 'react';
import { UserTable } from '../../user-table/UserTable';
import { PaginationBar } from '../../user-table/pagination-bar/PaginationBar';
import { Header } from '../../header/Header';
import styles from './TiltaksoversiktPage.module.less';
import { FilterMenu } from './FilterMenu';
import { mockBrukere } from '../../../mock/data/brukere';

export const TiltaksoversiktPage = () => {
	return (
		<>
			<Header/>
			<main className={styles.tiltaksoversiktPage}>
				<FilterMenu/>
				<div>
					<PaginationBar totalUsers={mockBrukere.length}/>
					<UserTable brukere={mockBrukere} isLoading={false} />
				</div>
			</main>
		</>
	);
}
