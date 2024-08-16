import React, { useRef, useState } from 'react'

import { leggTilOppstartsdato } from '../../../../../api/tiltak-api'
import { BaseModal } from '../../../../felles/base-modal/BaseModal'
import { DateField } from '../../../../felles/DateField'
import styles from './EndreOppstartModal.module.scss'
import { VeilederConfirmationPanel } from './VeilederConfirmationPanel'
import { SendTilNavKnapp } from './SendTilNavKnapp'
import { Nullable } from '../../../../../utils/types/or-nothing'
import { EndringType } from '../types'
import { kalkulerMaxDato, kalkulerMinDato, maxSluttdato } from './datoutils'
import { Deltaker } from '../../../../../api/data/deltaker'
import { leggTilOppstartsdatoFraArrangor } from '../../../../../api/endring-api'
import { SluttdatoRef, SluttdatoVelger } from './SluttdatoVelger'
import { finnValgtVarighet } from './varighet'
import { Detail } from '@navikt/ds-react'

export interface LeggTilOppstartModalProps {
  onClose: () => void
}

export interface LeggTilOppstartModalDataProps {
  readonly deltaker: Deltaker
  readonly visGodkjennVilkaarPanel: boolean
  readonly onEndringUtfort: () => void
  readonly onEndringSendt: (oppdatertDeltaker: Deltaker) => void
  readonly erForslagEnabled: boolean
}

export const LeggTilOppstartModal = ({
  deltaker,
  onClose,
  visGodkjennVilkaarPanel,
  onEndringUtfort,
  onEndringSendt,
  erForslagEnabled
}: LeggTilOppstartModalProps & LeggTilOppstartModalDataProps) => {
  const [startdato, setStartdato] = useState<Nullable<Date>>(null)
  const sluttdato = useRef<SluttdatoRef>(null)

  const [vilkaarGodkjent, setVilkaarGodkjent] = useState(false)

  const sendEndringsmelding = () => {
    if (!startdato) {
      return Promise.reject('Kan ikke sende endringsmelding uten oppstartsdato')
    }
    return leggTilOppstartsdato(deltaker.id, startdato).then(onEndringUtfort)
  }

  const sendEndring = () => {
    if (!startdato) {
      return Promise.reject('Startdato må være valgt for å sende endring')
    }
    if (sluttdato.current && !sluttdato.current.validate()) {
      return Promise.reject(sluttdato.current.error)
    }

    return leggTilOppstartsdatoFraArrangor(
          deltaker.id,
          startdato,
          sluttdato.current?.sluttdato
        ).then((res) => onEndringSendt(res.data))
  }
  
  return (
    <BaseModal
      tittel="Legg til oppstartsdato"
      endringstype={EndringType.LEGG_TIL_OPPSTARTSDATO}
      onClose={onClose}
      className={styles.modal}
    >
      {erForslagEnabled && (
        <Detail>
          Oppstartsdato avtales med deltaker direkte. Når du lagrer så kan
          NAV-veileder se datoene i arbeidsverktøyet sitt og deltaker kan se
          datoene på nav.no.
        </Detail>
      )}
      <DateField
        label="Oppstartsdato"
        defaultDate={startdato}
        onDateChanged={(d) => setStartdato(d)}
        min={kalkulerMinDato(deltaker.deltakerliste.startDato)}
        max={kalkulerMaxDato(deltaker.deltakerliste.sluttDato)}
      />
      {erForslagEnabled && (
        <SluttdatoVelger
          ref={sluttdato}
          tiltakskode={deltaker.deltakerliste.tiltakstype}
          legend="Hva er forventet varighet?"
          detailLabel="Forventet sluttdato"
          min={startdato ?? undefined}
          max={maxSluttdato(startdato, deltaker.deltakerliste)}
          defaultSluttdato={deltaker.sluttDato ?? undefined}
          defaultVarighet={
            deltaker.sluttDato
              ? finnValgtVarighet(
                deltaker.startDato,
                deltaker.sluttDato,
                deltaker.deltakerliste.tiltakstype
              )
              : undefined
          }
        />
      )}
      {visGodkjennVilkaarPanel && (
        <VeilederConfirmationPanel
          vilkaarGodkjent={vilkaarGodkjent}
          setVilkaarGodkjent={setVilkaarGodkjent}
        />
      )}
      <SendTilNavKnapp
        onEndringSendt={onClose}
        sendEndring={erForslagEnabled ? sendEndring : sendEndringsmelding}
        disabled={!startdato || (visGodkjennVilkaarPanel && !vilkaarGodkjent)}
        endringFraArrangor={erForslagEnabled}
      />
    </BaseModal>
  )
}
