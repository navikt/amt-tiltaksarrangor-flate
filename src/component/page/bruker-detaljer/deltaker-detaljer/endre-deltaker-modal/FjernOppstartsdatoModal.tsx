import React, { useState } from 'react'

import { Endringsmodal } from './endringsmodal/Endringsmodal'
import {
  fjernOppstartsdatoForslag
} from '../../../../../api/forslag-api'
import { AktivtForslag } from '../../../../../api/data/forslag'
import { Deltaker, TiltakDeltakerStatus } from '../../../../../api/data/deltaker'
import { EndringType } from '../types'
import { validerObligatoriskBegrunnelse } from './validering/begrunnelseValidering'
import { BodyLong } from '@navikt/ds-react'

interface FjernOppstartsdatoModalProps {
  onClose: () => void
}

export interface FjernOppstartsdatoModalDataProps {
  readonly deltaker: Deltaker
  readonly visGodkjennVilkaarPanel: boolean
  readonly onForslagSendt: (forslag: AktivtForslag) => void
  readonly erForslagEnabled: boolean
}

export const FjernOppstartsdatoModal = ({
  deltaker,
  visGodkjennVilkaarPanel,
  onClose,
  onForslagSendt,
  erForslagEnabled
}: FjernOppstartsdatoModalProps & FjernOppstartsdatoModalDataProps) => {
  const [begrunnelse, setBegrunnelse] = useState('')
  const kanSendeForslag = erForslagEnabled &&
    deltaker.status.type === TiltakDeltakerStatus.VENTER_PA_OPPSTART && deltaker.startDato

  const sendForslag = () => {
    if (!kanSendeForslag) {
      return Promise.reject('Kan ikke fjerne oppstartsdato for deltaker som ikke venter på oppstart eller som mangler startdato')
    }

    return validerObligatoriskBegrunnelse(begrunnelse)
      .then(() =>
        fjernOppstartsdatoForslag(
          deltaker.id,
          begrunnelse
        )
      )
      .then((res) => onForslagSendt(res.data))
  }

  return (
    <Endringsmodal
      tittel="Fjerne oppstartsdato"
      endringstype={EndringType.FJERN_OPPSTARTSDATO}
      visGodkjennVilkaarPanel={visGodkjennVilkaarPanel}
      erForslag={erForslagEnabled}
      erSendKnappDisabled={!kanSendeForslag}
      begrunnelseType="obligatorisk"
      onClose={onClose}
      onSend={sendForslag}
      onBegrunnelse={(begrunnelse) => {
        setBegrunnelse(begrunnelse)
      }}
    >
      <BodyLong>
        Oppstartsdato nullstilles. Brukeren blir liggende i deltakeroversikten med status “Venter på oppstart” uten oppstartsdato.
      </BodyLong>
    </Endringsmodal>
  )
}