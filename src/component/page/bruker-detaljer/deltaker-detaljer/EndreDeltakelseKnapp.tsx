import { PencilIcon } from '@navikt/aksel-icons'
import { Button, Dropdown } from '@navikt/ds-react'
import React, { useRef } from 'react'

import {
	Deltaker,
} from '../../../../api/data/deltaker'
import { DropDownButton } from './DropDownButton'
import styles from './EndreDeltakelseKnapp.module.scss'
import { useModalData } from './modal-store'
import { ModalController } from './ModalController'
import { EndringType } from './types'
import { Tiltakskode } from '../../../../api/data/tiltak'
import { AktivtForslag } from '../../../../api/data/forslag'
import { endringsknapper } from './endringsknapper'

interface EndreDeltakelseKnappProps {
	deltaker: Deltaker
	onEndringUtfort: () => void
	erKometMaster: boolean
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

	const visGodkjennVilkaarPanel = (type: EndringType) => {
		switch (type) {
			case EndringType.ENDRE_OPPSTARTSDATO:
			case EndringType.FORLENG_DELTAKELSE:
			case EndringType.AVSLUTT_DELTAKELSE:
			case EndringType.DELTAKER_IKKE_AKTUELL:
			case EndringType.ENDRE_DELTAKELSE_PROSENT:
			case EndringType.ENDRE_SLUTTDATO:
			case EndringType.ENDRE_SLUTTAARSAK: return deltaker.tiltakskode !== Tiltakskode.VASV
			case EndringType.FJERN_OPPSTARTSDATO:
			case EndringType.LEGG_TIL_OPPSTARTSDATO: return false
			default: return false
		}
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
						{endringsknapper(deltaker, props.erKometMaster, modal).map(knapp => {
							if (knapp.erTilgjengelig) {
								return <DropDownButton
									key={knapp.type}
									endringstype={knapp.type}
									onClick={() =>
										knapp.modalFunc({
											deltaker: deltaker,
											visGodkjennVilkaarPanel: visGodkjennVilkaarPanel(knapp.type),
											onEndringUtfort: props.onEndringUtfort,
											onEndringSendt: props.onEndringSendt,
											erForslagEnabled: props.erKometMaster,
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
