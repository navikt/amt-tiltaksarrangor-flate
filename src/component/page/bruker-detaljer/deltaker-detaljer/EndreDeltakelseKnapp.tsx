import { PencilIcon } from '@navikt/aksel-icons'
import { Button, Dropdown } from '@navikt/ds-react'
import React, { useRef } from 'react'

import {
  Deltaker,
  TiltakDeltakerStatus
} from '../../../../api/data/deltaker'
import { DropDownButton } from './DropDownButton'
import styles from './EndreDeltakelseKnapp.module.scss'
import { useModalData } from './modal-store'
import { ModalController } from './ModalController'
import { EndringType } from './types'
import { Tiltakskode } from '../../../../api/data/tiltak'
import { AktivtForslag } from '../../../../api/data/forslag'

interface EndreDeltakelseKnappProps {
  deltaker: Deltaker
  onEndringUtfort: () => void
  erForslagEnabled: boolean
  onForslagSendt: (forslag: AktivtForslag) => void
  onEndringSendt: (oppdatertDeltaker: Deltaker) => void
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
    visEndreSluttdatoModal,
    visEndreSluttaarsakModal,
    visFjernOppstartsdatoModal,
    lukkModal
  } = useModalData()
  const { deltaker } = props

  const kanIkkeLeggeTilOppstartDato =
    (deltaker.status.type === TiltakDeltakerStatus.IKKE_AKTUELL ||
			deltaker.status.type === TiltakDeltakerStatus.SOKT_INN ||
			deltaker.status.type === TiltakDeltakerStatus.VURDERES 
		) &&
    props.erForslagEnabled

	const kanEndreStartDato =
		deltaker.status.type === TiltakDeltakerStatus.VENTER_PA_OPPSTART ||
		deltaker.status.type === TiltakDeltakerStatus.IKKE_AKTUELL ||
		deltaker.status.type === TiltakDeltakerStatus.DELTAR ||
		deltaker.status.type === TiltakDeltakerStatus.VURDERES ||
		deltaker.status.type === TiltakDeltakerStatus.SOKT_INN

  const kanFjerneOppstartsdato =
    deltaker.status.type === TiltakDeltakerStatus.VENTER_PA_OPPSTART &&
    deltaker.startDato && !deltaker.deltakerliste.erKurs && props.erForslagEnabled

  const endreDeltakelseRef = useRef<HTMLButtonElement>(null)
  const handleCloseModal = () => {
    lukkModal()
    endreDeltakelseRef?.current?.focus()
  }

	const kanForlengeDeltakelse = () => {
		const harSluttet = deltaker.status.type === TiltakDeltakerStatus.HAR_SLUTTET
		const ferdigPaKurs = [TiltakDeltakerStatus.FULLFORT, TiltakDeltakerStatus.AVBRUTT].includes(deltaker.status.type)
		const deltarMedSluttdato = deltaker.status.type === TiltakDeltakerStatus.DELTAR && deltaker.sluttDato

		if (props.erForslagEnabled) {
			return harSluttet || ferdigPaKurs || (deltarMedSluttdato && !deltaker.deltakerliste.erKurs)
		}
		return harSluttet || deltarMedSluttdato 
	}

	const kanEndreSluttaarsak = () => {
		const harSluttet = deltaker.status.type === TiltakDeltakerStatus.HAR_SLUTTET
		const ferdigPaKurs = [TiltakDeltakerStatus.FULLFORT, TiltakDeltakerStatus.AVBRUTT].includes(deltaker.status.type)
		const ikkeAktuell = deltaker.status.type === TiltakDeltakerStatus.IKKE_AKTUELL

		if (props.erForslagEnabled) {
			return harSluttet || ferdigPaKurs || ikkeAktuell
		}
		return harSluttet && !deltaker.deltakerliste.erKurs
	}

  const visGodkjennVilkaarPanel = deltaker.tiltakskode !== Tiltakskode.VASV

  return (
    <>
      <ModalController modalData={modalData} onClose={handleCloseModal} />
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
            {kanEndreStartDato &&
              !kanIkkeLeggeTilOppstartDato &&
              !deltaker.startDato && (
                <DropDownButton
                  endringstype={EndringType.LEGG_TIL_OPPSTARTSDATO}
                  onClick={() =>
                    visLeggTilOppstartModal({
                      deltaker: deltaker,
                      visGodkjennVilkaarPanel: false,
                      onEndringUtfort: props.onEndringUtfort,
                      onEndringSendt: props.onEndringSendt,
                      erForslagEnabled: props.erForslagEnabled
                    })
                  }
                />
              )}

            {kanEndreStartDato && deltaker.startDato && (
              <DropDownButton
                endringstype={EndringType.ENDRE_OPPSTARTSDATO}
                onClick={() =>
                  visEndreOppstartModal({
                    deltaker: deltaker,
                    visGodkjennVilkaarPanel: visGodkjennVilkaarPanel,
                    onEndringUtfort: props.onEndringUtfort,
                    onForslagSendt: props.onForslagSendt,
                    erForslagEnabled: props.erForslagEnabled
                  })
                }
              />
            )}

            {kanForlengeDeltakelse() && (
              <DropDownButton
                endringstype={EndringType.FORLENG_DELTAKELSE}
                onClick={() =>
                  visForlengDeltakelseModal({
                    deltaker: deltaker,
                    visGodkjennVilkaarPanel: visGodkjennVilkaarPanel,
                    onEndringUtfort: props.onEndringUtfort,
                    onForslagSendt: props.onForslagSendt,
                    erForslagEnabled: props.erForslagEnabled
                  })
                }
              />
            )}

            {deltaker.status.type ===
              TiltakDeltakerStatus.VENTER_PA_OPPSTART && (
              <DropDownButton
                endringstype={EndringType.DELTAKER_IKKE_AKTUELL}
                onClick={() =>
                  visSettDeltakerIkkeAktuellModal({
                    deltakerId: deltaker.id,
                    visGodkjennVilkaarPanel: visGodkjennVilkaarPanel,
                    onEndringUtfort: props.onEndringUtfort,
                    onForslagSendt: props.onForslagSendt,
                    erForslagEnabled: props.erForslagEnabled
                  })
                }
              />
            )}
            {deltaker.status.type === TiltakDeltakerStatus.DELTAR && (
              <DropDownButton
                endringstype={EndringType.AVSLUTT_DELTAKELSE}
                onClick={() =>
                  visAvsluttDeltakerModal({
                    deltaker: deltaker,
                    startDato: deltaker.startDato,
                    visGodkjennVilkaarPanel: visGodkjennVilkaarPanel,
                    onEndringUtfort: props.onEndringUtfort,
                    onForslagSendt: props.onForslagSendt,
                    erForslagEnabled: props.erForslagEnabled
                  })
                }
              />
            )}
            {(deltaker.tiltakskode === Tiltakskode.ARBFORB ||
              deltaker.tiltakskode === Tiltakskode.VASV) && (
              <DropDownButton
                endringstype={EndringType.ENDRE_DELTAKELSE_PROSENT}
                onClick={() =>
                  visEndreProsentDeltakelseModal({
                    deltaker: deltaker,
                    visGodkjennVilkaarPanel: visGodkjennVilkaarPanel,
                    onEndringUtfort: props.onEndringUtfort,
                    onForslagSendt: props.onForslagSendt,
                    erForslagEnabled: props.erForslagEnabled
                  })
                }
              />
            )}
						{(deltaker.status.type === TiltakDeltakerStatus.VURDERES || deltaker.status.type === TiltakDeltakerStatus.SOKT_INN) && (
							<DropDownButton
								endringstype={EndringType.DELTAKER_IKKE_AKTUELL}
								onClick={() =>
									visSettDeltakerIkkeAktuellModal({
										deltakerId: deltaker.id,
										visGodkjennVilkaarPanel: visGodkjennVilkaarPanel,
										onEndringUtfort: props.onEndringUtfort,
										onForslagSendt: props.onForslagSendt,
										erForslagEnabled: props.erForslagEnabled
									})
								}
							/>
						)}
            {(deltaker.status.type === TiltakDeltakerStatus.FULLFORT ||
              deltaker.status.type === TiltakDeltakerStatus.AVBRUTT ||
              deltaker.status.type === TiltakDeltakerStatus.HAR_SLUTTET) && (
              <DropDownButton
                endringstype={EndringType.ENDRE_SLUTTDATO}
                onClick={() =>
                  visEndreSluttdatoModal({
                    deltaker: deltaker,
                    visGodkjennVilkaarPanel: visGodkjennVilkaarPanel,
                    onEndringUtfort: props.onEndringUtfort,
                    onForslagSendt: props.onForslagSendt,
                    erForslagEnabled: props.erForslagEnabled
                  })
                }
              />
            )}
            {kanEndreSluttaarsak() && (
                <DropDownButton
                  endringstype={EndringType.ENDRE_SLUTTAARSAK}
                  onClick={() =>
                    visEndreSluttaarsakModal({
                      deltakerId: deltaker.id,
                      deltaker: deltaker,
                      deltakerStatus: deltaker.status.type as
                        | TiltakDeltakerStatus.HAR_SLUTTET
                        | TiltakDeltakerStatus.IKKE_AKTUELL,
                      visGodkjennVilkaarPanel: visGodkjennVilkaarPanel,
                      onEndringUtfort: props.onEndringUtfort,
                      onForslagSendt: props.onForslagSendt,
                      erForslagEnabled: props.erForslagEnabled
                    })
                  }
                />
              )}
            {kanFjerneOppstartsdato && (
                <DropDownButton
                  endringstype={EndringType.FJERN_OPPSTARTSDATO}
                  onClick={() =>
                    visFjernOppstartsdatoModal({
                      deltaker: deltaker,
                      visGodkjennVilkaarPanel: false,
                      onForslagSendt: props.onForslagSendt,
                      erForslagEnabled: props.erForslagEnabled
                    })
                  }
                />
              )}
          </Dropdown.Menu.List>
        </Dropdown.Menu>
      </Dropdown>
    </>
  )
}
