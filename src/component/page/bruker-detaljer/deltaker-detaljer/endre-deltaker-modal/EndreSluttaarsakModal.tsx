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
import { AktivtForslag } from '../../../../../api/data/forslag'
import { IndividuellDeltakerStatus } from '../../../../../api/data/deltaker'

interface EndreSluttaarsakModalProps {
  onClose: () => void
}

export interface EndreSluttaarsakModalDataProps {
  readonly deltakerId: string
  readonly deltakerStatus:
    | IndividuellDeltakerStatus.IKKE_AKTUELL
    | IndividuellDeltakerStatus.HAR_SLUTTET
  readonly visGodkjennVilkaarPanel: boolean
  readonly onEndringUtfort: () => void
  readonly onForslagSendt: (forslag: AktivtForslag) => void
  readonly erForslagEnabled: boolean
}

export const EndreSluttaarsakModal = ({
  deltakerId,
  deltakerStatus,
  visGodkjennVilkaarPanel,
  onClose,
  onEndringUtfort,
  onForslagSendt,
  erForslagEnabled
}: EndreSluttaarsakModalProps & EndreSluttaarsakModalDataProps) => {
  const [aarsak, settAarsak] = useState<DeltakerStatusAarsakType>()
  const [beskrivelse, settBeskrivelse] = useState<Nullable<string>>()
  const [begrunnelse, setBegrunnelse] = useState<string>()
  const { validering } = useAarsakValidering(aarsak, beskrivelse, begrunnelse)

  const sendEndringsmelding = () => {
    return validerAarsakForm(aarsak, beskrivelse)
      .then((validertForm) =>
        endreSluttaarsak(deltakerId, validertForm.endringsmelding.aarsak)
      )
      .then(onEndringUtfort)
  }

  const sendForslag = () => {
    return validerAarsakForm(aarsak, beskrivelse, begrunnelse)
      .then((validertForm) =>
        endreSluttarsakForslag(
          deltakerId,
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
          deltakerStatus === IndividuellDeltakerStatus.HAR_SLUTTET
            ? 'Hva er årsaken til avslutning?'
            : 'Hva er årsaken til at deltakeren ikke er aktuell?'
        }
        onAarsakSelected={onAarsakSelected}
      />
    </Endringsmodal>
  )
}
