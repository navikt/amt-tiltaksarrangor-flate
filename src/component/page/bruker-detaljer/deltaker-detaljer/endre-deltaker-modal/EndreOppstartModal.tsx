import React, { useState } from 'react'

import { endreOppstartsdato } from '../../../../../api/tiltak-api'
import { Nullable } from '../../../../../utils/types/or-nothing'
import { AktivtForslag } from '../../../../../api/data/forslag'
import { useDeltakerlisteStore } from '../deltakerliste-store'
import {
  gyldigObligatoriskBegrunnelse,
  validerObligatoriskBegrunnelse
} from './validering/begrunnelseValidering'
import { endreStartdatoForslag } from '../../../../../api/forslag-api'
import { Endringsmodal } from './endringsmodal/Endringsmodal'
import { DateField } from '../../../../felles/DateField'
import { Deltaker } from '../../../../../api/data/deltaker'
import { EndringType } from '../types'
import { kalkulerMaxDato, kalkulerMinDato } from './datoutils'
import { SluttdatoVelger } from './SluttdatoVelger'
import { VarighetValg } from './varighet'

export interface EndreOppstartModalProps {
  onClose: () => void
}

export interface EndreOppstartModalDataProps {
  readonly deltaker: Deltaker
  readonly visGodkjennVilkaarPanel: boolean
  readonly onEndringUtfort: () => void
  readonly onForslagSendt: (forslag: AktivtForslag) => void
  readonly erForslagEnabled: boolean
}

export const EndreOppstartModal = ({
  deltaker,
  visGodkjennVilkaarPanel,
  onEndringUtfort,
  onForslagSendt,
  onClose,
  erForslagEnabled
}: EndreOppstartModalProps & EndreOppstartModalDataProps) => {
  const [valgtDato, setValgtDato] = useState<Nullable<Date>>(deltaker.startDato)
  const [begrunnelse, setBegrunnelse] = useState<string>('')
  const { deltakerliste } = useDeltakerlisteStore()
  const [sluttdato, setSluttdato] = useState<Nullable<Date>>(deltaker.sluttDato)

  const kanSendeMelding = erForslagEnabled
    ? valgtDato !== null && gyldigObligatoriskBegrunnelse(begrunnelse)
    : valgtDato !== null

  const sendEndringsmelding = () => {
    return endreOppstartsdato(deltaker.id, valgtDato).then(onEndringUtfort)
  }

  const sendForslag = () => {
    if (!valgtDato) {
      return Promise.reject('Startdato må være valgt for å sende endring')
    }
    return validerObligatoriskBegrunnelse(begrunnelse)
      .then(() =>
        endreStartdatoForslag(
          deltaker.id,
          valgtDato,
          sluttdato ?? undefined,
          begrunnelse
        )
      )
      .then((res) => onForslagSendt(res.data))
  }

  return (
    <Endringsmodal
      tittel="Endre oppstartsdato"
      endringstype={EndringType.ENDRE_OPPSTARTSDATO}
      visGodkjennVilkaarPanel={visGodkjennVilkaarPanel}
      erSendKnappDisabled={!kanSendeMelding}
      erForslag={erForslagEnabled}
      onClose={onClose}
      onSend={erForslagEnabled ? sendForslag : sendEndringsmelding}
      begrunnelseType="obligatorisk"
      onBegrunnelse={(begrunnelse) => {
        setBegrunnelse(begrunnelse)
      }}
    >
      <DateField
        label="Ny oppstartsdato"
        defaultDate={valgtDato}
        onDateChanged={(d) => setValgtDato(d)}
        min={kalkulerMinDato(deltakerliste.startDato)}
        max={kalkulerMaxDato(deltakerliste.sluttDato)}
      />
      {erForslagEnabled && (
        <SluttdatoVelger
          tiltakskode={deltakerliste.tiltakstype}
          legend="Hva er forventet varighet?"
          mindato={valgtDato}
          maxdato={deltakerliste.sluttDato}
          defaultSluttdato={deltaker.sluttDato}
          defaultVarighet={VarighetValg.ANNET}
          onChange={(d) => setSluttdato(d)}
        />
      )}
    </Endringsmodal>
  )
}
