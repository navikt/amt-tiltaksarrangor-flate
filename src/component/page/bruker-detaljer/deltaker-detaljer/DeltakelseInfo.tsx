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
	const [ reloadEndringsmeldinger, setReloadEndringsmeldinger ] = useState(true)

	const triggerReloadEndringsmeldinger = () => {
		setReloadEndringsmeldinger(true)
	}

	return (
		<div className={styles.wrapper}>
			<div className={styles.section}>
				<div className={styles.header}>
					<ElementPanel tittel="Status:" className={styles.margin}>
						<StatusMerkelapp status={status} />
					</ElementPanel>
					<EndreDeltakelseKnapp disabled={erSkjermetPerson} deltaker={deltaker} onEndringUtfort={triggerReloadEndringsmeldinger} />
				</div>
				<ElementPanel tittel="Dato:">
					<BodyShort size="small" >{formatDate(deltaker.startDato)} - {formatDate(deltaker.sluttDato)}</BodyShort>
				</ElementPanel>
				<div className={styles.body}>
					<Endringsmeldinger
						deltakerId={deltaker.id}
						setReloadEndringsmeldinger={setReloadEndringsmeldinger}
						reloadEndringsmeldinger={reloadEndringsmeldinger}
					/>
					{erIkkeAktuellEllerHarSluttet(status.type) &&
						<Alert variant="warning" size="small" className={styles.statusAlert}>Deltakeren fjernes fra listen {formatDate(fjernesDato)}</Alert>}
				</div>
			</div>
		</div>
	)
}

const erIkkeAktuellEllerHarSluttet = (status: TiltakDeltakerStatus): boolean =>
	[ TiltakDeltakerStatus.IKKE_AKTUELL, TiltakDeltakerStatus.HAR_SLUTTET ].includes(status)
