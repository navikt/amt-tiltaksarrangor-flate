import React, { useEffect, useState } from 'react'

import { TiltakDeltaker } from '../../../../api/data/deltaker'
import globalStyles from '../../../../globals.module.scss'
import { useTiltaksoversiktSokContext } from '../../../../store/TiltaksoversiktSokContextProvider'
import { finnNesteSortering } from '../../../../utils/sortering-utils'
import { AlertInfoMessage } from '../../../felles/alert-info-message/AlertInfoMessage'
import { useKoordinatorFilterContext } from '../store/KoordinatorFilterContextProvider'
import { DeltakerTabell } from './deltaker-tabell/DeltakerTabell'
import { sorterDeltakere } from './deltaker-tabell/sortering'
import styles from './DeltakerOversiktTabell.module.scss'
import { IngenDeltakereAlertstripe } from './IngenDeltakereAlertstripe'

interface DeltakerOversiktTabellProps {
  deltakere: TiltakDeltaker[]
}

export const DeltakerOversiktTabell = (
  props: DeltakerOversiktTabellProps
): React.ReactElement<DeltakerOversiktTabellProps> => {
  const { deltakere } = props
  const { filtrerDeltakere, veilederFilter, medveilederFilter, statusFilter, hendelseFilter } =
    useKoordinatorFilterContext()
  const { deltakerSortering, setDeltakerSortering } =
    useTiltaksoversiktSokContext()
  const [deltakereBearbeidet, setDeltakereBearbeidet] = useState<
    TiltakDeltaker[]
  >(sorterDeltakere(deltakere, deltakerSortering))

  useEffect(() => {
    if (!deltakere) return
    const filtrerteDeltakere = filtrerDeltakere(deltakere)
    const sortert = sorterDeltakere(filtrerteDeltakere, deltakerSortering)
    setDeltakereBearbeidet(sortert)
  }, [
    deltakere,
    filtrerDeltakere,
    deltakerSortering,
    veilederFilter,
    medveilederFilter,
    statusFilter,
    hendelseFilter
  ])

  const handleOnSortChange = (sortKey: string | undefined) => {
    setDeltakerSortering((prevSort) => finnNesteSortering(sortKey, prevSort))
  }

  return (
    <div className={styles.tableWrapper}>
      <AlertInfoMessage />

      {deltakere.length === 0 ? (
        <IngenDeltakereAlertstripe />
      ) : (
        <>
          <DeltakerTabell
            deltakere={deltakereBearbeidet}
            sortering={deltakerSortering}
            onSortChange={handleOnSortChange}
          />
          <div
            aria-live="polite"
            aria-atomic="true"
            className={globalStyles.screenReaderOnly}
          >
            Viser {deltakereBearbeidet.length} av {deltakere.length} deltakere.
          </div>
        </>
      )}
    </div>
  )
}
