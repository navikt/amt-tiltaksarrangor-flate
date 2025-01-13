import { VeiledersDeltaker } from '../../../../api/data/deltaker'
import React, { useEffect, useState } from 'react'
import { FiltermenyDataEntry } from '../../../felles/table-filter/filtermeny-data-entry'
import {
  FilterType,
  useVeilederFilterContext
} from '../store/VeilederFilterContextProvider'
import { tilVeiledertype } from '../../../../utils/deltakerliste-utils'
import globalStyles from '../../../../globals.module.scss'
import { FilterMeny } from '../../../felles/table-filter/FilterMeny'
import { Veiledertype } from '../../../../api/data/veileder'
import { mapVeilderTypeTilTekst } from '../../../../utils/text-mappers'
import useLocalStorage from '../../../../hooks/useLocalStorage'

interface Props {
  deltakere: VeiledersDeltaker[]
}

export const FilterMenyVeilederType = (props: Props): React.ReactElement => {
  const [deltakerePerVeiledertype, setDeltakerePerVeiledertype] = useState<
    FiltermenyDataEntry[]
  >([])
  const [filterOpen, setFilterOpen] = useLocalStorage(
    'filter-veileder-veileder-type',
    true
  )

  const {
    veiledertypeFilter,
    updateVeilederTypeFilter,
    statusFilter,
    hendelseFilter,
    deltakerlisteFilter,
    filtrerDeltakere,
    filtrerDeltakerePaaAltUtenom
  } = useVeilederFilterContext()

  useEffect(() => {
    const createInitialDataMap = (
      deltakere: VeiledersDeltaker[]
    ): Map<string, FiltermenyDataEntry> => {
      const dataMap = new Map<string, FiltermenyDataEntry>()
      deltakere.forEach((deltaker) => {
        const veilederType = tilVeiledertype(
          deltaker.veiledertype === Veiledertype.MEDVEILEDER
        )
        dataMap.set(veilederType, {
          id: veilederType,
          displayName: mapVeilderTypeTilTekst(veilederType),
          antallDeltakere: 0
        })
      })

      return new Map<string, FiltermenyDataEntry>(
        [...dataMap.entries()].sort(([keyA], [keyB]) =>
          keyB.localeCompare(keyA)
        )
      )
    }

    const data = createInitialDataMap(props.deltakere)

    filtrerDeltakerePaaAltUtenom(
      FilterType.VeilederType,
      props.deltakere
    ).forEach((deltaker: VeiledersDeltaker) => {
      const veilederType = tilVeiledertype(
        deltaker.veiledertype === Veiledertype.MEDVEILEDER
      )
      const entry = data.get(veilederType)
      data.set(veilederType, {
        id: veilederType,
        displayName: mapVeilderTypeTilTekst(veilederType),
        antallDeltakere: entry ? entry.antallDeltakere + 1 : 1
      })
    })

    setDeltakerePerVeiledertype([...data.values()])
  }, [
    props.deltakere,
    statusFilter,
    hendelseFilter,
    deltakerlisteFilter,
    filtrerDeltakere,
    filtrerDeltakerePaaAltUtenom
  ])

  return (
    <FilterMeny
      navn="Type veileder"
      data={deltakerePerVeiledertype}
      className={globalStyles.blokkXs}
      filter={veiledertypeFilter}
      open={filterOpen}
      onToggle={() => {
        setFilterOpen(!filterOpen)
      }}
      updateFilter={updateVeilederTypeFilter}
    />
  )
}
