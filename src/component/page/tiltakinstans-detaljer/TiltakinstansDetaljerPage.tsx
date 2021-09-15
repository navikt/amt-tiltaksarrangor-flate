import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { fetchDeltakerePaTiltakinstans, fetchTiltakinstans } from '../../../api';
import { Deltaker } from '../../../api/data/bruker';
import { BrukerOversiktTabell } from './bruker-oversikt/BrukerOversiktTabell';
import { FilterMeny } from './FilterMeny';
import styles from './TiltakinstansDetaljerPage.module.less';
import { Spinner } from '../../felles/spinner/Spinner';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { Tiltakinstans } from '../../../api/data/tiltak';
import { dateStrWithMonthName } from '../../../utils/date-utils';
import { EtikettSuksess } from 'nav-frontend-etiketter';

interface TiltakinstansDetaljerPageRouteParams {
	tiltakinstansId: string;
}

export const TiltakinstansDetaljerPage = () => {
	const params = useParams<TiltakinstansDetaljerPageRouteParams>();

	const [tiltakinstans, setTiltakinstans] = useState<Tiltakinstans>();
	const [brukere, setBrukere] = useState<Deltaker[]>([]);

	const [isLoadingDeltakere, setIsLoadingDeltakere] = useState<boolean>(true);
	const [isLoadingTiltakinstans, setIsLoadingTiltakinstans] = useState<boolean>(true);

	useEffect(() => {
		fetchTiltakinstans(params.tiltakinstansId)
			.then(res => setTiltakinstans(res.data))
			.catch(console.error) // TODO: vis feil i alertstripe
			.finally(() => setIsLoadingTiltakinstans(false))

		fetchDeltakerePaTiltakinstans(params.tiltakinstansId)
			.then((res) => setBrukere(res.data))
			.catch(console.error) // TODO: vis feil i alertstripe
			.finally(() => setIsLoadingDeltakere(false));
	}, [params.tiltakinstansId]);

	if (isLoadingDeltakere || isLoadingTiltakinstans) {
		return <Spinner/>;
	}

	if (!tiltakinstans) {
		return <AlertStripeFeil>Noe gikk galt</AlertStripeFeil>;
	}

	const ledigePlasser = tiltakinstans.deltakerKapasitet - tiltakinstans.deltakerAntall;

	return (
		<main className={styles.tiltaksoversiktPage}>
			<section>
				<Link to="/" className={styles.tilbakelenke}>Tilbake</Link>

				<div className="blokk-m">
					<Systemtittel className="blokk-xxs">Jobbkurs(PLACEHOLDER)</Systemtittel>
					<Normaltekst>Oppstart: {dateStrWithMonthName(tiltakinstans.startdato)}</Normaltekst>
					<Normaltekst className="blokk-xxs">Sluttdato: {dateStrWithMonthName(tiltakinstans.sluttdato)}</Normaltekst>

					<EtikettSuksess className="blokk-s">Gjennomføres</EtikettSuksess>

					<Normaltekst className="blokk-xxs">
						Ledige plasser: {ledigePlasser} &nbsp;&nbsp; Totalt: {tiltakinstans.deltakerKapasitet}
					</Normaltekst>
					<Normaltekst>Gruppe AMO(PLACEHOLDER)</Normaltekst>
				</div>

				<FilterMeny />
			</section>

			<section>
				<BrukerOversiktTabell brukere={brukere} isLoading={isLoadingTiltakinstans} />
			</section>
		</main>
	);
};
