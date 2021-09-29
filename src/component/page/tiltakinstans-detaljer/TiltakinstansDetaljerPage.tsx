import React from 'react';
import { Link, useParams } from 'react-router-dom';

import { fetchDeltakerePaTiltakinstans, fetchTiltakinstans } from '../../../api/tiltak-api';
import { BrukerOversiktTabell } from './bruker-oversikt/BrukerOversiktTabell';
import { FilterMeny } from './FilterMeny';
import styles from './TiltakinstansDetaljerPage.module.less';
import { Spinner } from '../../felles/spinner/Spinner';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { dateStrWithMonthName } from '../../../utils/date-utils';
import { mapTiltakInstansStatusTilEtikett } from '../../../utils/text-mappers';
import { isNotStartedOrPending, isRejected, usePromise } from '../../../utils/use-promise';
import { AxiosResponse } from 'axios';
import { TiltakInstans } from '../../../domeneobjekter/tiltak';
import { TiltakDeltager } from '../../../domeneobjekter/deltager';
import globalStyles from '../../../globals.module.less';

interface TiltakinstansDetaljerPageRouteParams {
	tiltakinstansId: string;
}

export const TiltakinstansDetaljerPage = () => {
	const params = useParams<TiltakinstansDetaljerPageRouteParams>();

	const fetchTiltakinstansPromise = usePromise<AxiosResponse<TiltakInstans>>(
		() => fetchTiltakinstans(params.tiltakinstansId), [params.tiltakinstansId]
	);

	const fetchDeltakerePaTiltakinstansPromise = usePromise<AxiosResponse<TiltakDeltager[]>>(
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

				<div className={globalStyles.blokkM}>
					<Systemtittel className={globalStyles.blokkXxs}>{tiltakinstans.navn}</Systemtittel>
					<Normaltekst>Oppstart: {dateStrWithMonthName(tiltakinstans.startdato)}</Normaltekst>
					<Normaltekst className={globalStyles.blokkXxs}>Sluttdato: {dateStrWithMonthName(tiltakinstans.sluttdato)}</Normaltekst>

					<div className={globalStyles.blokkXxs}>
						{mapTiltakInstansStatusTilEtikett(tiltakinstans.status)}
					</div>

					<Normaltekst className={globalStyles.blokkXxs}>
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
