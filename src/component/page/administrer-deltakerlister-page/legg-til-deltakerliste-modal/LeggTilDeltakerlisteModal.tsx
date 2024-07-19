import { BaseModal } from '../../../felles/base-modal/BaseModal'
import { BodyLong, Button } from '@navikt/ds-react'
import styles from '../../bruker-detaljer/deltaker-detaljer/fjern-deltaker-modal/FjernDeltakerModal.module.scss'
import React from 'react'

interface LeggTilDeltakerlisteModalProps {
  open: boolean
  deltakerlisteNavn: string
  deltakerlisteTiltaksnavn: string
  deltakerlisteId: string
  onConfirm: (id: string, navn: string, type: string) => void
  onClose: () => void
}

export const LeggTilDeltakerlisteModal = (
  props: LeggTilDeltakerlisteModalProps
) => {
  const onLeggTilClicked = () => {
    props.onConfirm(
      props.deltakerlisteId,
      props.deltakerlisteNavn,
      props.deltakerlisteTiltaksnavn
    )
  }

  return (
    <BaseModal
      tittel="Vil du legge til denne deltakerlisten?"
      open={props.open}
      onClose={props.onClose}
      contentClassName={styles.modalContent}
    >
      <div>
        Deltakerliste:{' '}
        <span className={styles.deltakerlisteNavn}>
          {props.deltakerlisteNavn}
        </span>
      </div>

      <BodyLong className={styles.text}>
        Det er viktig at du kun legger til deltakerlister du jobber med. Når du
        har lagt til deltakerlisten vil dine kollegaer se navnet ditt.
      </BodyLong>

      <div className={styles.knappeRad}>
        <Button size="small" variant="secondary" onClick={props.onClose}>
          Avbryt
        </Button>
        <Button size="small" variant="primary" onClick={onLeggTilClicked}>
          Legg til
        </Button>
      </div>
    </BaseModal>
  )
}
