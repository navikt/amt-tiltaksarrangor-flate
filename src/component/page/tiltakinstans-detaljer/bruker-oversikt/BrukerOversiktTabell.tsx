import React, { useEffect, useState } from 'react';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { Bruker } from '../../../../api/data/bruker';
import { useTiltaksoversiktSok } from '../../../../store/tiltaksoversikt-sok-store';
import { Show } from '../../../felles/Show';
import { Spinner } from '../../../felles/spinner/Spinner';
import { TabellBody } from './TabellBody';
import { TabellHeader } from './TabellHeader';
import { filtrerBrukere } from '../../../../utils/filtrering-utils';
import styles from './BrukerOversiktTabell.module.less';
import 'nav-frontend-tabell-style';

interface UserTableProps {
	brukere: Bruker[];
	isLoading: boolean;
}

export const BrukerOversiktTabell = (props: UserTableProps) => {
	const { brukerSortering, setBrukerSortering, tiltakStatusFilter, navnFnrSok} = useTiltaksoversiktSok();
	const brukereFiltrert = () => filtrerBrukere(props.brukere, tiltakStatusFilter, navnFnrSok);
	const [filtrerteBrukere, setFiltrerteBrukere] = useState<Bruker[]>(brukereFiltrert);
	const harIngenBrukere = filtrerteBrukere.length === 0;

	useEffect(() => {
		setFiltrerteBrukere(brukereFiltrert());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.brukere, tiltakStatusFilter, navnFnrSok]);

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
					<TabellBody brukere={filtrerteBrukere} sortering={brukerSortering} />
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
