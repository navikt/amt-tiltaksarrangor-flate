import { Alert, Modal } from '@navikt/ds-react'
import { HistorikkVedtak } from './HistorikkVedtak'
import { DeltakerHistorikk, DeltakerHistorikkListe } from '../../../../../api/data/historikk'
import { HistorikkType } from '../../../../../api/data/forslag'
import styles from './HistorikkModal.module.scss'


interface Props {
	historikk: DeltakerHistorikkListe | null
	open: boolean
	onClose: () => void
}

const getHistorikkItem = (historikk: DeltakerHistorikk) => {
	switch (historikk.type) {
		case HistorikkType.Vedtak:
			return <HistorikkVedtak endringsVedtak={historikk} />
		default:
			return null // TODO lag for alle HistorikkType
	}
}

export const HistorikkModal = ({ open, historikk, onClose }: Props) => {
	return (
		<Modal open={open}
					 header={{ heading: 'Endringer' }}
					 onClose={onClose}
					 aria-label={'Endringer'}

		>
			<Modal.Body>
				{historikk &&
					historikk.map((i, index) => (
						<div key={`${i.type}${index}`} className={styles.content}>
							{getHistorikkItem(i)}
						</div>
					))}
				{(!historikk || historikk.length < 0) && (
					<Alert variant="info" size="small">
						Ingen historikk å vise.
					</Alert>
				)}
			</Modal.Body>
		</Modal>
	)
}

