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
import { kalkulerMaxDato, kalkulerMinDato } from './LeggTilEndreDatoModal'
import styles from './EndreOppstartModal.module.scss'
import { Deltaker } from '../../../../../api/data/deltaker'

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
  const [valgtDato, setValgtDato] = useState<Nullable<Date>>()
  const [begrunnelse, setBegrunnelse] = useState<string>('')
  const { deltakerliste } = useDeltakerlisteStore()

  const kanSendeMelding = erForslagEnabled
    ? valgtDato !== null && gyldigObligatoriskBegrunnelse(begrunnelse)
    : valgtDato !== null

  const sendEndringsmelding = () => {
    if (!valgtDato)
      return Promise.reject('Startdato må være valgt for å sende endring')

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
          deltaker.sluttDato ?? undefined,
          begrunnelse
        )
      )
      .then((res) => onForslagSendt(res.data))
  }

  return (
    <Endringsmodal
      tittel="Endre oppstartsdato"
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
        className={styles.datofelt}
        label="Ny oppstartsdato"
        date={valgtDato}
        onDateChanged={(d) => setValgtDato(d)}
        min={kalkulerMinDato(deltakerliste.startDato)}
        max={kalkulerMaxDato(deltakerliste.sluttDato)}
      />
    </Endringsmodal>
  )
}
