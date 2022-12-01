import '@navikt/ds-css-internal'

import { Edit } from '@navikt/ds-icons'
import { Button } from '@navikt/ds-react'
import { Dropdown } from '@navikt/ds-react-internal'
import React from 'react'

import { TiltakDeltakerDetaljer, TiltakDeltakerStatus } from '../../../../api/data/deltaker'
import { DropDownButton } from './DropDownButton'
import styles from './EndreDeltakelseKnapp.module.scss'
import { useModalData } from './modal-store'
import { ModalController } from './ModalController'
import { EndringType } from './types'

interface EndreDeltakelseKnappProps {
	disabled: boolean
	deltaker: TiltakDeltakerDetaljer
	onEndringUtfort: () => void
}

export const EndreDeltakelseKnapp = (props: EndreDeltakelseKnappProps) => {
	const {
		modalData,
		visEndreOppstartModal,
		visLeggTilOppstartModal,
		visForlengDeltakelseModal,
		visSettDeltakerIkkeAktuellModal,
		visAvsluttDeltakerModal,
		visEndreProsentDeltakelseModal,
		lukkModal
	} = useModalData()
	const { deltaker } = props
	const kanEndreStartDato = deltaker.status.type === TiltakDeltakerStatus.VENTER_PA_OPPSTART
		|| deltaker.status.type === TiltakDeltakerStatus.IKKE_AKTUELL
		|| deltaker.status.type === TiltakDeltakerStatus.DELTAR

	return (
		<>
			<ModalController modalData={modalData} onClose={lukkModal}/>
			<Dropdown>
				<Button className={styles.knapp} as={Dropdown.Toggle} variant="secondary" size="small"
					disabled={props.disabled}>
					<span className={styles.knappTekst}>
						<Edit aria-hidden/>
						Endre deltakelse
					</span>
				</Button>
				<Dropdown.Menu>
					<Dropdown.Menu.GroupedList className={styles.dropdown}>
						{ kanEndreStartDato && !deltaker.startDato &&
							<DropDownButton
								endringstype={EndringType.LEGG_TIL_OPPSTARTSDATO}
								onClick={() => visLeggTilOppstartModal({
									deltakerId: deltaker.id,
									onEndringUtfort: props.onEndringUtfort
								})}/>
						}

						{ kanEndreStartDato && deltaker.startDato &&
							<DropDownButton
								endringstype={EndringType.ENDRE_OPPSTARTSDATO}
								onClick={() => visEndreOppstartModal({
									deltakerId: deltaker.id,
									onEndringUtfort: props.onEndringUtfort
								})}/>
						}

						{(deltaker.status.type === TiltakDeltakerStatus.HAR_SLUTTET
								|| deltaker.status.type === TiltakDeltakerStatus.DELTAR) &&
							<DropDownButton
								endringstype={EndringType.FORLENG_DELTAKELSE}
								onClick={() => visForlengDeltakelseModal({
									deltakerId: deltaker.id,
									startDato: deltaker.startDato,
									sluttDato: deltaker.sluttDato,
									onEndringUtfort: props.onEndringUtfort
								})}/>
						}

						{ deltaker.status.type === TiltakDeltakerStatus.VENTER_PA_OPPSTART &&
							<DropDownButton
								endringstype={EndringType.DELTAKER_IKKE_AKTUELL}
								onClick={() => visSettDeltakerIkkeAktuellModal({
									deltakerId: deltaker.id,
									onEndringUtfort: props.onEndringUtfort
								})}/>
						}
						{deltaker.status.type === TiltakDeltakerStatus.DELTAR &&
							<DropDownButton
								endringstype={EndringType.AVSLUTT_DELTAKELSE}
								onClick={() => visAvsluttDeltakerModal({
									deltakerId: deltaker.id,
									startDato: deltaker.startDato,
									onEndringUtfort: props.onEndringUtfort
								})}/>
						}
						{(deltaker.gjennomforing.tiltak.tiltakskode === 'ARBFORB'
								|| deltaker.gjennomforing.tiltak.tiltakskode === 'VASV') &&
							<DropDownButton
								endringstype={EndringType.ENDRE_DELTAKELSE_PROSENT}
								onClick={() => visEndreProsentDeltakelseModal({
									deltakerId: deltaker.id,
									gammelProsentDeltakelse: deltaker.deltakelseProsent,
									onEndringUtfort: props.onEndringUtfort
								})}/>
						}

					</Dropdown.Menu.GroupedList>
				</Dropdown.Menu>
			</Dropdown>
		</>
	)
}
