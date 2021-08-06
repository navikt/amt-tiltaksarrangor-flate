import React from 'react';
import { UserTableHeader } from './header/UserTableHeader';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { UserTableBody } from './body/UserTableBody';
import { mockBrukere } from '../../mock/data/brukere';
import styles from './UserTable.module.less'
import "nav-frontend-tabell-style";

export const UserTable = () => {

	const IngenBrukereAlertstripe = () =>
		<AlertStripeInfo className={styles.ingenBrukere}>
			<span role="alert" aria-live="polite">Fant ingen brukere</span>
		</AlertStripeInfo>

	return (
    	<table className="tabell tabell--stripet">
		    <UserTableHeader />
			{
				mockBrukere.length === 0
					? <IngenBrukereAlertstripe/>
					: <UserTableBody brukere={mockBrukere}/>
			}
		</table>
    );
};
