import { Alert, Button, Loader } from '@navikt/ds-react'
import { AxiosResponse } from 'axios'
import React, { useState } from 'react'

import { Deltaker, TiltakDeltakerStatus } from '../../../../api/data/deltaker'
import { skjulDeltaker } from '../../../../api/tiltak-api'
import { formatDate } from '../../../../utils/date-utils'
import { getDeltakelsesmengdetekst, skalViseDeltakelsesmengde } from '../../../../utils/deltaker-utils'
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
import { AktiveForslag } from './forslag/AktiveForslag'
import { AktivtForslag } from '../../../../api/data/forslag'
import { useFeatureToggle } from '../../../../hooks/useFeatureToggle'

interface DeltakelseInfoProps {
	deltaker: Deltaker
}

export const DeltakelseInfo = ({
	deltaker
}: DeltakelseInfoProps): React.ReactElement => {
	const [ reloadEndringsmeldinger, setReloadEndringsmeldinger ] = useState(false)
	const [ visFjernDeltakerModal, setVisFjernDeltakerModal ] = useState(false)
	const [ forslag, setForslag ] = useState(deltaker.aktiveForslag)

	const skjulDeltakerPromise = usePromise<AxiosResponse>()

	const { erForslagEnabledForTiltak } = useFeatureToggle()
	const erForslagEnabled = erForslagEnabledForTiltak(deltaker.deltakerliste.tiltakstype)

	const handleForslagSendt = (forslag: AktivtForslag) => {
		setForslag(prev => [ forslag, ...prev ])
	}

	const handleForslagTilbakekalt = (forslag: AktivtForslag) => {
		setForslag(prev => prev.filter(it => it.id !== forslag.id))
	}

	const triggerReloadEndringsmeldinger = () => {
		setReloadEndringsmeldinger(true)
	}

	const handleSkjulDeltaker = () => {
		setVisFjernDeltakerModal(false)
		skjulDeltakerPromise.setPromise(skjulDeltaker(deltaker.id))
	}

	const viseDeltakelsesmengde = skalViseDeltakelsesmengde(deltaker.tiltakskode)

	const kanFjerneDeltaker = [ TiltakDeltakerStatus.IKKE_AKTUELL, TiltakDeltakerStatus.HAR_SLUTTET, TiltakDeltakerStatus.AVBRUTT, TiltakDeltakerStatus.FULLFORT ]
		.includes(deltaker.status.type)


	return (
		<div className={styles.section}>

			<div className={styles.deltakerInfoWrapper}>
				<div className={styles.elementWrapper}>
					<ElementPanel tittel="Status:">
						<StatusMerkelapp status={deltaker.status} />
					</ElementPanel>
					<ElementPanel tittel="Dato:">
						<span>{formatDate(deltaker.startDato)} - {formatDate(deltaker.sluttDato)}</span>
					</ElementPanel>
					{viseDeltakelsesmengde && (
						<ElementPanel tittel="Deltakelsesmengde:">
							<span>{getDeltakelsesmengdetekst(deltaker.deltakelseProsent, deltaker.dagerPerUke)}
							</span>
						</ElementPanel>
					)}
				</div>
				<EndreDeltakelseKnapp
					deltaker={deltaker}
					onEndringUtfort={triggerReloadEndringsmeldinger}
					erForslagEnabled={erForslagEnabled}
					onForslagSendt={handleForslagSendt}
				/>
			</div>

			<div className={styles.body}>
				{erForslagEnabled && <AktiveForslag forslag={forslag} deltakerId={deltaker.id} onTilbakekalt={handleForslagTilbakekalt} />}
				<Endringsmeldinger
					deltaker={deltaker}
					setReloadEndringsmeldinger={setReloadEndringsmeldinger}
					reloadEndringsmeldinger={reloadEndringsmeldinger}
				/>
				{(kanFjerneDeltaker && isNotStarted(skjulDeltakerPromise)) &&
					<Alert variant="warning" size="small" className={styles.statusAlert}>
						Deltakeren fjernes fra listen {formatDate(deltaker.fjernesDato)}
						<Button
							variant="tertiary"
							size="small"
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

