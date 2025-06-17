import { useState } from 'react'

import dayjs from 'dayjs'
import { endreSluttdatoForslag } from '../../../../../api/forslag-api'
import { Nullable } from '../../../../../utils/types/or-nothing'
import { DateField } from '../../../../felles/DateField'
import { ModalDataProps } from '../ModalController'
import { EndringType } from '../types'
import { kalkulerMinDato, maxSluttdato } from './datoutils'
import { Endringsmodal } from './endringsmodal/Endringsmodal'
import {
  gyldigObligatoriskBegrunnelse,
  validerObligatoriskBegrunnelse
} from './validering/begrunnelseValidering'

export const EndreSluttdatoModal = ({
  deltaker,
  visGodkjennVilkaarPanel,
  onForslagSendt,
  onClose
}: ModalDataProps) => {
  const [valgtDato, setValgtDato] = useState<Nullable<Date>>()
  const [begrunnelse, setBegrunnelse] = useState<string>('')

  const kanSendeMelding = valgtDato !== null && gyldigObligatoriskBegrunnelse(begrunnelse)

  const sendForslag = () => {
    if (!valgtDato) {
      return Promise.reject('Sluttdato må være valgt for å sende endring')
    }

    if (dayjs(valgtDato).isSame(deltaker.sluttDato, 'day')) {
      return Promise.reject('Innholdet i skjemaet medfører ingen endringer i deltakelsen på tiltaket. \nFor å lagre må minst ett felt i skjemaet være ulikt nåværende deltakelse.')
    }

    return validerObligatoriskBegrunnelse(begrunnelse)
      .then(() => endreSluttdatoForslag(deltaker.id, valgtDato, begrunnelse))
      .then((res) => onForslagSendt(res.data))
  }

  return (
    <Endringsmodal
      tittel="Endre sluttdato"
      endringstype={EndringType.ENDRE_SLUTTDATO}
      visGodkjennVilkaarPanel={visGodkjennVilkaarPanel}
      erSendKnappDisabled={!kanSendeMelding}
      erForslag={true}
      onClose={onClose}
      onSend={sendForslag}
      begrunnelseType="obligatorisk"
      onBegrunnelse={(begrunnelse) => {
        setBegrunnelse(begrunnelse)
      }}
    >
      <DateField
        label="Ny sluttdato"
        defaultDate={valgtDato}
        onDateChanged={(d) => setValgtDato(d)}
        min={kalkulerMinDato(deltaker.startDato)}
        max={maxSluttdato(deltaker.startDato, deltaker.deltakerliste)}
      />
    </Endringsmodal>
  )
}
