import React, { useState } from 'react'

import { postEndreSluttdato } from '../../../../../api/tiltak-api'
import { Nullable } from '../../../../../utils/types/or-nothing'
import { Endringsmodal } from './endringsmodal/Endringsmodal'
import { DateField } from '../../../../felles/DateField'
import { AktivtForslag } from '../../../../../api/data/forslag'
import { endreSluttdatoForslag } from '../../../../../api/forslag-api'
import {
  gyldigObligatoriskBegrunnelse,
  validerObligatoriskBegrunnelse
} from './validering/begrunnelseValidering'
import { EndringType } from '../types'
import { kalkulerMinDato, maxSluttdato } from './datoutils'
import { Deltaker } from '../../../../../api/data/deltaker'
import dayjs from 'dayjs'

export interface EndreSluttdatoModalProps {
  onClose: () => void
}

export interface EndreSluttdatoModalDataProps {
  readonly deltaker: Deltaker
  readonly visGodkjennVilkaarPanel: boolean
  readonly onEndringUtfort: () => void
  readonly onForslagSendt: (forslag: AktivtForslag) => void
  readonly erForslagEnabled: boolean
}

export const EndreSluttdatoModal = ({
  deltaker,
  visGodkjennVilkaarPanel,
  onEndringUtfort,
  onForslagSendt,
  onClose,
  erForslagEnabled
}: EndreSluttdatoModalProps & EndreSluttdatoModalDataProps) => {
  const [valgtDato, setValgtDato] = useState<Nullable<Date>>()
  const [begrunnelse, setBegrunnelse] = useState<string>('')

  const kanSendeMelding = erForslagEnabled
    ? valgtDato !== null && gyldigObligatoriskBegrunnelse(begrunnelse)
    : valgtDato !== null

  const sendEndringsmelding = () => {
    if (!valgtDato)
      return Promise.reject('Sluttdato må være valgt for å sende endring')

    return postEndreSluttdato(deltaker.id, valgtDato).then(onEndringUtfort)
  }

  const sendForslag = () => {
    if (!valgtDato) {
      return Promise.reject('Sluttdato må være valgt for å sende endring')
    }

    if (dayjs(valgtDato).isSame(deltaker.sluttDato, 'day')) {
      return Promise.reject('Innholdet i skjemaet medfører ingen endringer i deltakelsen på tiltaket. \nFor å lagre må minst ett felt i skjemaet være ulikt nåværende deltakelse.')
    }

    return validerObligatoriskBegrunnelse(begrunnelse)
      .then(() => endreSluttdatoForslag(deltaker.id, valgtDato, begrunnelse))
      .then((res) => onForslagSendt(res.data))
  }

  return (
    <Endringsmodal
      tittel="Endre sluttdato"
      endringstype={EndringType.ENDRE_SLUTTDATO}
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
        label="Ny sluttdato"
        defaultDate={valgtDato}
        onDateChanged={(d) => setValgtDato(d)}
        min={kalkulerMinDato(deltaker.startDato)}
        max={maxSluttdato(deltaker.startDato, deltaker.deltakerliste)}
      />
    </Endringsmodal>
  )
}
