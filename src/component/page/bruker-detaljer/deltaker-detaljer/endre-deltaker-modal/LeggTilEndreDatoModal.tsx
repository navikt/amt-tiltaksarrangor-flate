import dayjs from 'dayjs'
import React, { useState } from 'react'

import { Nullable } from '../../../../../utils/types/or-nothing'
import { BaseModal } from '../../../../felles/base-modal/BaseModal'
import { DateField } from '../../../../felles/DateField'
import styles from './EndreOppstartModal.module.scss'
import { SendTilNavKnapp } from './SendTilNavKnapp'
import { VeilederConfirmationPanel } from './VeilederConfirmationPanel'
import { useDeltakerlisteStore } from '../deltakerliste-store'

export interface LeggTilEndreDatoModalProps {
  onClose: () => void
  sendEndring: (valgtDato: Nullable<Date>) => Promise<void>
}

interface LeggTilEndreDatoDataProps {
  tittel: string
  datoLabel: string
  visGodkjennVilkaarPanel: boolean
  kanNullstilleDato?: boolean
}

export const LeggTilEndreDatoModal = (
  props: LeggTilEndreDatoModalProps & LeggTilEndreDatoDataProps
) => {
  const {
    tittel,
    datoLabel,
    visGodkjennVilkaarPanel,
    onClose,
    sendEndring,
    kanNullstilleDato
  } = props
  const [valgtDato, setValgtDato] = useState<Nullable<Date>>()
  const [vilkaarGodkjent, setVilkaarGodkjent] = useState(false)
  const { deltakerliste } = useDeltakerlisteStore()

  const sendEndringsmelding = () => {
    if (!valgtDato && !kanNullstilleDato)
      return Promise.reject(
        'Dato er påkrevd for å sende endringsmelding med endring av dato'
      )
    return sendEndring(valgtDato)
  }

  return (
    <BaseModal tittel={tittel} onClose={onClose}>
      <DateField
        className={styles.datofelt}
        label={datoLabel}
        date={valgtDato}
        onDateChanged={(d) => setValgtDato(d)}
        min={kalkulerMinDato(deltakerliste.startDato)}
        max={kalkulerMaxDato(deltakerliste.sluttDato)}
      />
      {visGodkjennVilkaarPanel && (
        <VeilederConfirmationPanel
          vilkaarGodkjent={vilkaarGodkjent}
          setVilkaarGodkjent={setVilkaarGodkjent}
        />
      )}
      <SendTilNavKnapp
        onEndringSendt={onClose}
        sendEndring={sendEndringsmelding}
        disabled={
          (!valgtDato && !kanNullstilleDato) ||
          (visGodkjennVilkaarPanel && !vilkaarGodkjent)
        }
      />
    </BaseModal>
  )
}

/*
	Skal maksimum være 2 måneder tilbake i tid.
	Hvis deltakerlisteStartDato er satt så må datoen være etter.
*/
export const kalkulerMinDato = (
  deltakerlisteStartDato: Nullable<Date>
): Date => {
  const twoMonthsAgo = dayjs().subtract(2, 'month')

  if (deltakerlisteStartDato && twoMonthsAgo.isBefore(deltakerlisteStartDato)) {
    return deltakerlisteStartDato
  } else {
    return twoMonthsAgo.toDate()
  }
}

/*
Skal maksimum være 2 måneder forover i tid.
	Hvis deltakerlisteSluttDato er satt så må datoen være før.
*/
export const kalkulerMaxDato = (
  deltakerlisteSluttDato: Nullable<Date>
): Date => {
  const twoMonthsInTheFuture = dayjs().add(2, 'month')

  if (
    deltakerlisteSluttDato &&
    twoMonthsInTheFuture.isAfter(deltakerlisteSluttDato)
  ) {
    return deltakerlisteSluttDato
  } else {
    return twoMonthsInTheFuture.toDate()
  }
}
