import { Deltakerliste } from '../../../deltakerliste.viewobjects'
import styles from './DeltakerlistePanel.module.scss'
import { Alert, BodyShort, Button, Heading, Panel } from '@navikt/ds-react'
import globalStyles from '../../../../../../globals.module.scss'
import cls from 'classnames'
import { formatDate } from '../../../../../../utils/date-utils'
import { Show } from '../../../../../felles/Show'
import { Add, Close } from '@navikt/ds-icons'
import React, { useEffect, useState } from 'react'

interface DeltakerlistePanelProps {
	deltakerliste: Deltakerliste;
	deltakerlisterLagtTil: string[];
	deltakerlisteIdLoading: string | undefined;
	onLeggTil: (id: string) => void;
	onFjern: (id: string) => void;
}

const SUCCESS_ALERT_TIMEOUT_MS = 2000

export const DeltakerlistePanel = (props: DeltakerlistePanelProps) => {
	const deltakerliste = props.deltakerliste

	const [ lagtTil, setLagtTil ] = useState<boolean | undefined>()
	const [ isLoading, setIsLoading ] = useState(false)
	const [ showSuccessAlert, setShowSuccessAlert ] = useState(false)

	useEffect(() => {
		const nyStatus = props.deltakerlisterLagtTil.includes(deltakerliste.id)

		if (lagtTil !== undefined && lagtTil !== nyStatus) {
			setShowSuccessAlert(true)

			setTimeout(() => {
				setShowSuccessAlert(false)
			}, SUCCESS_ALERT_TIMEOUT_MS)
		}

		setLagtTil(nyStatus)

	}, [ props.deltakerliste, props.deltakerlisterLagtTil, deltakerliste.id, lagtTil ])

	useEffect(() => {
		setIsLoading(props.deltakerliste.id === props.deltakerlisteIdLoading)
	}, [ props.deltakerlisteIdLoading, props.deltakerliste.id ])


	const onLeggTilClicked = () => {
		props.onLeggTil(props.deltakerliste.id)
	}

	const onFjernClicked = () => {
		props.onFjern(props.deltakerliste.id)
	}

	return (
		<Panel border className={styles.panel}>
			<Heading size="xsmall" level="5" className={globalStyles.blokkXxs}>{deltakerliste.navn}</Heading>
			<div className={styles.innhold}>
				<div>
					<div className={cls(styles.rad, globalStyles.blokkXxs)}>
						<BodyShort size="small" className={styles.tiltaksinfo}>
							<span className={styles.tiltaknavn}>{deltakerliste.tiltaksnavn}</span>
							<span> {formatDate(deltakerliste.startDato)} - {formatDate(deltakerliste.sluttDato)}</span>
						</BodyShort>
					</div>

				</div>

				<Show if={!lagtTil}>
					{!showSuccessAlert && (
						<Button
							variant="primary"
							size="small"
							className={styles.knapp}
							disabled={isLoading}
							loading={isLoading}
							onClick={onLeggTilClicked}
						>
							<Add/> Legg til
						</Button>
					)}
					{showSuccessAlert && <Alert size="small" role="status" variant="success">Fjernet</Alert>}
				</Show>

				<Show if={lagtTil}>
					{!showSuccessAlert && (
						<Button
							variant="secondary"
							size="small"
							className={styles.knapp}
							disabled={isLoading}
							loading={isLoading}
							onClick={onFjernClicked}
						>
							<Close/> Fjern
						</Button>
					)}
					{showSuccessAlert && <Alert size="small" role="status" variant="success">Lagt til</Alert>}
				</Show>
			</div>
		</Panel>
	)

}
