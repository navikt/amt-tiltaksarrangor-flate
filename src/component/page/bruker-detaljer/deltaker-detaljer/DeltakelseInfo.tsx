import { Alert, BodyShort } from '@navikt/ds-react'
import React, { useState } from 'react'

import { DeltakerStatus, TiltakDeltakerDetaljer, TiltakDeltakerStatus } from '../../../../api/data/deltaker'
import { formatDate } from '../../../../utils/date-utils'
import { Nullable } from '../../../../utils/types/or-nothing'
import { StatusMerkelapp } from '../../../felles/status-merkelapp/StatusMerkelapp'
import styles from './DeltakelseInfo.module.scss'
import { ElementPanel } from './ElementPanel'
import { EndreDeltakelseKnapp } from './EndreDeltakelseKnapp'
import { Endringsmeldinger } from './endringsmelding/Endringsmeldinger'

interface DeltakelseInfoProps {
	erSkjermetPerson: boolean
	deltaker: TiltakDeltakerDetaljer
	status: DeltakerStatus
	fjernesDato: Nullable<Date>
}

export const DeltakelseInfo = ({
	erSkjermetPerson,
	deltaker,
	status,
	fjernesDato
}: DeltakelseInfoProps): React.ReactElement => {
	const [ key, setKey ] = useState<number>(0)
	const reInstansierEndringsmeldinger = () => {
		setKey((pk) => pk+1)
	}

	return (
		<div className={styles.wrapper}>
			<div className={styles.section}>
				<ElementPanel tittel="Status:" className={styles.margin}>
					<StatusMerkelapp status={status}/>
				</ElementPanel>
				<ElementPanel tittel="Dato:">
					<BodyShort size="small" >{formatDate(deltaker.startDato)} - {formatDate(deltaker.sluttDato)}</BodyShort>
				</ElementPanel>

				<Endringsmeldinger deltakerId={deltaker.id} key={key}/>

				{ erIkkeAktuellEllerHarSluttet(status.type) &&
                    <Alert variant="warning" size="small">Deltakeren fjernes fra listen {formatDate(fjernesDato)}</Alert>}
			</div>
			<EndreDeltakelseKnapp disabled={erSkjermetPerson} deltaker={deltaker} onEndringUtfort={reInstansierEndringsmeldinger}/>
		</div>
	)
}

const erIkkeAktuellEllerHarSluttet = (status: TiltakDeltakerStatus): boolean =>
	[ TiltakDeltakerStatus.IKKE_AKTUELL, TiltakDeltakerStatus.HAR_SLUTTET ].includes(status)
