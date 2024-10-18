import { PencilIcon } from '@navikt/aksel-icons'
import { Button, Dropdown } from '@navikt/ds-react'
import React, { useRef } from 'react'

import {
  Deltaker,
  IndividuellDeltakerStatus,
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
    lukkModal
  } = useModalData()
  const { deltaker } = props

  const kanIkkeLeggeTilOppstartDato = deltaker.status.type === TiltakDeltakerStatus.IKKE_AKTUELL
    && props.erForslagEnabled

  const kanEndreStartDato =
    deltaker.status.type === TiltakDeltakerStatus.VENTER_PA_OPPSTART ||
    deltaker.status.type === TiltakDeltakerStatus.IKKE_AKTUELL ||
    deltaker.status.type === TiltakDeltakerStatus.DELTAR ||
    deltaker.status.type === TiltakDeltakerStatus.VURDERES

  const endreDeltakelseRef = useRef<HTMLButtonElement>(null)
  const handleCloseModal = () => {
    lukkModal()
    endreDeltakelseRef?.current?.focus()
  }

  const visGodkjennVilkaarPanel = deltaker.tiltakskode !== Tiltakskode.VASV
  const kanHaSenereSluttdato =
    !deltaker.sluttDato ||
    !deltaker.deltakerliste.sluttDato ||
    deltaker.sluttDato < deltaker.deltakerliste.sluttDato
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
            {kanEndreStartDato && !kanIkkeLeggeTilOppstartDato && !deltaker.startDato && (
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

            {(deltaker.status.type === TiltakDeltakerStatus.HAR_SLUTTET ||
              (deltaker.status.type === TiltakDeltakerStatus.DELTAR &&
                kanHaSenereSluttdato)) && (
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
                    deltakerId: deltaker.id,
                    visGodkjennVilkaarPanel: visGodkjennVilkaarPanel,
                    onEndringUtfort: props.onEndringUtfort,
                    onForslagSendt: props.onForslagSendt,
                    erForslagEnabled: props.erForslagEnabled
                  })
                }
              />
            )}
            {deltaker.status.type === TiltakDeltakerStatus.VURDERES && (
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
            {(deltaker.status.type === IndividuellDeltakerStatus.HAR_SLUTTET ||
              (props.erForslagEnabled &&
                deltaker.status.type ===
                  IndividuellDeltakerStatus.IKKE_AKTUELL)) &&
              !deltaker.deltakerliste.erKurs && (
                <DropDownButton
                  endringstype={EndringType.ENDRE_SLUTTAARSAK}
                  onClick={() =>
                    visEndreSluttaarsakModal({
                      deltakerId: deltaker.id,
                      deltakerStatus: deltaker.status.type as
                        | IndividuellDeltakerStatus.HAR_SLUTTET
                        | IndividuellDeltakerStatus.IKKE_AKTUELL,
                      visGodkjennVilkaarPanel: visGodkjennVilkaarPanel,
                      onEndringUtfort: props.onEndringUtfort,
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
