import { Alert, BodyLong, BodyShort, Heading, Loader } from '@navikt/ds-react'
import { AxiosResponse } from 'axios'
import React from 'react'

import { Gjennomforing, TiltakGjennomforingStatus } from '../../../api/data/tiltak'
import { fetchTiltakGjennomforing } from '../../../api/tiltak-api'
import globalStyles from '../../../globals.module.scss'
import { dateStrWithMonthName } from '../../../utils/date-utils'
import { isNotStartedOrPending, isRejected, usePromise } from '../../../utils/use-promise'
import { Show } from '../../felles/Show'
import styles from './GjennomforingDetaljerPage.module.scss'
import { KoordinatorInfo } from './KoordinatorInfo'

interface TiltakInfoProps {
	gjennomforingId: string
}

export const TiltakInfo = ({ gjennomforingId }: TiltakInfoProps) => {
	const fetchGjennomforingPromise = usePromise<AxiosResponse<Gjennomforing>>(
		() => fetchTiltakGjennomforing(gjennomforingId), [ gjennomforingId ]
	)

	if (isNotStartedOrPending(fetchGjennomforingPromise)) {
		return <Loader size="2xlarge" className={globalStyles.blokkS} />
	}

	if (isRejected(fetchGjennomforingPromise)) {
		return <Alert variant="error">Noe gikk galt</Alert>
	}

	const gjennomforing = fetchGjennomforingPromise.result.data

	return (
		<div className={globalStyles.blokkM}>
			<Heading size="medium" level="2" className={globalStyles.blokkXxs}>{gjennomforing.navn}</Heading>
			<BodyShort>Organisasjon: {gjennomforing.arrangor.organisasjonNavn?? ''} </BodyShort>
			<BodyShort>Oppstart: {dateStrWithMonthName(gjennomforing.startDato)}</BodyShort>
			<BodyShort className={globalStyles.blokkXxs}>Sluttdato: {dateStrWithMonthName(gjennomforing.sluttDato)}</BodyShort>

			<Show if={gjennomforing.status === TiltakGjennomforingStatus.AVSLUTTET}>
				<Alert variant="warning" className={styles.statusAlert}>
					<strong>Tiltaket er avsluttet</strong>
					<br/>
					<BodyLong>
						Tiltaket er avlyst eller så er avtalen
						utdatert. Er dette feil, ta kontakt med
						den som er ansvarlig for tiltaket  i NAV.
					</BodyLong>
				</Alert>
			</Show>

			<KoordinatorInfo gjennomforingId={gjennomforingId}/>
		</div>
	)
}
