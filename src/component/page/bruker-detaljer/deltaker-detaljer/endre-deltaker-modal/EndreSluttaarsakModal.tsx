import { useState } from 'react'

import { DeltakerStatusAarsakType } from '../../../../../api/data/deltakerStatusArsak'
import { endreSluttarsakForslag } from '../../../../../api/forslag-api'
import { Nullable } from '../../../../../utils/types/or-nothing'
import { ModalDataProps } from '../ModalController'
import { EndringType } from '../types'
import { AarsakRadioGroup } from './AarsakRadioGroup'
import { Endringsmodal } from './endringsmodal/Endringsmodal'
import {
  useAarsakValidering,
  validerAarsakForm
} from './validering/aarsakValidering'

export const EndreSluttaarsakModal = ({
  deltaker,
  onClose,
  onForslagSendt
}: ModalDataProps) => {
  const [aarsak, settAarsak] = useState<DeltakerStatusAarsakType>()
  const [beskrivelse, settBeskrivelse] = useState<Nullable<string>>()
  const [begrunnelse, setBegrunnelse] = useState<string>()
  const { validering } = useAarsakValidering(aarsak, beskrivelse, begrunnelse)

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

  return (
    <Endringsmodal
      tittel="Endre sluttårsak"
      endringstype={EndringType.ENDRE_SLUTTAARSAK}
      erForslag={true}
      erSendKnappDisabled={!validering.isSuccess}
      begrunnelseType="valgfri"
      onClose={onClose}
      onSend={sendForslag}
      onBegrunnelse={(begrunnelse) => {
        setBegrunnelse(begrunnelse)
      }}
    >
      <AarsakRadioGroup
        legend="Hva er årsaken til at deltakeren ikke er aktuell?"
        aarsak={aarsak}
        beskrivelse={beskrivelse ?? undefined}
        onChange={(
          nyAarsak: DeltakerStatusAarsakType
        ) => {
          settAarsak(nyAarsak)
          settBeskrivelse(undefined)
        }}
        onBeskrivelse={(nyBeskrivelse) => settBeskrivelse(nyBeskrivelse ?? undefined)}
      />
    </Endringsmodal>
  )
}
