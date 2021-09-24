import React from 'react';
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
import { isNotStartedOrPending, isRejected, usePromise } from '../../../utils/use-promise';
import { AxiosResponse } from 'axios';

interface TiltakinstansDetaljerPageRouteParams {
	tiltakinstansId: string;
}

export const TiltakinstansDetaljerPage = () => {
	const params = useParams<TiltakinstansDetaljerPageRouteParams>();

	const fetchTiltakinstansPromise = usePromise<AxiosResponse<TiltakInstansDto>>(
		() => fetchTiltakinstans(params.tiltakinstansId), [params.tiltakinstansId]
	);

	const fetchDeltakerePaTiltakinstansPromise = usePromise<AxiosResponse<TiltakDeltagerDto[]>>(
		() => fetchDeltakerePaTiltakinstans(params.tiltakinstansId), [params.tiltakinstansId]
	);

	if (isNotStartedOrPending(fetchTiltakinstansPromise) || isNotStartedOrPending(fetchDeltakerePaTiltakinstansPromise)) {
		return <Spinner/>;
	}

	if (isRejected(fetchTiltakinstansPromise) || isRejected(fetchDeltakerePaTiltakinstansPromise)) {
		return <AlertStripeFeil>Noe gikk galt</AlertStripeFeil>;
	}

	const tiltakinstans = fetchTiltakinstansPromise.result.data;
	const brukere = fetchDeltakerePaTiltakinstansPromise.result.data;

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
				<BrukerOversiktTabell brukere={brukere} />
			</section>
		</main>
	);
};
