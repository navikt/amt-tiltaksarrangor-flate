import { useRef, useState } from 'react'

import dayjs from 'dayjs'
import { Tiltakskode } from '../../../../../api/data/tiltak'
import { endreStartdatoForslag } from '../../../../../api/forslag-api'
import { Nullable } from '../../../../../utils/types/or-nothing'
import { DateField } from '../../../../felles/DateField'
import { ModalDataProps } from '../ModalController'
import { EndringType } from '../types'
import { kalkulerMaxDato, kalkulerMinDato, maxSluttdato } from './datoutils'
import { Endringsmodal } from './endringsmodal/Endringsmodal'
import { SluttdatoRef, SluttdatoVelger } from './SluttdatoVelger'
import {
  gyldigObligatoriskBegrunnelse,
  validerObligatoriskBegrunnelse
} from './validering/begrunnelseValidering'
import { finnValgtVarighet } from './varighet'

export const EndreOppstartModal = ({
  deltaker,
  onForslagSendt,
  onClose
}: ModalDataProps) => {
  const [startdato, setStartdato] = useState<Nullable<Date>>(deltaker.startDato)
  const [begrunnelse, setBegrunnelse] = useState<string>('')
  const skalVelgeVarighet = deltaker.deltakerliste.tiltakstype != Tiltakskode.VARIG_TILRETTELAGT_ARBEID_SKJERMET
  const sluttdato = useRef<SluttdatoRef>(null)

  const kanSendeMelding = startdato !== null && gyldigObligatoriskBegrunnelse(begrunnelse)

  const sendForslag = () => {
    if (!startdato) {
      return Promise.reject('Startdato må være valgt for å sende endring')
    }
    if (sluttdato.current && !sluttdato.current.validate()) {
      return Promise.reject('Du må velge en gyldig sluttdato')
    }

    const harIngenEndring =
      dayjs(startdato).isSame(deltaker.startDato, 'day') &&
      dayjs(sluttdato.current?.sluttdato).isSame(deltaker.sluttDato, 'day')

    if (harIngenEndring) {
      return Promise.reject('Innholdet i skjemaet medfører ingen endringer i deltakelsen på tiltaket. \nFor å lagre må minst ett felt i skjemaet være ulikt nåværende deltakelse.')
    }

    return validerObligatoriskBegrunnelse(begrunnelse)
      .then(() =>
        endreStartdatoForslag(
          deltaker.id,
          startdato,
          sluttdato.current?.sluttdato,
          begrunnelse
        )
      )
      .then((res) => onForslagSendt(res.data))
  }

  return (
    <Endringsmodal
      tittel="Endre oppstartsdato"
      endringstype={EndringType.ENDRE_OPPSTARTSDATO}
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
        label="Ny oppstartsdato"
        defaultDate={startdato}
        onDateChanged={(d) => setStartdato(d)}
        min={kalkulerMinDato(deltaker.deltakerliste.startDato)}
        max={kalkulerMaxDato(deltaker.deltakerliste.sluttDato)}
      />
      {skalVelgeVarighet && (
        <SluttdatoVelger
          ref={sluttdato}
          erForOppstartsdato={true}
          tiltakskode={deltaker.deltakerliste.tiltakstype}
          legend="Hva er forventet varighet?"
          detailLabel="Forventet sluttdato"
          min={startdato ?? undefined}
          max={maxSluttdato(startdato, deltaker.deltakerliste)}
          defaultSluttdato={deltaker.sluttDato ?? undefined}
          defaultVarighet={
            deltaker.sluttDato
              ? finnValgtVarighet(
                  deltaker.startDato,
                  deltaker.sluttDato,
                  deltaker.deltakerliste.tiltakstype
                )
              : undefined
          }
        />
      )}
    </Endringsmodal>
  )
}
