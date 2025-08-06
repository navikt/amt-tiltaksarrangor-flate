import { PencilIcon } from '@navikt/aksel-icons'
import { Button, Dropdown } from '@navikt/ds-react'
import { useRef } from 'react'

import {
	Deltaker,
} from '../../../../api/data/deltaker'
import { AktivtForslag } from '../../../../api/data/forslag'
import { DropDownButton } from './DropDownButton'
import styles from './EndreDeltakelseKnapp.module.scss'
import { endringsknapper } from './endringsknapper'
import { useModalData } from './modal-store'
import { ModalController } from './ModalController'

interface EndreDeltakelseKnappProps {
	deltaker: Deltaker
	onForslagSendt: (forslag: AktivtForslag) => void
	onEndringSendt: (oppdatertDeltaker: Deltaker) => void
}

export const EndreDeltakelseKnapp = (props: EndreDeltakelseKnappProps) => {
	const { deltaker } = props
	const modal = useModalData()
	const endreDeltakelseRef = useRef<HTMLButtonElement>(null)
	const handleCloseModal = () => {
		modal.lukkModal()
		endreDeltakelseRef?.current?.focus()
	}

	return (
		<>
			<ModalController modalData={modal.modalData} />
			<Dropdown>
				<Button
					ref={endreDeltakelseRef}
					className={styles.knapp}
					as={Dropdown.Toggle}
					variant="secondary"
					size="small"
					icon={<PencilIcon aria-hidden />}
				>
					Endre deltakelse
				</Button>
				<Dropdown.Menu className={styles.dropdownMenu}>
					<Dropdown.Menu.List>
						{endringsknapper(deltaker, modal).map(knapp => {
							if (knapp.erTilgjengelig) {
								return <DropDownButton
									key={knapp.type}
									endringstype={knapp.type}
									onClick={() =>
										knapp.modalFunc({
											deltaker: deltaker,
											onEndringSendt: props.onEndringSendt,
											onForslagSendt: props.onForslagSendt,
											onClose: handleCloseModal,
										})
									}
								/>
							} else return <></>
						})}
					</Dropdown.Menu.List>
				</Dropdown.Menu>
			</Dropdown>
		</>
	)
}
