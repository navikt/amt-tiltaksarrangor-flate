import { Alert, BodyLong, BodyShort } from '@navikt/ds-react'
import cls from 'classnames'
import React from 'react'

import { Gjennomforing, TiltakGjennomforingStatus } from '../../../api/data/tiltak'
import globalStyles from '../../../globals.module.scss'
import { dateStrWithMonthName } from '../../../utils/date-utils'
import { Show } from '../../felles/Show'
import styles from './GjennomforingDetaljerPage.module.scss'

interface TiltakInfoProps {
	gjennomforing: Gjennomforing
	className?: string
}

export const TiltakInfo = ({ gjennomforing, className }: TiltakInfoProps) => {
	return (
		<div className={className}>
			<BodyShort size="small" className={styles.textXs}>{gjennomforing.tiltak.tiltaksnavn}</BodyShort>
			<BodyShort size="small" className={styles.textXs}>{dateStrWithMonthName(gjennomforing.startDato)} - {dateStrWithMonthName(gjennomforing.sluttDato)}</BodyShort>
			<BodyShort size="small" className={cls(styles.textXs, globalStyles.blokkXxs)}>
				{gjennomforing.arrangor.organisasjonNavn ?? gjennomforing.arrangor.virksomhetNavn}
			</BodyShort>

			<Show if={gjennomforing.status === TiltakGjennomforingStatus.AVSLUTTET}>
				<Alert variant="warning" className={styles.statusAlert}>
					<strong>Tiltaket er avsluttet</strong>
					<br />
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
