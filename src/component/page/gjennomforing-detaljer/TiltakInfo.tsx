import { Alert, BodyLong, BodyShort, Heading } from '@navikt/ds-react'
import React from 'react'

import { Gjennomforing, TiltakGjennomforingStatus } from '../../../api/data/tiltak'
import globalStyles from '../../../globals.module.scss'
import { dateStrWithMonthName } from '../../../utils/date-utils'
import { Show } from '../../felles/Show'
import styles from './GjennomforingDetaljerPage.module.scss'

interface TiltakInfoProps {
	gjennomforing: Gjennomforing
}

export const TiltakInfo = ({ gjennomforing }: TiltakInfoProps) => {
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
		</div>
	)
}
