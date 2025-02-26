import {
  Hendelser,
  TiltakDeltaker
} from '../../../../api/data/deltaker'
import React, { useCallback, useEffect, useState } from 'react'
import {
  FilterType,
  useKoordinatorFilterContext
} from '../store/KoordinatorFilterContextProvider'
import globalStyles from '../../../../globals.module.scss'
import { FilterMeny } from '../../../felles/table-filter/FilterMeny'
import { mapHendelseTypeTilTekst } from '../../../../utils/text-mappers'
import { FiltermenyDataEntry } from '../../../felles/table-filter/filtermeny-data-entry'
import useLocalStorage from '../../../../hooks/useLocalStorage'

interface Props {
  deltakere: TiltakDeltaker[]
}

export const FilterMenyHendelser = ({ deltakere }: Props): React.ReactElement => {
  const [ deltakerePerHendelse, setDeltakerePerHendelse ] = useState<
    FiltermenyDataEntry[]
  >([])
  const [ filterOpen, setFilterOpen ] = useLocalStorage(
    'filter-deltakerliste-hendelse',
    true
  )

  const {
    statusFilter,
    hendelseFilter,
    updateHendelseFilter,
    medveilederFilter,
    veilederFilter,
    filtrerDeltakere,
    filtrerDeltakerePaaAltUtenom
  } = useKoordinatorFilterContext()

  const createInitialDataMap = useCallback((): Map<
    string,
    FiltermenyDataEntry
  > => {
    const dataMap = new Map<string, FiltermenyDataEntry>()
    const hendelser = { ...Hendelser }

    Object.keys(hendelser).forEach((hendelse) => {
      const tekst = mapHendelseTypeTilTekst(hendelse)

      dataMap.set(hendelse, {
        id: hendelse,
        displayName: tekst,
        antallDeltakere: 0
      })
    })
    return dataMap
  }, [])

  useEffect(() => {
    const hendelseMap = createInitialDataMap()

    filtrerDeltakerePaaAltUtenom(FilterType.Hendelse, deltakere).forEach(
      (deltaker: TiltakDeltaker) => {
        const hendelseTypes: { key: keyof TiltakDeltaker, hendelse: Hendelser }[] = [
          { key: 'aktivEndring', hendelse: Hendelser.VenterPaSvarFraNav },
          { key: 'svarFraNav', hendelse: Hendelser.SvarFraNav },
          { key: 'oppdateringFraNav', hendelse: Hendelser.OppdateringFraNav }
        ]

        hendelseTypes.forEach(({ key, hendelse }) => {
          if (deltaker[ key ]) {
            const entry = hendelseMap.get(hendelse)
            hendelseMap.set(hendelse, {
              id: hendelse,
              displayName: entry ? entry.displayName : '',
              antallDeltakere: entry ? entry.antallDeltakere + 1 : 1
            })
          }
        })
      }
    )

    setDeltakerePerHendelse([ ...hendelseMap.values() ])
  }, [
    deltakere,
    statusFilter,
    medveilederFilter,
    veilederFilter,
    filtrerDeltakere,
    createInitialDataMap,
    filtrerDeltakerePaaAltUtenom
  ])

  return (
    <FilterMeny
      navn="Hendelser"
      data={deltakerePerHendelse}
      className={globalStyles.blokkXs}
      filter={hendelseFilter}
      open={filterOpen}
      onToggle={() => {
        setFilterOpen(!filterOpen)
      }}
      updateFilter={updateHendelseFilter}
    />
  )
}
