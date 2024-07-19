import { TextField } from '@navikt/ds-react'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import React from 'react'

import { endreDeltakelsesprosent } from '../../../../../api/tiltak-api'
import { Nullable } from '../../../../../utils/types/or-nothing'
import { DateField } from '../../../../felles/DateField'
import styles from './EndreProsentDeltakelseModal.module.scss'
import { SendTilNavKnapp } from './SendTilNavKnapp'
import { VeilederConfirmationPanel } from './VeilederConfirmationPanel'
import { BaseModal } from '../../../../felles/base-modal/BaseModal'
import { useDeltakerlisteStore } from '../deltakerliste-store'

interface EndreProsentDeltakelseModalProps {
  onClose: () => void
}

export interface EndreProsentDeltakelseModalDataProps {
  deltakerId: string
  gammelProsentDeltakelse: number | null
  visGodkjennVilkaarPanel: boolean
  onEndringUtfort: () => void
}

export const EndreProsentDeltakelseModal = (
  props: EndreProsentDeltakelseModalProps & EndreProsentDeltakelseModalDataProps
) => {
  const {
    deltakerId,
    gammelProsentDeltakelse,
    visGodkjennVilkaarPanel,
    onEndringUtfort
  } = props
  const today = dayjs().toDate()
  const { deltakerliste } = useDeltakerlisteStore()
  const [prosentDeltakelseFelt, settProsentDeltakelseFelt] =
    useState<string>('')
  const [dagerPerUkeFelt, settDagerPerUkeFelt] = useState<string>('')
  const [gyldigFraDato, setGyldigFraDato] = useState<Nullable<Date>>(today)
  const [errorMessage, settErrorMessage] = useState<string>()
  const [dagerPerUkeErrorMessage, settDagerPerUkeErrorMessage] =
    useState<string>()
  const [vilkaarGodkjent, settVilkaarGodkjent] = useState(false)

  const visDagerPerUke =
    prosentDeltakelseFelt !== '100' && prosentDeltakelseFelt !== ''

  const sendTilNavDisabled =
    (!vilkaarGodkjent && visGodkjennVilkaarPanel) ||
    prosentDeltakelseFelt === '' ||
    errorMessage !== undefined

  useEffect(() => {
    if (prosentDeltakelseFelt === '') {
      settErrorMessage(undefined)
      return
    }

    const newValue = parseInt(prosentDeltakelseFelt)

    const isInvalid =
      isNaN(newValue) ||
      !prosentDeltakelseFelt.match(/^\d*$/) ||
      newValue <= 0 ||
      newValue > 100

    if (isInvalid) settErrorMessage('Tallet må være et helt tall fra 1 til 100')
    else if (newValue === gammelProsentDeltakelse)
      settErrorMessage('Kan ikke være lik prosenten som er registrert')
    else settErrorMessage(undefined)

    const dagerPerUkeValue = parseInt(dagerPerUkeFelt)
    const dagerPerUkeIsInvalid =
      dagerPerUkeValue !== null &&
      (!dagerPerUkeFelt.match(/^\d*$/) ||
        dagerPerUkeValue < 1 ||
        dagerPerUkeValue > 5)

    if (dagerPerUkeIsInvalid)
      settDagerPerUkeErrorMessage(
        'Dager per uke må være et helt tall fra 1 til 5'
      )
    else settDagerPerUkeErrorMessage(undefined)
  }, [prosentDeltakelseFelt, gammelProsentDeltakelse, dagerPerUkeFelt])

  const sendEndringsmelding = () => {
    const prosentDeltakelse = parseInt(prosentDeltakelseFelt)
    const dagerPerUke =
      prosentDeltakelse === 100 ? null : parseInt(dagerPerUkeFelt)

    if (isNaN(prosentDeltakelse))
      return Promise.reject('Kan ikke sende Prosent Deltakelse endringsmelding')

    return endreDeltakelsesprosent(
      deltakerId,
      prosentDeltakelse,
      dagerPerUke,
      gyldigFraDato
    ).then(onEndringUtfort)
  }

  return (
    <BaseModal tittel="Endre deltakelsesmengde" onClose={props.onClose}>
      <TextField
        className={styles.prosentDeltakselseTextField}
        label="Hva er ny deltakelsesprosent?"
        type="number"
        value={prosentDeltakelseFelt}
        min={0}
        max={100}
        error={errorMessage}
        onChange={(e) => settProsentDeltakelseFelt(e.target.value)}
      />

      {visDagerPerUke && (
        <TextField
          className={styles.prosentDeltakselseTextField}
          label="Hvor mange dager i uka? (valgfritt)"
          type="number"
          value={dagerPerUkeFelt}
          min={1}
          max={5}
          error={dagerPerUkeErrorMessage}
          onChange={(e) => settDagerPerUkeFelt(e.target.value)}
        />
      )}

      <DateField
        className={styles.datofelt}
        label="Fra når gjelder ny deltakelsesmengde?"
        date={gyldigFraDato}
        onDateChanged={(d) => setGyldigFraDato(d)}
        min={deltakerliste.startDato}
        max={deltakerliste.sluttDato}
      />

      {visGodkjennVilkaarPanel && (
        <VeilederConfirmationPanel
          vilkaarGodkjent={vilkaarGodkjent}
          setVilkaarGodkjent={settVilkaarGodkjent}
        />
      )}

      <SendTilNavKnapp
        onEndringSendt={props.onClose}
        sendEndring={sendEndringsmelding}
        disabled={sendTilNavDisabled}
      />
    </BaseModal>
  )
}
