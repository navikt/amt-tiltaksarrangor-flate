import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { fetchDeltakerePaTiltakinstans, fetchTiltakinstans } from '../../../api';
import { BrukerOversiktTabell } from './bruker-oversikt/BrukerOversiktTabell';
import { FilterMeny } from './FilterMeny';
import styles from './TiltakinstansDetaljerPage.module.less';
import { Spinner } from '../../felles/spinner/Spinner';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { dateStrWithMonthName } from '../../../utils/date-utils';
import { TiltakInstansDto } from '../../../api/data/tiltak';
import { TiltakDeltagerDto } from '../../../api/data/deltager';
import { mapTiltakInstansStatusTilEtikett } from '../../../utils/text-mappers';

interface TiltakinstansDetaljerPageRouteParams {
	tiltakinstansId: string;
}

export const TiltakinstansDetaljerPage = () => {
	const params = useParams<TiltakinstansDetaljerPageRouteParams>();

	const [tiltakinstans, setTiltakinstans] = useState<TiltakInstansDto>();
	const [brukere, setBrukere] = useState<TiltakDeltagerDto[]>([]);

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

	const ledigePlasser = tiltakinstans.deltagerKapasitet - tiltakinstans.deltagerAntall;

	return (
		<main className={styles.tiltaksoversiktPage}>
			<section>
				<Link to="/" className={styles.tilbakelenke}>Tilbake</Link>

				<div className="blokk-m">
					<Systemtittel className="blokk-xxs">{tiltakinstans.navn}</Systemtittel>
					<Normaltekst>Oppstart: {dateStrWithMonthName(tiltakinstans.startdato)}</Normaltekst>
					<Normaltekst className="blokk-xxs">Sluttdato: {dateStrWithMonthName(tiltakinstans.sluttdato)}</Normaltekst>

					{mapTiltakInstansStatusTilEtikett(tiltakinstans.status)}

					<Normaltekst className="blokk-xxs">
						Ledige plasser: {ledigePlasser} &nbsp;&nbsp; Totalt: {tiltakinstans.deltagerKapasitet}
					</Normaltekst>
					<Normaltekst>{tiltakinstans.tiltak.tiltaksnavn}</Normaltekst>
				</div>

				<FilterMeny />
			</section>

			<section>
				<BrukerOversiktTabell brukere={brukere} isLoading={isLoadingTiltakinstans} />
			</section>
		</main>
	);
};
