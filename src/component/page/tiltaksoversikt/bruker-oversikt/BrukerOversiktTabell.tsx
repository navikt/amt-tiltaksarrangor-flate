import 'nav-frontend-tabell-style';

import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import React from 'react';

import { Bruker } from '../../../../api/data/bruker';
import { useTiltaksoversiktSok } from '../../../../store/tiltaksoversikt-sok-store';
import { Show } from '../../../felles/Show';
import { Spinner } from '../../../felles/spinner/Spinner';
import styles from './BrukerOversiktTabell.module.less';
import { TabellBody } from './TabellBody';
import { TabellHeader } from './TabellHeader';

interface UserTableProps {
	brukere: Bruker[];
	isLoading: boolean;
}

export const BrukerOversiktTabell = (props: UserTableProps) => {
	const { brukerSortering, setBrukerSortering } = useTiltaksoversiktSok();
	const harIngenBrukere = props.brukere.length === 0;

	const IngenBrukereAlertstripe = () => (
		<AlertStripeInfo className={styles.ingenBrukere}>
			<span role="alert" aria-live="polite">
				Fant ingen brukere
			</span>
		</AlertStripeInfo>
	);

	return (
		<>
			<table className="tabell tabell--stripet">
				<TabellHeader sortering={brukerSortering} onSortChange={(sort) => setBrukerSortering(sort)} />
				<Show if={!props.isLoading && !harIngenBrukere}>
					<TabellBody brukere={props.brukere} sortering={brukerSortering} />
				</Show>
			</table>
			<Show if={!props.isLoading && harIngenBrukere}>
				<IngenBrukereAlertstripe />
			</Show>
			<Show if={props.isLoading}>
				<Spinner />
			</Show>
		</>
	);
};
