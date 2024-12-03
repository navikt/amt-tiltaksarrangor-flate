import { TextField } from '@navikt/ds-react'
import dayjs from 'dayjs'
import { useState } from 'react'
import React from 'react'

import { endreDeltakelsesprosent } from '../../../../../api/tiltak-api'
import { DateField } from '../../../../felles/DateField'
import styles from './EndreProsentDeltakelseModal.module.scss'
import { Endringsmodal } from './endringsmodal/Endringsmodal'
import { AktivtForslag } from '../../../../../api/data/forslag'
import {
  gyldigObligatoriskBegrunnelse,
  validerObligatoriskBegrunnelse
} from './validering/begrunnelseValidering'
import { deltakelsesmengdeForslag } from '../../../../../api/forslag-api'
import { useDeltakelsesmengdeValidering } from './validering/deltakelsesmengdeValidering'
import { EndringType } from '../types'
import { SimpleDatePicker } from '../../../../felles/SimpleDatePicker'
import { Deltaker } from '../../../../../api/data/deltaker'

interface EndreProsentDeltakelseModalProps {
  onClose: () => void
}

export interface EndreProsentDeltakelseModalDataProps {
  readonly deltaker: Deltaker
  readonly visGodkjennVilkaarPanel: boolean
  readonly onEndringUtfort: () => void
  readonly onForslagSendt: (forslag: AktivtForslag) => void
  readonly erForslagEnabled: boolean
}

export const EndreProsentDeltakelseModal = ({
  deltaker,
  visGodkjennVilkaarPanel,
  erForslagEnabled,
  onEndringUtfort,
  onForslagSendt,
  onClose
}: EndreProsentDeltakelseModalProps & EndreProsentDeltakelseModalDataProps) => {
  const today = dayjs()
  const [prosentDeltakelseFelt, settProsentDeltakelseFelt] =
    useState<string>('')
  const [dagerPerUkeFelt, settDagerPerUkeFelt] = useState<string>('')
  const [gyldigFraDato, setGyldigFraDato] = useState<Date | undefined>(
    deltaker.startDato && today.isBefore(deltaker.startDato)
      ? deltaker.startDato
      : today.toDate()
  )
  const [begrunnelse, setBegrunnelse] = useState('')

  const visDagerPerUke =
    prosentDeltakelseFelt !== '100' && prosentDeltakelseFelt !== ''

  const validering = useDeltakelsesmengdeValidering(
    prosentDeltakelseFelt,
    dagerPerUkeFelt,
    gyldigFraDato,
    deltaker.deltakelsesmengder?.sisteDeltakelsesmengde ?? null
  )

  const kanSendeMelding = erForslagEnabled
    ? validering.isValid && gyldigObligatoriskBegrunnelse(begrunnelse)
    : validering.isValid

  const sendEndringsmelding = () => {
    const prosentDeltakelse = parseInt(prosentDeltakelseFelt)
    const dagerPerUke =
      prosentDeltakelse === 100 ? null : parseInt(dagerPerUkeFelt)

    if (!gyldigFraDato) {
      return Promise.reject('Ugyldig fra dato')
    }

    return endreDeltakelsesprosent(
      deltaker.id,
      prosentDeltakelse,
      dagerPerUke,
      gyldigFraDato
    ).then(onEndringUtfort)
  }

  const sendForslag = () => {
    const prosentDeltakelse = parseInt(prosentDeltakelseFelt)
    const dagerPerUke =
      prosentDeltakelse === 100
        ? undefined
        : dagerPerUkeFelt.length > 0
          ? parseInt(dagerPerUkeFelt)
          : undefined

    if (!validering.harEndring()) {
      return Promise.reject(
        'Innholdet i skjemaet medfører ingen endringer i deltakelsen på tiltaket. \nFor å lagre må minst ett felt i skjemaet være ulikt nåværende deltakelse.'
      )
    }

    return validerObligatoriskBegrunnelse(begrunnelse)
      .then(() =>
        deltakelsesmengdeForslag(
          deltaker.id,
          prosentDeltakelse,
          dagerPerUke,
          gyldigFraDato ?? new Date(),
          begrunnelse
        )
      )
      .then((res) => onForslagSendt(res.data))
  }

  return (
    <Endringsmodal
      tittel="Endre deltakelsesmengde"
      endringstype={EndringType.ENDRE_DELTAKELSE_PROSENT}
      visGodkjennVilkaarPanel={visGodkjennVilkaarPanel}
      erForslag={erForslagEnabled}
      erSendKnappDisabled={!kanSendeMelding}
      begrunnelseType="obligatorisk"
      onClose={onClose}
      onSend={erForslagEnabled ? sendForslag : sendEndringsmelding}
      onBegrunnelse={(begrunnelse) => {
        setBegrunnelse(begrunnelse)
      }}
    >
      <TextField
        className={styles.prosentDeltakselseTextField}
        label="Hva er ny deltakelsesprosent?"
        type="text"
        size="small"
        value={prosentDeltakelseFelt}
        error={validering.deltakelsesprosentError}
        onChange={(e) => settProsentDeltakelseFelt(e.target.value)}
      />

      {visDagerPerUke && (
        <TextField
          className={styles.prosentDeltakselseTextField}
          label="Hvor mange dager i uka? (valgfritt)"
          type="text"
          size="small"
          value={dagerPerUkeFelt}
          error={validering.dagerPerUkeError}
          onChange={(e) => settDagerPerUkeFelt(e.target.value)}
        />
      )}
      {erForslagEnabled && deltaker.startDato && (
        <SimpleDatePicker
          label="Fra når gjelder ny deltakelsesmengde?"
          defaultDate={gyldigFraDato}
          min={deltaker.startDato ?? undefined}
          max={deltaker.sluttDato ?? undefined}
          error={validering.gyldigFraError}
          onValidate={validering.validerGyldigFra}
          onChange={(date: Date | undefined) => setGyldigFraDato(date)}
        />
      )}

      {!erForslagEnabled && (
        <DateField
          label="Fra når gjelder ny deltakelsesmengde?"
          defaultDate={gyldigFraDato}
          onDateChanged={(d) => setGyldigFraDato(d ?? undefined)}
          min={deltaker.deltakerliste.startDato}
          max={deltaker.deltakerliste.sluttDato}
        />
      )}
    </Endringsmodal>
  )
}
