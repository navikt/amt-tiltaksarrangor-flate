import React from 'react';
import { UserTableHeader } from './header/UserTableHeader';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { UserTableBody } from './body/UserTableBody';
import styles from './UserTable.module.less'
import "nav-frontend-tabell-style";
import { Bruker } from '../../api/data/bruker';
import { Show } from '../felles/Show';
import { Spinner } from '../felles/spinner/Spinner';
import { useTiltaksoversiktSok } from '../../store/tiltaksoversikt-sok-store';

interface UserTableProps {
	brukere: Bruker[];
	isLoading: boolean;
}

export const UserTable = (props: UserTableProps) => {
	const { userSort, setUserSort } = useTiltaksoversiktSok();
	const harIngenBrukere = props.brukere.length === 0;

	const IngenBrukereAlertstripe = () =>
		<AlertStripeInfo className={styles.ingenBrukere}>
			<span role="alert" aria-live="polite">Fant ingen brukere</span>
		</AlertStripeInfo>

	return (
		<>
			<table className="tabell tabell--stripet">
				<UserTableHeader userSort={userSort} onSortChange={(sort) => setUserSort(sort)} />
				<Show if={!props.isLoading && !harIngenBrukere}>
					<UserTableBody brukere={props.brukere} userSort={userSort}/>
				</Show>
			</table>
			<Show if={!props.isLoading && harIngenBrukere}>
				<IngenBrukereAlertstripe/>
			</Show>
			<Show if={props.isLoading}>
				<Spinner/>
			</Show>
		</>
	);
};
