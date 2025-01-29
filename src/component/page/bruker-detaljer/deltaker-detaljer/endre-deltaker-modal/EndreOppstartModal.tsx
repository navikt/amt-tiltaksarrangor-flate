import React, { useRef, useState } from 'react'

import { endreOppstartsdato } from '../../../../../api/tiltak-api'
import { Nullable } from '../../../../../utils/types/or-nothing'
import { AktivtForslag } from '../../../../../api/data/forslag'
import {
  gyldigObligatoriskBegrunnelse,
  validerObligatoriskBegrunnelse
} from './validering/begrunnelseValidering'
import { endreStartdatoForslag } from '../../../../../api/forslag-api'
import { Endringsmodal } from './endringsmodal/Endringsmodal'
import { DateField } from '../../../../felles/DateField'
import { Deltaker } from '../../../../../api/data/deltaker'
import { EndringType } from '../types'
import { kalkulerMaxDato, kalkulerMinDato, maxSluttdato } from './datoutils'
import { SluttdatoVelger, SluttdatoRef } from './SluttdatoVelger'
import { finnValgtVarighet } from './varighet'
import dayjs from 'dayjs'
import { Tiltakskode } from '../../../../../api/data/tiltak'

export interface EndreOppstartModalProps {
  onClose: () => void
}

export interface EndreOppstartModalDataProps {
  readonly deltaker: Deltaker
  readonly visGodkjennVilkaarPanel: boolean
  readonly onEndringUtfort: () => void
  readonly onForslagSendt: (forslag: AktivtForslag) => void
  readonly erForslagEnabled: boolean
}

export const EndreOppstartModal = ({
  deltaker,
  visGodkjennVilkaarPanel,
  onEndringUtfort,
  onForslagSendt,
  onClose,
  erForslagEnabled
}: EndreOppstartModalProps & EndreOppstartModalDataProps) => {
  const [startdato, setStartdato] = useState<Nullable<Date>>(deltaker.startDato)
  const [begrunnelse, setBegrunnelse] = useState<string>('')
  const skalVelgeVarighet = erForslagEnabled && deltaker.deltakerliste.tiltakstype != Tiltakskode.VASV
  const sluttdato = useRef<SluttdatoRef>(null)

  const kanSendeMelding = erForslagEnabled
    ? startdato !== null && gyldigObligatoriskBegrunnelse(begrunnelse)
    : startdato !== null

  const sendEndringsmelding = () => {
    if (!startdato) {
      return Promise.reject('Startdato må være valgt for å sende endring')
    }
    return endreOppstartsdato(deltaker.id, startdato).then(onEndringUtfort)
  }

  const sendForslag = () => {
    if (!startdato) {
      return Promise.reject('Startdato må være valgt for å sende endring')
    }
    if (sluttdato.current && !sluttdato.current.validate()) {
      return Promise.reject('Du må velge en gyldig sluttdato')
    }

    const harIngenEndring =
      dayjs(startdato).isSame(deltaker.startDato, 'day') &&
      dayjs(sluttdato.current?.sluttdato).isSame(deltaker.sluttDato, 'day')

    if (harIngenEndring) {
      return Promise.reject('Innholdet i skjemaet medfører ingen endringer i deltakelsen på tiltaket. \nFor å lagre må minst ett felt i skjemaet være ulikt nåværende deltakelse.')
    }

    return validerObligatoriskBegrunnelse(begrunnelse)
      .then(() =>
        endreStartdatoForslag(
          deltaker.id,
          startdato,
          sluttdato.current?.sluttdato,
          begrunnelse
        )
      )
      .then((res) => onForslagSendt(res.data))
  }

  return (
    <Endringsmodal
      tittel="Endre oppstartsdato"
      endringstype={EndringType.ENDRE_OPPSTARTSDATO}
      visGodkjennVilkaarPanel={visGodkjennVilkaarPanel}
      erSendKnappDisabled={!kanSendeMelding}
      erForslag={erForslagEnabled}
      onClose={onClose}
      onSend={erForslagEnabled ? sendForslag : sendEndringsmelding}
      begrunnelseType="obligatorisk"
      onBegrunnelse={(begrunnelse) => {
        setBegrunnelse(begrunnelse)
      }}
    >
      <DateField
        label="Ny oppstartsdato"
        defaultDate={startdato}
        onDateChanged={(d) => setStartdato(d)}
        min={kalkulerMinDato(deltaker.deltakerliste.startDato)}
        max={kalkulerMaxDato(deltaker.deltakerliste.sluttDato)}
      />
      {skalVelgeVarighet && (
        <SluttdatoVelger
          ref={sluttdato}
          erForOppstartsdato={true}
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
    </Endringsmodal>
  )
}
