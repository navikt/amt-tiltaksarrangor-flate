import { TiltakDeltaker } from '../../../../api/data/deltaker'
import React, { useEffect, useState } from 'react'
import { FiltermenyDataEntry } from '../../../felles/table-filter/filtermeny-data-entry'
import {
  FilterType,
  useKoordinatorFilterContext
} from '../store/KoordinatorFilterContextProvider'
import { FilterMeny } from '../../../felles/table-filter/FilterMeny'
import globalStyles from '../../../../globals.module.scss'
import useLocalStorage from '../../../../hooks/useLocalStorage'

interface Props {
  deltakere: TiltakDeltaker[]
}

export const FilterMenyNavKontor = (props: Props): React.ReactElement => {
  const [deltakerePerNavKontor, setDeltakerePerNavKontor] = useState<
    FiltermenyDataEntry[]
  >([])
  const [filterOpen, setFilterOpen] = useLocalStorage(
    'filter-deltakerliste-nav-kontor',
    true
  )

  const {
    veilederFilter,
    medveilederFilter,
    statusFilter,
    hendelseFilter,
    navKontorFilter,
    updateNavKontorFilter,
    filtrerDeltakerePaaAltUtenom
  } = useKoordinatorFilterContext()

  const createInitialDataMap = (
    deltakere: TiltakDeltaker[]
  ): Map<string, FiltermenyDataEntry> => {
    const navKontorMap = new Map<string, FiltermenyDataEntry>()

    deltakere.forEach((deltaker) => {
      const navkontor = deltaker.navKontor

      if (navkontor !== null) {
        navKontorMap.set(navkontor, {
          id: navkontor,
          displayName: navkontor,
          antallDeltakere: 0
        })
      }
    })

    return new Map<string, FiltermenyDataEntry>([...navKontorMap])
  }

  useEffect(() => {
    const map = createInitialDataMap(props.deltakere)

    filtrerDeltakerePaaAltUtenom(FilterType.NavKontor, props.deltakere).forEach(
      (deltaker) => {
        const navkontor = deltaker.navKontor

        if (navkontor !== null) {
          const entry = map.get(navkontor)
          map.set(navkontor, {
            id: navkontor,
            displayName: navkontor,
            antallDeltakere: entry ? entry.antallDeltakere + 1 : 1
          })
        }
      }
    )

    setDeltakerePerNavKontor([...map.values()])
  }, [
    props.deltakere,
    statusFilter,
    hendelseFilter,
    medveilederFilter,
    veilederFilter,
    filtrerDeltakerePaaAltUtenom
  ])

  return (
    <FilterMeny
      navn="Nav-kontor"
      data={deltakerePerNavKontor}
      className={globalStyles.blokkXs}
      filter={navKontorFilter}
      open={filterOpen}
      onToggle={() => {
        setFilterOpen(!filterOpen)
      }}
      updateFilter={updateNavKontorFilter}
    />
  )
}
