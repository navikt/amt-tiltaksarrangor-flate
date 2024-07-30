import React, { useRef, useState } from 'react'

import { Tiltakskode } from '../../../../../api/data/tiltak'
import { forlengDeltakelse } from '../../../../../api/tiltak-api'
import { maxDate } from '../../../../../utils/date-utils'
import { Nullable } from '../../../../../utils/types/or-nothing'
import { useDeltakerlisteStore } from '../deltakerliste-store'
import { AktivtForslag } from '../../../../../api/data/forslag'
import { forlengDeltakelseForslag } from '../../../../../api/forslag-api'
import { Endringsmodal } from './endringsmodal/Endringsmodal'
import {
  gyldigObligatoriskBegrunnelse,
  validerObligatoriskBegrunnelse
} from './validering/begrunnelseValidering'
import { EndringType } from '../types'
import { SluttdatoRef, SluttdatoVelger } from './SluttdatoVelger'

export interface ForlengDeltakelseModalProps {
  readonly onClose: () => void
}

export interface ForlengDeltakelseModalDataProps {
  readonly deltakerId: string
  readonly startDato: Nullable<Date>
  readonly sluttDato: Nullable<Date>
  readonly tiltakskode: Tiltakskode
  readonly visGodkjennVilkaarPanel: boolean
  readonly onEndringUtfort: () => void
  readonly onForslagSendt: (forslag: AktivtForslag) => void
  readonly erForslagEnabled: boolean
}

export const ForlengDeltakelseModal = (
  props: ForlengDeltakelseModalProps & ForlengDeltakelseModalDataProps
) => {
  const {
    deltakerId,
    sluttDato,
    onClose,
    onEndringUtfort,
    visGodkjennVilkaarPanel,
    erForslagEnabled
  } = props
  const [begrunnelse, setBegrunnelse] = useState('')
  const { deltakerliste } = useDeltakerlisteStore()
  const minDato = maxDate(sluttDato, deltakerliste.startDato)

  const sluttdato = useRef<SluttdatoRef>(null)

  const kanSendeMelding = erForslagEnabled
    ? !sluttdato.current?.sluttdato &&
      gyldigObligatoriskBegrunnelse(begrunnelse)
    : !sluttdato.current?.sluttdato

  const sendEndringsmelding = () => {
    if (!sluttdato.current?.validate() || !sluttdato.current.sluttdato) {
      return Promise.reject(
        'Kan ikke sende ForlengDeltakelse endringsmelding uten sluttdato'
      )
    }
    return forlengDeltakelse(deltakerId, sluttdato.current.sluttdato).then(
      onEndringUtfort
    )
  }

  const sendForslag = () => {
    if (!sluttdato.current || !sluttdato.current?.sluttdato) {
      return Promise.reject(
        'Kan ikke sende ForlengDeltakelse forslag uten sluttdato'
      )
    }
    if (sluttdato.current && !sluttdato.current.validate()) {
      return Promise.reject(sluttdato.current.error)
    }

    const dato = sluttdato.current.sluttdato
    return validerObligatoriskBegrunnelse(begrunnelse)
      .then(() => forlengDeltakelseForslag(deltakerId, dato, begrunnelse))
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
        max={deltakerliste.sluttDato ?? undefined}
      />
    </Endringsmodal>
  )
}
