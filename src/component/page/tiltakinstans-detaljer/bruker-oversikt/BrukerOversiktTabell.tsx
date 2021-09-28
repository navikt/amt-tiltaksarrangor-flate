import React, { useEffect, useState } from 'react';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { useTiltaksoversiktSokStore } from '../../../../store/tiltaksoversikt-sok-store';
import { TabellBody } from './TabellBody';
import { TabellHeader } from './TabellHeader';
import { filtrerBrukere } from '../../../../utils/filtrering-utils';
import styles from './BrukerOversiktTabell.module.less';
import 'nav-frontend-tabell-style';
import { TiltakDeltager } from '../../../../domeneobjekter/deltager';

interface BrukerOversiktTabellProps {
	brukere: TiltakDeltager[];
}

const IngenBrukereAlertstripe = () => (
	<AlertStripeInfo className={styles.ingenBrukere}>
			<span role="alert" aria-live="polite">
				Fant ingen brukere
			</span>
	</AlertStripeInfo>
);

export const BrukerOversiktTabell = (props: BrukerOversiktTabellProps) => {
	const { brukerSortering, setBrukerSortering, tiltakStatusFilter, navnFnrSok} = useTiltaksoversiktSokStore();
	const brukereFiltrert = () => filtrerBrukere(props.brukere, tiltakStatusFilter, navnFnrSok);
	const [filtrerteBrukere, setFiltrerteBrukere] = useState<TiltakDeltager[]>(brukereFiltrert);
	const harIngenBrukere = filtrerteBrukere.length === 0;

	useEffect(() => {
		setFiltrerteBrukere(brukereFiltrert());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.brukere, tiltakStatusFilter, navnFnrSok]);

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
