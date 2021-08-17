import React from 'react';
import { Header } from './Header';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { TabellBody } from './TabellBody';
import { Bruker } from '../../../../api/data/bruker';
import { Show } from '../../../felles/Show';
import { Spinner } from '../../../felles/spinner/Spinner';
import styles from './BrukerOversikt.module.less'
import "nav-frontend-tabell-style";


interface UserTableProps {
	brukere: Bruker[];
	isLoading: boolean;
}

export const BrukerOversikt = (props: UserTableProps) => {
	const harIngenBrukere = props.brukere.length === 0;

	const IngenBrukereAlertstripe = () =>
		<AlertStripeInfo className={styles.ingenBrukere}>
			<span role="alert" aria-live="polite">Fant ingen brukere</span>
		</AlertStripeInfo>

	return (
		<>
			<table className="tabell tabell--stripet">
				<Header/>
				<Show if={!props.isLoading && !harIngenBrukere}>
					<TabellBody brukere={props.brukere}/>
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
