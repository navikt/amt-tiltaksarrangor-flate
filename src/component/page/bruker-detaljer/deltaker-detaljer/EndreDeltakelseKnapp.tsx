import { PencilIcon } from '@navikt/aksel-icons'
import { Button, Dropdown } from '@navikt/ds-react'
import React from 'react'

import { Deltaker, TiltakDeltakerStatus } from '../../../../api/data/deltaker'
import { DropDownButton } from './DropDownButton'
import styles from './EndreDeltakelseKnapp.module.scss'
import { useModalData } from './modal-store'
import { ModalController } from './ModalController'
import { EndringType } from './types'
import { Tiltakskode } from '../../../../api/data/tiltak'

interface EndreDeltakelseKnappProps {
	deltaker: Deltaker
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
		visSettDeltakerErAktuellModal,
		visEndreSluttdatoModal,
		lukkModal
	} = useModalData()
	const { deltaker } = props
	const kanEndreStartDato = deltaker.status.type === TiltakDeltakerStatus.VENTER_PA_OPPSTART
		|| deltaker.status.type === TiltakDeltakerStatus.IKKE_AKTUELL
		|| deltaker.status.type === TiltakDeltakerStatus.DELTAR

	const visGodkjennVilkaarPanel = deltaker.tiltakskode !== Tiltakskode.VASV && deltaker.status.type !== TiltakDeltakerStatus.VURDERES
	const kanHaSenereSluttdato = !deltaker.sluttDato || !deltaker.deltakerliste.sluttDato || deltaker.sluttDato < deltaker.deltakerliste.sluttDato
	return (
		<>
			<ModalController modalData={modalData} onClose={lukkModal}/>
			<Dropdown>
				<Button className={styles.knapp} as={Dropdown.Toggle} variant="secondary" size="small">
					<span className={styles.knappTekst}>
						<PencilIcon aria-hidden />
						Endre deltakelse
					</span>
				</Button>
				<Dropdown.Menu className={styles.dropdownMenu}>
					<Dropdown.Menu.GroupedList className={styles.dropdown}>
						<Dropdown.Menu.GroupedList.Heading>
							Velg endring
						</Dropdown.Menu.GroupedList.Heading>
						{kanEndreStartDato && !deltaker.startDato &&
							<DropDownButton
								endringstype={EndringType.LEGG_TIL_OPPSTARTSDATO}
								onClick={() => visLeggTilOppstartModal({
									deltakerId: deltaker.id,
									visGodkjennVilkaarPanel: false,
									onEndringUtfort: props.onEndringUtfort,
								})}/>
						}

						{ kanEndreStartDato && deltaker.startDato &&
							<DropDownButton
								endringstype={EndringType.ENDRE_OPPSTARTSDATO}
								onClick={() => visEndreOppstartModal({
									deltakerId: deltaker.id,
									onEndringUtfort: props.onEndringUtfort,
									visGodkjennVilkaarPanel: visGodkjennVilkaarPanel
								})}/>
						}

						{ (deltaker.status.type === TiltakDeltakerStatus.HAR_SLUTTET ||
							(deltaker.status.type === TiltakDeltakerStatus.DELTAR && kanHaSenereSluttdato)) &&
							<DropDownButton
								endringstype={EndringType.FORLENG_DELTAKELSE}
								onClick={() => visForlengDeltakelseModal({
									deltakerId: deltaker.id,
									startDato: deltaker.startDato,
									sluttDato: deltaker.sluttDato,
									tiltakskode: deltaker.tiltakskode,
									visGodkjennVilkaarPanel: visGodkjennVilkaarPanel,
									onEndringUtfort: props.onEndringUtfort
								})}/>
						}

						{ deltaker.status.type === TiltakDeltakerStatus.VENTER_PA_OPPSTART &&
							<DropDownButton
								endringstype={EndringType.DELTAKER_IKKE_AKTUELL}
								onClick={() => visSettDeltakerIkkeAktuellModal({
									deltakerId: deltaker.id,
									visGodkjennVilkaarPanel: visGodkjennVilkaarPanel,
									erKurs: deltaker.deltakerliste.erKurs,
									onEndringUtfort: props.onEndringUtfort
								})}/>
						}
						{deltaker.status.type === TiltakDeltakerStatus.DELTAR &&
							<DropDownButton
								endringstype={EndringType.AVSLUTT_DELTAKELSE}
								onClick={() => visAvsluttDeltakerModal({
									deltakerId: deltaker.id,
									startDato: deltaker.startDato,
									visGodkjennVilkaarPanel: visGodkjennVilkaarPanel,
									onEndringUtfort: props.onEndringUtfort
								})}/>
						}
						{(deltaker.tiltakskode === Tiltakskode.ARBFORB
								|| deltaker.tiltakskode === Tiltakskode.VASV) &&
							<DropDownButton
								endringstype={EndringType.ENDRE_DELTAKELSE_PROSENT}
								onClick={() => visEndreProsentDeltakelseModal({
									deltakerId: deltaker.id,
									gammelProsentDeltakelse: deltaker.deltakelseProsent,
									visGodkjennVilkaarPanel: visGodkjennVilkaarPanel,
									onEndringUtfort: props.onEndringUtfort
								})}/>
						}
						{ deltaker.status.type === TiltakDeltakerStatus.VURDERES &&
							<>
								<DropDownButton
									endringstype={EndringType.DELTAKER_ER_AKTUELL}
									onClick={() => visSettDeltakerErAktuellModal({
										deltakerId: deltaker.id,
										onEndringUtfort: props.onEndringUtfort
									})}/>
								<DropDownButton
									endringstype={EndringType.DELTAKER_IKKE_AKTUELL}
									onClick={() => visSettDeltakerIkkeAktuellModal({
										deltakerId: deltaker.id,
										visGodkjennVilkaarPanel: visGodkjennVilkaarPanel,
										erKurs: deltaker.deltakerliste.erKurs,
										onEndringUtfort: props.onEndringUtfort
									})}/>
							</>
						}
						{ (deltaker.status.type === TiltakDeltakerStatus.FULLFORT ||
							deltaker.status.type === TiltakDeltakerStatus.AVBRUTT ) &&
							<DropDownButton
								endringstype={EndringType.ENDRE_SLUTTDATO}
								onClick={() => visEndreSluttdatoModal({
									deltakerId: deltaker.id,
									visGodkjennVilkaarPanel: visGodkjennVilkaarPanel,
									onEndringUtfort: props.onEndringUtfort
								})}/>
						}
					</Dropdown.Menu.GroupedList>

				</Dropdown.Menu>
			</Dropdown>
		</>
	)
}
