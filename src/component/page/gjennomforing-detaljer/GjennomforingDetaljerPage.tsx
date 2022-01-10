import { AxiosResponse } from 'axios'
import { AlertStripeFeil } from 'nav-frontend-alertstriper'
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi'
import React from 'react'
import { useParams } from 'react-router-dom'

import { fetchDeltakerePaTiltakGjennomforing, fetchTiltakGjennomforing } from '../../../api/tiltak-api'
import { TiltakDeltaker } from '../../../domeneobjekter/deltaker'
import { Gjennomforing } from '../../../domeneobjekter/tiltak'
import globalStyles from '../../../globals.module.less'
import { dateStrWithMonthName } from '../../../utils/date-utils'
import { isNotStartedOrPending, isRejected, usePromise } from '../../../utils/use-promise'
import { Spinner } from '../../felles/spinner/Spinner'
import { Tilbakeknapp } from '../../felles/tilbakeknapp/Tilbakeknapp'
import { DeltakerOversiktTabell } from './deltaker-oversikt/DeltakerOversiktTabell'
import { FilterMeny } from './FilterMeny'
import styles from './GjennomforingDetaljerPage.module.less'

interface GjennomforingDetaljerPageRouteParams {
	gjennomforingId: string;
}

export const GjennomforingDetaljerPage = (): React.ReactElement => {
	const params = useParams<GjennomforingDetaljerPageRouteParams>()

	const fetchGjennomforingPromise = usePromise<AxiosResponse<Gjennomforing>>(
		() => fetchTiltakGjennomforing(params.gjennomforingId), [ params.gjennomforingId ]
	)

	const fetchDeltakerePaGjennomforingPromise = usePromise<AxiosResponse<TiltakDeltaker[]>>(
		() => fetchDeltakerePaTiltakGjennomforing(params.gjennomforingId), [ params.gjennomforingId ]
	)

	if (isNotStartedOrPending(fetchGjennomforingPromise) || isNotStartedOrPending(fetchDeltakerePaGjennomforingPromise)) {
		return <Spinner/>
	}

	if (isRejected(fetchGjennomforingPromise) || isRejected(fetchDeltakerePaGjennomforingPromise)) {
		return <AlertStripeFeil>Noe gikk galt</AlertStripeFeil>
	}

	const gjennomforing = fetchGjennomforingPromise.result.data
	const deltakere = fetchDeltakerePaGjennomforingPromise.result.data

	return (
		<main className={styles.tiltaksoversiktPage} data-testid="gjennomforing-detaljer-page">
			<section>
				<Tilbakeknapp to="/" className={styles.tilbakeknapp} />

				<div className={globalStyles.blokkM}>
					<Systemtittel className={globalStyles.blokkXxs}>{gjennomforing.navn}</Systemtittel>
					<Normaltekst>Oppstart: {dateStrWithMonthName(gjennomforing.oppstartdato)}</Normaltekst>
					<Normaltekst className={globalStyles.blokkXxs}>Sluttdato: {dateStrWithMonthName(gjennomforing.sluttdato)}</Normaltekst>
				</div>

				<FilterMeny />
			</section>

			<DeltakerOversiktTabell deltakere={deltakere}/>
		</main>
	)
}
