import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { fetchDeltakerePaTiltakinstans, fetchTiltakinstans } from '../../../api';
import { Bruker } from '../../../api/data/bruker';
import { BrukerOversiktTabell } from './bruker-oversikt/BrukerOversiktTabell';
import { FilterMeny } from './FilterMeny';
import styles from './TiltakinstansDetaljerPage.module.less';
import { Spinner } from '../../felles/spinner/Spinner';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { Tiltakinstans } from '../../../api/data/tiltak';

interface TiltakinstansDetaljerPageRouteParams {
	tiltakinstansId: string;
}

export const TiltakinstansDetaljerPage = () => {
	const params = useParams<TiltakinstansDetaljerPageRouteParams>();

	const [tiltakinstans, setTiltakinstans] = useState<Tiltakinstans>();
	const [brukere, setBrukere] = useState<Bruker[]>([]);

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

	return (
		<main className={styles.tiltaksoversiktPage}>
			<section>
				<Link to="/" className="blokk-m">Tilbake</Link>

				<div className="blokk-m">
					<Systemtittel>PLACEHOLDER</Systemtittel>
					<Normaltekst>Start dato: {tiltakinstans.startdato}</Normaltekst>
					<Normaltekst>Slutt dato: {tiltakinstans.sluttdato}</Normaltekst>
				</div>

				<FilterMeny />
			</section>

			<BrukerOversiktTabell brukere={brukere} isLoading={isLoadingTiltakinstans} />
		</main>
	);
};
