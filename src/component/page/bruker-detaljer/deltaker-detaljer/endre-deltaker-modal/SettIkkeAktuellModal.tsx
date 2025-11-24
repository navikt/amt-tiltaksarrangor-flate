import { useState } from 'react'

import { DeltakerStatusAarsakType } from '../../../../../api/data/deltakerStatusArsak'
import { ikkeAktuellForslag } from '../../../../../api/forslag-api'
import { Nullable } from '../../../../../utils/types/or-nothing'
import { ModalDataProps } from '../ModalController'
import { EndringType } from '../types'
import { AarsakRadioGroup } from './AarsakRadioGroup'
import { Endringsmodal } from './endringsmodal/Endringsmodal'
import {
  useAarsakValidering,
  validerAarsakForm
} from './validering/aarsakValidering'

export const SettIkkeAktuellModal = ({
  deltaker,
  onClose,
  onForslagSendt,
}: ModalDataProps) => {
  const [aarsak, settAarsak] = useState<DeltakerStatusAarsakType>()
  const [beskrivelse, settBeskrivelse] = useState<Nullable<string>>()
  const [begrunnelse, setBegrunnelse] = useState<string>()

  const { validering } = useAarsakValidering(aarsak, beskrivelse, begrunnelse)

  const sendForslag = () => {
    return validerAarsakForm(aarsak, beskrivelse, begrunnelse)
      .then((validertForm) =>
        ikkeAktuellForslag(
          deltaker.id,
          validertForm.forslag.aarsak,
          validertForm.forslag.begrunnelse
        )
      )
      .then((res) => onForslagSendt(res.data))
  }

  return (
    <Endringsmodal
      tittel="Er ikke aktuell"
      endringstype={EndringType.DELTAKER_IKKE_AKTUELL}
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
        legend="Hva er årsaken til at personen ikke er aktuell?"
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
