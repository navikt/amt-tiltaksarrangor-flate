import React, { useState } from 'react'

import { DeltakerStatusAarsakType } from '../../../../../api/data/endringsmelding'
import { deltakerIkkeAktuell } from '../../../../../api/tiltak-api'
import { Nullable } from '../../../../../utils/types/or-nothing'
import { AarsakSelector } from './AarsakSelector'
import { Endringsmodal } from './endringsmodal/Endringsmodal'
import { ikkeAktuellForslag } from '../../../../../api/forslag-api'
import {
  useAarsakValidering,
  validerAarsakForm
} from './validering/aarsakValidering'
import { EndringType } from '../types'
import { ModalDataProps } from '../ModalController'

export const SettIkkeAktuellModal = ({
  deltaker,
  onClose,
  visGodkjennVilkaarPanel,
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
        deltakerIkkeAktuell(deltaker.id, validertForm.endringsmelding.aarsak)
      )
      .then(onEndringUtfort)
  }

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
        tittel="Hva er årsaken til at personen ikke er aktuell?"
        onAarsakSelected={onAarsakSelected}
      />
    </Endringsmodal>
  )
}
