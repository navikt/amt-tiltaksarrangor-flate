import React, { useRef, useState } from 'react'

import { forlengDeltakelse } from '../../../../../api/tiltak-api'
import { maxDate } from '../../../../../utils/date-utils'
import { AktivtForslag } from '../../../../../api/data/forslag'
import { forlengDeltakelseForslag } from '../../../../../api/forslag-api'
import { Endringsmodal } from './endringsmodal/Endringsmodal'
import {
  gyldigObligatoriskBegrunnelse,
  validerObligatoriskBegrunnelse
} from './validering/begrunnelseValidering'
import { EndringType } from '../types'
import { SluttdatoRef, SluttdatoVelger } from './SluttdatoVelger'
import { Deltaker } from '../../../../../api/data/deltaker'
import { maxSluttdato } from './datoutils'
import dayjs from 'dayjs'

export interface ForlengDeltakelseModalProps {
  readonly onClose: () => void
}

export interface ForlengDeltakelseModalDataProps {
  readonly deltaker: Deltaker
  readonly visGodkjennVilkaarPanel: boolean
  readonly onEndringUtfort: () => void
  readonly onForslagSendt: (forslag: AktivtForslag) => void
  readonly erForslagEnabled: boolean
}

export const ForlengDeltakelseModal = (
  props: ForlengDeltakelseModalProps & ForlengDeltakelseModalDataProps
) => {
  const {
    deltaker,
    onClose,
    onEndringUtfort,
    visGodkjennVilkaarPanel,
    erForslagEnabled
  } = props
  const deltakerliste = deltaker.deltakerliste
  const minDato = maxDate(deltaker.sluttDato, deltakerliste.startDato)

  const [begrunnelse, setBegrunnelse] = useState('')
  const sluttdato = useRef<SluttdatoRef>(null)

  const kanSendeMelding = erForslagEnabled
    ? sluttdato !== null && gyldigObligatoriskBegrunnelse(begrunnelse)
    : sluttdato !== null

  const sendEndringsmelding = () => {
    if (!sluttdato.current?.validate() || !sluttdato.current.sluttdato) {
      return Promise.reject(
        'Endringsmeldingen kan ikke sendes fordi datoen er ikke gyldig.'
      )
    }
    return forlengDeltakelse(deltaker.id, sluttdato.current.sluttdato).then(
      onEndringUtfort
    )
  }

  const sendForslag = () => {
    if (!sluttdato.current?.sluttdato) {
      return Promise.reject(
        'Forslaget kan ikke sendes fordi datoen er ikke gyldig.'
      )
    }
    if (sluttdato.current && !sluttdato.current.validate()) {
      return Promise.reject(sluttdato.current.error)
    }

    const harIngenEndring =
      dayjs(sluttdato.current?.sluttdato).isSame(deltaker.sluttDato, 'day')

    if (harIngenEndring) {
      return Promise.reject('Innholdet i skjemaet medfører ingen endringer i deltakelsen på tiltaket. \nFor å lagre må minst ett felt i skjemaet være ulikt nåværende deltakelse.')
    }

    const dato = sluttdato.current.sluttdato
    return validerObligatoriskBegrunnelse(begrunnelse)
      .then(() => forlengDeltakelseForslag(deltaker.id, dato, begrunnelse))
      .then((res) => props.onForslagSendt(res.data))
  }

  return (
    <Endringsmodal
      tittel="Forleng deltakelse"
      endringstype={EndringType.FORLENG_DELTAKELSE}
      visGodkjennVilkaarPanel={visGodkjennVilkaarPanel}
      erForslag={erForslagEnabled}
      erSendKnappDisabled={!kanSendeMelding}
      begrunnelseType="obligatorisk"
      onClose={onClose}
      onSend={erForslagEnabled ? sendForslag : sendEndringsmelding}
      onBegrunnelse={(begrunnelse) => {
        setBegrunnelse(begrunnelse)
      }}
    >
      <SluttdatoVelger
        ref={sluttdato}
        tiltakskode={deltakerliste.tiltakstype}
        legend="Hvor lenge skal deltakelsen forlenges?"
        min={minDato ?? undefined}
        max={maxSluttdato(deltaker.startDato, deltakerliste)}
        defaultMaaned={deltaker.sluttDato ?? undefined}
      />
    </Endringsmodal>
  )
}
