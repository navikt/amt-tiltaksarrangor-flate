import { Table } from '@navikt/ds-react'
import React, { useEffect, useState } from 'react'

import { useDeltakerSorteringContext } from '../../../store/DeltakerSorteringContextProvider'
import { finnNesteSortering } from '../../../utils/sortering-utils'
import globalStyles from '../../../globals.module.scss'
import { sorterVeiledersDeltakere } from './sortering'
import { VeiledersDeltaker } from '../../../api/data/deltaker'
import { IngenDeltakere } from './ingen-deltakere/IngenDeltakere'
import { TabellHeaderVeileder } from './TabellHeaderVeileder'
import { TabellBodyVeileder } from './TabellBodyVeileder'
import { filtrerDeltakerliste } from '../../../utils/filtrering-utils'
import { useVeilederFilterContext } from './store/VeilederFilterContextProvider'
import { AlertInfoMessage } from '../../felles/alert-info-message/AlertInfoMessage'
import {
  AlertInfoMessageSoktInnVurderes
} from '../../felles/alert-info-message/sokt-inn-vurderes/AlertInfoMessageSoktInnVurderes'

interface MineDeltakereTabellProps {
  mineDeltakere: VeiledersDeltaker[]
}

export const MineDeltakereTabell = (
  props: MineDeltakereTabellProps
): React.ReactElement<MineDeltakereTabellProps> => {
  const { mineDeltakere } = props
  const { deltakerSortering, setDeltakerSortering } =
    useDeltakerSorteringContext()
  const {
    filtrerDeltakere,
    statusFilter,
    hendelseFilter,
    deltakerlisteFilter,
    veiledertypeFilter
  } = useVeilederFilterContext()
  const [deltakereBearbeidet, setDeltakereBearbeidet] = useState<
    VeiledersDeltaker[]
  >(sorterVeiledersDeltakere(mineDeltakere, deltakerSortering))

  useEffect(() => {
    if (!mineDeltakere) return
    const filtrerteBrukere = filtrerDeltakere(mineDeltakere)
    const filtrerteDeltakerlister = filtrerDeltakerliste(
      filtrerteBrukere,
      deltakerlisteFilter
    )
    const sortert = sorterVeiledersDeltakere(
      filtrerteDeltakerlister,
      deltakerSortering
    )
    setDeltakereBearbeidet(sortert)
  }, [
    filtrerDeltakere,
    statusFilter,
    hendelseFilter,
    mineDeltakere,
    deltakerSortering,
    deltakerlisteFilter,
    veiledertypeFilter
  ])

  const handleOnSortChange = (sortKey: string | undefined) => {
    setDeltakerSortering((prevSort) => finnNesteSortering(sortKey, prevSort))
  }

  return (
    <div>
      <AlertInfoMessage />
      <AlertInfoMessageSoktInnVurderes />

      {mineDeltakere.length === 0 ? (
        <IngenDeltakere />
      ) : (
        <>
          <Table
            className="tabell"
            zebraStripes={true}
            sort={deltakerSortering}
            onSortChange={handleOnSortChange}
            aria-label="Deltakere på tiltaksgjennomføring"
          >
            <TabellHeaderVeileder />
            <TabellBodyVeileder brukere={deltakereBearbeidet} />
          </Table>
          <div
            aria-live="polite"
            aria-atomic="true"
            className={globalStyles.screenReaderOnly}
          >
            Viser {deltakereBearbeidet.length} av {mineDeltakere.length}{' '}
            deltakere.
          </div>
        </>
      )}
    </div>
  )
}
