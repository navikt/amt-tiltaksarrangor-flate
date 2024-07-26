import React, { useState } from 'react'

import { leggTilOppstartsdato } from '../../../../../api/tiltak-api'
import { useDeltakerlisteStore } from '../deltakerliste-store'
import { BaseModal } from '../../../../felles/base-modal/BaseModal'
import { DateField } from '../../../../felles/DateField'
import styles from './EndreOppstartModal.module.scss'
import { VeilederConfirmationPanel } from './VeilederConfirmationPanel'
import { SendTilNavKnapp } from './SendTilNavKnapp'
import { Nullable } from '../../../../../utils/types/or-nothing'
import { EndringType } from '../types'
import { kalkulerMaxDato, kalkulerMinDato } from './datoutils'

export interface LeggTilOppstartModalProps {
  onClose: () => void
}

export interface LeggTilOppstartModalDataProps {
  deltakerId: string
  visGodkjennVilkaarPanel: boolean
  onEndringUtfort: () => void
}

export const LeggTilOppstartModal = ({
  deltakerId,
  onClose,
  visGodkjennVilkaarPanel,
  onEndringUtfort
}: LeggTilOppstartModalProps & LeggTilOppstartModalDataProps) => {
  const [valgtDato, setValgtDato] = useState<Nullable<Date>>()
  const [vilkaarGodkjent, setVilkaarGodkjent] = useState(false)
  const { deltakerliste } = useDeltakerlisteStore()

  const sendEndringsmelding = () => {
    if (!valgtDato) {
      return Promise.reject('Kan ikke sende endringsmelding uten oppstartsdato')
    }
    return leggTilOppstartsdato(deltakerId, valgtDato).then(onEndringUtfort)
  }

  return (
    <BaseModal
      tittel="Legg til oppstartsdato"
      endringstype={EndringType.LEGG_TIL_OPPSTARTSDATO}
      onClose={onClose}
      className={styles.fitContent}
    >
      <DateField
        className={styles.datofelt}
        label="Ny oppstartsdato"
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
        disabled={!valgtDato || (visGodkjennVilkaarPanel && !vilkaarGodkjent)}
      />
    </BaseModal>
  )
}
