import React, { useState } from 'react'

import { DeltakerStatusAarsakType } from '../../../../../api/data/endringsmelding'
import { endreSluttaarsak } from '../../../../../api/tiltak-api'
import { Nullable } from '../../../../../utils/types/or-nothing'
import { AarsakSelector } from './AarsakSelector'
import { Endringsmodal } from './endringsmodal/Endringsmodal'
import {
  useAarsakValidering,
  validerAarsakForm
} from './validering/aarsakValidering'
import { endreSluttarsakForslag } from '../../../../../api/forslag-api'
import { EndringType } from '../types'
import { ModalDataProps } from '../ModalController'
import { TiltakDeltakerStatus } from '../../../../../api/data/deltaker'

export const EndreSluttaarsakModal = ({
  deltaker,
  visGodkjennVilkaarPanel,
  onClose,
  onEndringUtfort,
  onForslagSendt,
  erForslagEnabled
}: ModalDataProps) => {
  const [aarsak, settAarsak] = useState<DeltakerStatusAarsakType>()
  const [beskrivelse, settBeskrivelse] = useState<Nullable<string>>()
  const [begrunnelse, setBegrunnelse] = useState<string>()
  const { validering } = useAarsakValidering(aarsak, beskrivelse, begrunnelse)

  const sendEndringsmelding = () => {
    return validerAarsakForm(aarsak, beskrivelse)
      .then((validertForm) =>
        endreSluttaarsak(deltaker.id, validertForm.endringsmelding.aarsak)
      )
      .then(onEndringUtfort)
  }

  const sendForslag = () => {
    const harIngenEndring = aarsak === deltaker.status.aarsak?.type &&
      beskrivelse === deltaker.status.aarsak?.beskrivelse

    if (harIngenEndring) {
      return Promise.reject('Innholdet i skjemaet medfører ingen endringer i deltakelsen på tiltaket. \nFor å lagre må minst ett felt i skjemaet være ulikt nåværende deltakelse.')
    }

    return validerAarsakForm(aarsak, beskrivelse, begrunnelse)
      .then((validertForm) =>
        endreSluttarsakForslag(
          deltaker.id,
          validertForm.forslag.aarsak,
          validertForm.forslag.begrunnelse
        )
      )
      .then((res) => onForslagSendt(res.data))
  }

  const onAarsakSelected = (
    nyAarsak: DeltakerStatusAarsakType,
    nyBeskrivelse: Nullable<string>
  ) => {
    settAarsak(nyAarsak)
    settBeskrivelse(nyBeskrivelse)
  }

  return (
    <Endringsmodal
      tittel="Endre sluttårsak"
      endringstype={EndringType.ENDRE_SLUTTAARSAK}
      visGodkjennVilkaarPanel={visGodkjennVilkaarPanel}
      erForslag={erForslagEnabled}
      erSendKnappDisabled={!validering.isSuccess}
      begrunnelseType="valgfri"
      onClose={onClose}
      onSend={erForslagEnabled ? sendForslag : sendEndringsmelding}
      onBegrunnelse={(begrunnelse) => {
        setBegrunnelse(begrunnelse)
      }}
    >
      <AarsakSelector
        tittel={
          deltaker.status.type === TiltakDeltakerStatus.IKKE_AKTUELL
            ? 'Hva er årsaken til at deltakeren ikke er aktuell?'
            : 'Hva er årsaken til avslutning?'
        }
        onAarsakSelected={onAarsakSelected}
      />
    </Endringsmodal>
  )
}
