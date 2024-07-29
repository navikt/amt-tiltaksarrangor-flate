import React, { useEffect, useState } from 'react'

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
import { SluttdatoVelger } from './SluttdatoVelger'

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
  const [nySluttDato, settNySluttDato] = useState<Nullable<Date>>()
  const [begrunnelse, setBegrunnelse] = useState('')
  const { deltakerliste } = useDeltakerlisteStore()
  const minDato = maxDate(sluttDato, deltakerliste.startDato)

  const kanSendeMelding = erForslagEnabled
    ? nySluttDato !== null && gyldigObligatoriskBegrunnelse(begrunnelse)
    : nySluttDato !== null

  const sendEndringsmelding = () => {
    if (!nySluttDato) {
      return Promise.reject(
        'Kan ikke sende ForlengDeltakelse endringsmelding uten sluttdato'
      )
    }
    return forlengDeltakelse(deltakerId, nySluttDato).then(onEndringUtfort)
  }

  const sendForslag = () => {
    if (!nySluttDato) {
      return Promise.reject(
        'Kan ikke sende ForlengDeltakelse forslag uten sluttdato'
      )
    }
    return validerObligatoriskBegrunnelse(begrunnelse)
      .then(() =>
        forlengDeltakelseForslag(deltakerId, nySluttDato, begrunnelse)
      )
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
        tiltakskode={deltakerliste.tiltakstype}
        legend="Hvor lenge skal deltakelsen forlenges?"
        mindato={minDato}
        maxdato={deltakerliste.sluttDato}
        onChange={(d) => settNySluttDato(d)}
      />
    </Endringsmodal>
  )
}
