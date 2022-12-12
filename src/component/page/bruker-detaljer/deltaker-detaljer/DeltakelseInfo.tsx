import { Alert } from '@navikt/ds-react'
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

	const skalViseDeltakelsesprosent = [ 'ARBFORB', 'VASV' ]
		.includes(deltaker.gjennomforing.tiltak.tiltakskode)

	const erIkkeAktuellEllerHarSluttet = [ TiltakDeltakerStatus.IKKE_AKTUELL, TiltakDeltakerStatus.HAR_SLUTTET ]
		.includes(status.type)

	return (
		<div className={styles.section}>

			<div className={styles.deltakerInfoWrapper}>
				<div className={styles.elementWrapper}>
					<ElementPanel tittel="Status:">
						<StatusMerkelapp status={status} />
					</ElementPanel>
					<ElementPanel tittel="Dato:">
						<span>{formatDate(deltaker.startDato)} - {formatDate(deltaker.sluttDato)}</span>
					</ElementPanel>
					{skalViseDeltakelsesprosent && (
						<ElementPanel tittel="Deltakelsesprosent:" className={styles.deltakelsesProsentPanel}>
							<span>{deltaker.deltakelseProsent !== null
								? `${deltaker.deltakelseProsent}%`
								: 'Ikke satt'}
							</span>
						</ElementPanel>
					)}
				</div>
				<EndreDeltakelseKnapp disabled={erSkjermetPerson} deltaker={deltaker} onEndringUtfort={triggerReloadEndringsmeldinger} />
			</div>

			<div className={styles.body}>
				<Endringsmeldinger
					deltakerId={deltaker.id}
					setReloadEndringsmeldinger={setReloadEndringsmeldinger}
					reloadEndringsmeldinger={reloadEndringsmeldinger}
				/>
				{erIkkeAktuellEllerHarSluttet &&
					<Alert variant="warning" size="small" className={styles.statusAlert}>Deltakeren fjernes fra listen {formatDate(fjernesDato)}</Alert>}
			</div>
		</div>
	)
}
