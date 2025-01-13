import { Heading } from '@navikt/ds-react'
import React, { useLayoutEffect } from 'react'
import globalStyles from '../../../../globals.module.scss'
import { KoordinatorsDeltakerliste } from '../../../../api/data/deltaker'
import { FilterMenyVeiledere } from './FilterMenyVeiledere'
import { FilterMenyMedveileder } from './FilterMenyMedveileder'
import { FilterMenyStatus } from './FilterMenyStatus'
import { FilterMenyNavKontor } from './FilterMenyNavKontor'
import { FilterMenyChips } from './FilterMenyChips'
import { useKoordinatorFilterContext } from '../store/KoordinatorFilterContextProvider'
import { FilterMenyHendelser } from './FilterMenyHendelser'

interface Props {
  deltakerliste: KoordinatorsDeltakerliste
}

export const FilterMenyDeltakerListeDetaljer: React.FC<Props> = ({
  deltakerliste
}) => {
  const { fjernUgyldigeFilter } = useKoordinatorFilterContext()

  useLayoutEffect(() => {
    fjernUgyldigeFilter(deltakerliste.deltakere)
  }, [deltakerliste.deltakere])

  return (
    <div>
      <Heading size="small" level="3" className={globalStyles.screenReaderOnly}>
        Filtrer deltakerliste
      </Heading>
      <FilterMenyChips deltakere={deltakerliste.deltakere} />

      <FilterMenyStatus
        erKurs={deltakerliste.erKurs}
        tiltakType={deltakerliste.tiltakType}
        deltakere={deltakerliste.deltakere}
      />
      <FilterMenyHendelser deltakere={deltakerliste.deltakere} />
      <FilterMenyVeiledere deltakere={deltakerliste.deltakere} />
      <FilterMenyMedveileder deltakere={deltakerliste.deltakere} />
      <FilterMenyNavKontor deltakere={deltakerliste.deltakere} />
    </div>
  )
}
