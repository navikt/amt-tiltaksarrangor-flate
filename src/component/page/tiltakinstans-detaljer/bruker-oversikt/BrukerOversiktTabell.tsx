import React, { useEffect, useState } from 'react';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { Deltaker } from '../../../../api/data/bruker';
import { useTiltaksoversiktSokStore } from '../../../../store/tiltaksoversikt-sok-store';
import { Spinner } from '../../../felles/spinner/Spinner';
import { TabellBody } from './TabellBody';
import { TabellHeader } from './TabellHeader';
import { filtrerBrukere } from '../../../../utils/filtrering-utils';
import styles from './BrukerOversiktTabell.module.less';
import 'nav-frontend-tabell-style';

interface UserTableProps {
	brukere: Deltaker[];
	isLoading: boolean;
}

const IngenBrukereAlertstripe = () => (
	<AlertStripeInfo className={styles.ingenBrukere}>
			<span role="alert" aria-live="polite">
				Fant ingen brukere
			</span>
	</AlertStripeInfo>
);

export const BrukerOversiktTabell = (props: UserTableProps) => {
	const { brukerSortering, setBrukerSortering, tiltakStatusFilter, navnFnrSok} = useTiltaksoversiktSokStore();
	const brukereFiltrert = () => filtrerBrukere(props.brukere, tiltakStatusFilter, navnFnrSok);
	const [filtrerteBrukere, setFiltrerteBrukere] = useState<Deltaker[]>(brukereFiltrert);
	const harIngenBrukere = filtrerteBrukere.length === 0;

	useEffect(() => {
		setFiltrerteBrukere(brukereFiltrert());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.brukere, tiltakStatusFilter, navnFnrSok]);

	if (props.isLoading) {
		return <Spinner/>;
	}

	if (harIngenBrukere) {
		return <IngenBrukereAlertstripe/>;
	}

	return (
		<table className="tabell tabell--stripet">
			<TabellHeader sortering={brukerSortering} onSortChange={(sort) => setBrukerSortering(sort)} />
			<TabellBody brukere={filtrerteBrukere} sortering={brukerSortering} />
		</table>
	);
};
