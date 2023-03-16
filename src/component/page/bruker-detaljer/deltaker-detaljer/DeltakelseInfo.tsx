import { Alert, Button, Loader } from '@navikt/ds-react'
import { AxiosResponse } from 'axios'
import React, { useState } from 'react'

import { DeltakerStatus, TiltakDeltakerDetaljer, TiltakDeltakerStatus } from '../../../../api/data/deltaker'
import { skjulDeltaker } from '../../../../api/tiltak-api'
import { formatDate } from '../../../../utils/date-utils'
import { Nullable } from '../../../../utils/types/or-nothing'
import {
	isNotStarted,
	isPending,
	isRejected,
	isResolved,
	usePromise
} from '../../../../utils/use-promise'
import { StatusMerkelapp } from '../../../felles/status-merkelapp/StatusMerkelapp'
import styles from './DeltakelseInfo.module.scss'
import { ElementPanel } from './ElementPanel'
import { EndreDeltakelseKnapp } from './EndreDeltakelseKnapp'
import { Endringsmeldinger } from './endringsmelding/Endringsmeldinger'
import { FjernDeltakerModal } from './fjern-deltaker-modal/FjernDeltakerModal'

interface DeltakelseInfoProps {
	deltaker: TiltakDeltakerDetaljer
	status: DeltakerStatus
	fjernesDato: Nullable<Date>
}

export const DeltakelseInfo = ({
	deltaker,
	status,
	fjernesDato
}: DeltakelseInfoProps): React.ReactElement => {
	const [ reloadEndringsmeldinger, setReloadEndringsmeldinger ] = useState(true)
	const [ visFjernDeltakerModal, setVisFjernDeltakerModal ] = useState(false)

	const skjulDeltakerPromise = usePromise<AxiosResponse>()

	const triggerReloadEndringsmeldinger = () => {
		setReloadEndringsmeldinger(true)
	}

	const handleSkjulDeltaker = () => {
		setVisFjernDeltakerModal(false)
		skjulDeltakerPromise.setPromise(skjulDeltaker(deltaker.id))
	}

	const skalViseDeltakelsesprosent = [ 'ARBFORB', 'VASV' ]
		.includes(deltaker.deltakerliste.tiltak.tiltakskode)

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
				<EndreDeltakelseKnapp deltaker={deltaker} onEndringUtfort={triggerReloadEndringsmeldinger} />
			</div>

			<div className={styles.body}>
				<Endringsmeldinger
					deltakerId={deltaker.id}
					setReloadEndringsmeldinger={setReloadEndringsmeldinger}
					reloadEndringsmeldinger={reloadEndringsmeldinger}
				/>
				{(erIkkeAktuellEllerHarSluttet && isNotStarted(skjulDeltakerPromise)) &&
					<Alert variant="warning" size="small" className={styles.statusAlert}>
						Deltakeren fjernes fra listen {formatDate(fjernesDato)}
						<Button
							variant="tertiary"
							className={styles.fjernDeltakerKnapp}
							onClick={() => setVisFjernDeltakerModal(true)}
						>
							Fjern deltaker nå
						</Button>
					</Alert>}
				{isPending(skjulDeltakerPromise) && (
					<Loader size="xlarge" />
				)}
				{isResolved(skjulDeltakerPromise) && (
					<Alert variant="success">Deltakeren er fjernet</Alert>
				)}
				{isRejected(skjulDeltakerPromise) && (
					<Alert variant="error">Klarte ikke å fjerne deltaker, prøv igjen senere</Alert>
				)}
			</div>

			<FjernDeltakerModal
				open={visFjernDeltakerModal}
				onConfirm={handleSkjulDeltaker}
				onClose={() => setVisFjernDeltakerModal(false)}
			/>
		</div>
	)
}
