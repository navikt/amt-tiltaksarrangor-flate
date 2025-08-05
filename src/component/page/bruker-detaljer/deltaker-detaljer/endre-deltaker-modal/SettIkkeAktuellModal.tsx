import { useState } from 'react'

import { ikkeAktuellForslag } from '../../../../../api/forslag-api'
import { Nullable } from '../../../../../utils/types/or-nothing'
import { ModalDataProps } from '../ModalController'
import { EndringType } from '../types'
import { AarsakSelector } from './AarsakSelector'
import { Endringsmodal } from './endringsmodal/Endringsmodal'
import {
  useAarsakValidering,
  validerAarsakForm
} from './validering/aarsakValidering'
import { DeltakerStatusAarsakType } from '../../../../../api/data/deltakerStatusArsak'

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

  const onAarsakSelected = (
    nyAarsak: DeltakerStatusAarsakType,
    nyBeskrivelse: Nullable<string>
  ) => {
    settAarsak(nyAarsak)
    settBeskrivelse(nyBeskrivelse)
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
      <AarsakSelector
        tittel="Hva er årsaken til at personen ikke er aktuell?"
        onAarsakSelected={onAarsakSelected}
      />
    </Endringsmodal>
  )
}
