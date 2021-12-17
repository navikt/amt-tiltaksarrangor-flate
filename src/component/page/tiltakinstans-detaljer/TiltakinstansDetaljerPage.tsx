import { AxiosResponse } from 'axios'
import { AlertStripeFeil } from 'nav-frontend-alertstriper'
import { Tilbakeknapp } from 'nav-frontend-ikonknapper'
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi'
import React from 'react'
import { Link, useParams } from 'react-router-dom'

import { fetchDeltakerePaTiltakinstans, fetchTiltakinstans } from '../../../api/tiltak-api'
import { TiltakDeltaker } from '../../../domeneobjekter/deltaker'
import { TiltakInstans } from '../../../domeneobjekter/tiltak'
import globalStyles from '../../../globals.module.less'
import { dateStrWithMonthName } from '../../../utils/date-utils'
import { isNotStartedOrPending, isRejected, usePromise } from '../../../utils/use-promise'
import { Spinner } from '../../felles/spinner/Spinner'
import { DeltakerOversiktTabell } from './deltaker-oversikt/DeltakerOversiktTabell'
import { FilterMeny } from './FilterMeny'
import styles from './TiltakinstansDetaljerPage.module.less'

interface TiltakinstansDetaljerPageRouteParams {
	tiltakinstansId: string;
}

export const TiltakinstansDetaljerPage = (): React.ReactElement => {
	const params = useParams<TiltakinstansDetaljerPageRouteParams>()

	const fetchTiltakinstansPromise = usePromise<AxiosResponse<TiltakInstans>>(
		() => fetchTiltakinstans(params.tiltakinstansId), [ params.tiltakinstansId ]
	)

	const fetchDeltakerePaTiltakinstansPromise = usePromise<AxiosResponse<TiltakDeltaker[]>>(
		() => fetchDeltakerePaTiltakinstans(params.tiltakinstansId), [ params.tiltakinstansId ]
	)

	if (isNotStartedOrPending(fetchTiltakinstansPromise) || isNotStartedOrPending(fetchDeltakerePaTiltakinstansPromise)) {
		return <Spinner/>
	}

	if (isRejected(fetchTiltakinstansPromise) || isRejected(fetchDeltakerePaTiltakinstansPromise)) {
		return <AlertStripeFeil>Noe gikk galt</AlertStripeFeil>
	}

	const tiltakinstans = fetchTiltakinstansPromise.result.data
	const deltakere = fetchDeltakerePaTiltakinstansPromise.result.data

	return (
		<main className={styles.tiltaksoversiktPage} data-testid="tiltaksinstans-detaljer-page">
			<section>
				<Link to="/" className={styles.tilbakeknapp}>
					<Tilbakeknapp />
				</Link>

				<div className={globalStyles.blokkM}>
					<Systemtittel className={globalStyles.blokkXxs}>{tiltakinstans.navn}</Systemtittel>
					<Normaltekst>Oppstart: {dateStrWithMonthName(tiltakinstans.oppstartdato)}</Normaltekst>
					<Normaltekst className={globalStyles.blokkXxs}>Sluttdato: {dateStrWithMonthName(tiltakinstans.sluttdato)}</Normaltekst>
				</div>

				<FilterMeny />
			</section>

			<DeltakerOversiktTabell deltakere={deltakere}/>
		</main>
	)
}
