import { TextField } from '@navikt/ds-react'
import dayjs from 'dayjs'
import { useState } from 'react'
import React from 'react'

import { endreDeltakelsesprosent } from '../../../../../api/tiltak-api'
import { Nullable } from '../../../../../utils/types/or-nothing'
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
import { useDeltakerStore } from '../deltaker-store'

interface EndreProsentDeltakelseModalProps {
  onClose: () => void
}

export interface EndreProsentDeltakelseModalDataProps {
  readonly deltakerId: string
  readonly gammelProsentDeltakelse: number | null
  readonly gammelDagerPerUke: number | null
  readonly visGodkjennVilkaarPanel: boolean
  readonly onEndringUtfort: () => void
  readonly onForslagSendt: (forslag: AktivtForslag) => void
  readonly erForslagEnabled: boolean
}

export const EndreProsentDeltakelseModal = ({
  deltakerId,
  gammelProsentDeltakelse,
  gammelDagerPerUke,
  visGodkjennVilkaarPanel,
  erForslagEnabled,
  onEndringUtfort,
  onForslagSendt,
  onClose
}: EndreProsentDeltakelseModalProps & EndreProsentDeltakelseModalDataProps) => {
  const today = dayjs().toDate()
  const { deltaker } = useDeltakerStore()
  const [prosentDeltakelseFelt, settProsentDeltakelseFelt] =
    useState<string>('')
  const [dagerPerUkeFelt, settDagerPerUkeFelt] = useState<string>('')
  const [gyldigFraDato, setGyldigFraDato] = useState<Nullable<Date>>(today)
  const [begrunnelse, setBegrunnelse] = useState('')

  const visDagerPerUke =
    prosentDeltakelseFelt !== '100' && prosentDeltakelseFelt !== ''

  const validering = useDeltakelsesmengdeValidering(
    prosentDeltakelseFelt,
    dagerPerUkeFelt,
    gammelDagerPerUke,
    gammelProsentDeltakelse
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
      deltakerId,
      prosentDeltakelse,
      dagerPerUke,
      gyldigFraDato
    ).then(onEndringUtfort)
  }

  const sendForslag = () => {
    const prosentDeltakelse = parseInt(prosentDeltakelseFelt)
    const dagerPerUke = prosentDeltakelse === 100
      ? undefined
      : (dagerPerUkeFelt.length > 0 ? parseInt(dagerPerUkeFelt) : undefined)

    const harIngenEndring = prosentDeltakelse === gammelProsentDeltakelse &&
      dagerPerUke == gammelDagerPerUke

    if (harIngenEndring) {
      return Promise.reject('Innholdet i skjemaet medfører ingen endringer i deltakelsen på tiltaket. \nFor å lagre må minst ett felt i skjemaet være ulikt nåværende deltakelse.')
    }

    return validerObligatoriskBegrunnelse(begrunnelse)
      .then(() =>
        deltakelsesmengdeForslag(
          deltakerId,
          prosentDeltakelse,
          dagerPerUke,
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

      {!erForslagEnabled && (
        <DateField
          label="Fra når gjelder ny deltakelsesmengde?"
          defaultDate={gyldigFraDato}
          onDateChanged={(d) => setGyldigFraDato(d)}
          min={deltaker.deltakerliste.startDato}
          max={deltaker.deltakerliste.sluttDato}
        />
      )}
    </Endringsmodal>
  )
}
