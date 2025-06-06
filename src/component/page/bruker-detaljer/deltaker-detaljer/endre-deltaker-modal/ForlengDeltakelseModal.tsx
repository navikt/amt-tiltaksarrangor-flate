import { useRef, useState } from 'react'

import dayjs from 'dayjs'
import { forlengDeltakelseForslag } from '../../../../../api/forslag-api'
import { maxDate } from '../../../../../utils/date-utils'
import { ModalDataProps } from '../ModalController'
import { EndringType } from '../types'
import { SluttdatoRef, SluttdatoVelger } from './SluttdatoVelger'
import { maxSluttdato } from './datoutils'
import { Endringsmodal } from './endringsmodal/Endringsmodal'
import {
  gyldigObligatoriskBegrunnelse,
  validerObligatoriskBegrunnelse
} from './validering/begrunnelseValidering'

export const ForlengDeltakelseModal = (props: ModalDataProps) => {
  const {
    deltaker,
    onClose,
    visGodkjennVilkaarPanel
  } = props
  const deltakerliste = deltaker.deltakerliste
  const minDato = maxDate(dayjs(deltaker.sluttDato).add(1, 'day').toDate(), deltakerliste.startDato)

  const [begrunnelse, setBegrunnelse] = useState('')
  const sluttdato = useRef<SluttdatoRef>(null)

  const kanSendeMelding = sluttdato !== null && gyldigObligatoriskBegrunnelse(begrunnelse)

  const sendForslag = () => {
    if (!sluttdato.current?.sluttdato) {
      return Promise.reject(
        'Forslaget kan ikke sendes fordi datoen ikke er gyldig.'
      )
    }
    if (sluttdato.current && !sluttdato.current.validate()) {
      return Promise.reject(sluttdato.current.error)
    }

    const harIngenEndring =
      dayjs(sluttdato.current?.sluttdato).isSame(deltaker.sluttDato, 'day')

    if (harIngenEndring) {
      return Promise.reject('Innholdet i skjemaet medfører ingen endringer i deltakelsen på tiltaket. \nFor å lagre må minst ett felt i skjemaet være ulikt nåværende deltakelse.')
    }

    const dato = sluttdato.current.sluttdato
    return validerObligatoriskBegrunnelse(begrunnelse)
      .then(() => forlengDeltakelseForslag(deltaker.id, dato, begrunnelse))
      .then((res) => props.onForslagSendt(res.data))
  }

  return (
    <Endringsmodal
      tittel="Forleng deltakelse"
      endringstype={EndringType.FORLENG_DELTAKELSE}
      visGodkjennVilkaarPanel={visGodkjennVilkaarPanel}
      erForslag={true}
      erSendKnappDisabled={!kanSendeMelding}
      begrunnelseType="obligatorisk"
      onClose={onClose}
      onSend={sendForslag}
      onBegrunnelse={(begrunnelse) => {
        setBegrunnelse(begrunnelse)
      }}
    >
      <SluttdatoVelger
        ref={sluttdato}
        tiltakskode={deltakerliste.tiltakstype}
        legend="Hvor lenge skal deltakelsen forlenges?"
        min={minDato ?? undefined}
        max={maxSluttdato(deltaker.startDato, deltakerliste)}
        defaultMaaned={deltaker.sluttDato ?? undefined}
      />
    </Endringsmodal>
  )
}
