import { BaseModal } from '../../bruker-detaljer/deltaker-detaljer/endre-deltaker-modal/BaseModal'
import { BodyLong, Button } from '@navikt/ds-react'
import styles from '../../bruker-detaljer/deltaker-detaljer/fjern-deltaker-modal/FjernDeltakerModal.module.scss'
import React from 'react'

interface LeggTilDeltakerModalProps {
    open: boolean;
    deltakerlisteNavn: string;
    deltakerlisteId: string;
    onConfirm: (id: string) => void;
    onClose: () => void;
}

export const LeggTilDeltakerModal = (props: LeggTilDeltakerModalProps) => {

	const onLeggTilClicked = () => {
		props.onConfirm(props.deltakerlisteId)
	}

	return (
		<BaseModal
			tittel="Vil du legge til denne deltakerlisten?"
			open={props.open}
			onClose={props.onClose}
			contentClassName={styles.modalContent}
		>

			<div>Deltakerliste: <span className={styles.deltakerlisteNavn}>{props.deltakerlisteNavn}</span></div>

			<BodyLong className={styles.text}>
                Det er viktig at du kun legger til deltakerlister i oversikten
                din som du er koordinator for. Når du legger til deltakerlisten
                vil dine kollegaer se navnet ditt.
			</BodyLong>

			<div className={styles.knappeRad}>
				<Button size="small" variant="secondary" onClick={props.onClose}>Avbryt</Button>
				<Button size="small" variant="primary" onClick={onLeggTilClicked}>Legg til</Button>
			</div>

		</BaseModal>
	)
}
