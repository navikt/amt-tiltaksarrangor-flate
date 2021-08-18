import React from 'react';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { Bruker } from '../../../../api/data/bruker';
import { Show } from '../../../felles/Show';
import { Spinner } from '../../../felles/spinner/Spinner';
import styles from './BrukerOversiktTabell.module.less'
import "nav-frontend-tabell-style";
import { useTiltaksoversiktSok } from '../../../../store/tiltaksoversikt-sok-store';
import { TabellHeader } from './TabellHeader';
import { TabellBody } from './TabellBody';

interface UserTableProps {
	brukere: Bruker[];
	isLoading: boolean;
}

export const BrukerOversiktTabell = (props: UserTableProps) => {
	const { brukerSortering, setBrukerSortering } = useTiltaksoversiktSok();
	const harIngenBrukere = props.brukere.length === 0;

	const IngenBrukereAlertstripe = () =>
		<AlertStripeInfo className={styles.ingenBrukere}>
			<span role="alert" aria-live="polite">Fant ingen brukere</span>
		</AlertStripeInfo>

	return (
		<>
			<table className="tabell tabell--stripet">
				<TabellHeader sortering={brukerSortering} onSortChange={(sort) => setBrukerSortering(sort)} />
				<Show if={!props.isLoading && !harIngenBrukere}>
					<TabellBody brukere={props.brukere} sortering={brukerSortering}/>
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
