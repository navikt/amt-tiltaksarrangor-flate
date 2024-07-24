import React, { useState } from 'react'

import { postEndreSluttdato } from '../../../../../api/tiltak-api'
import { Nullable } from '../../../../../utils/types/or-nothing'
import { kalkulerMaxDato, kalkulerMinDato } from './LeggTilEndreDatoModal'
import { useDeltakerlisteStore } from '../deltakerliste-store'
import { Endringsmodal } from './endringsmodal/Endringsmodal'
import { DateField } from '../../../../felles/DateField'
import styles from './EndreOppstartModal.module.scss'
import { AktivtForslag } from '../../../../../api/data/forslag'
import { endreSluttdatoForslag } from '../../../../../api/forslag-api'
import {
  gyldigObligatoriskBegrunnelse,
  validerObligatoriskBegrunnelse
} from './validering/begrunnelseValidering'

export interface EndreSluttdatoModalProps {
  onClose: () => void
}

export interface EndreSluttdatoModalDataProps {
  readonly deltakerId: string
  readonly visGodkjennVilkaarPanel: boolean
  readonly onEndringUtfort: () => void
  readonly onForslagSendt: (forslag: AktivtForslag) => void
  readonly erForslagEnabled: boolean
}

export const EndreSluttdatoModal = ({
  deltakerId,
  visGodkjennVilkaarPanel,
  onEndringUtfort,
  onForslagSendt,
  onClose,
  erForslagEnabled
}: EndreSluttdatoModalProps & EndreSluttdatoModalDataProps) => {
  const [valgtDato, setNyDato] = useState<Nullable<Date>>()
  const [begrunnelse, setBegrunnelse] = useState<string>('')
  const { deltakerliste } = useDeltakerlisteStore()

  const kanSendeMelding = erForslagEnabled
    ? valgtDato !== null && gyldigObligatoriskBegrunnelse(begrunnelse)
    : valgtDato !== null

  const sendEndringsmelding = () => {
    if (!valgtDato)
      return Promise.reject('Sluttdato må være valgt for å sende endring')

    return postEndreSluttdato(deltakerId, valgtDato).then(onEndringUtfort)
  }

  const sendForslag = () => {
    if (!valgtDato) {
      return Promise.reject('Sluttdato må være valgt for å sende endring')
    }
    return validerObligatoriskBegrunnelse(begrunnelse)
      .then(() => endreSluttdatoForslag(deltakerId, valgtDato, begrunnelse))
      .then((res) => onForslagSendt(res.data))
  }

  return (
    <Endringsmodal
      tittel="Endre sluttdato"
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
        label="Ny sluttdato"
        date={valgtDato}
        onDateChanged={(d) => setNyDato(d)}
        min={kalkulerMinDato(deltakerliste.startDato)}
        max={kalkulerMaxDato(deltakerliste.sluttDato)}
      />
    </Endringsmodal>
  )
}
