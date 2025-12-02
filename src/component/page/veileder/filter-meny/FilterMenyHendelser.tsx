import React, { useCallback, useEffect, useState } from 'react'
import {
  Hendelser,
  VeiledersDeltaker
} from '../../../../api/data/deltaker'
import globalStyles from '../../../../globals.module.scss'
import useSessionStorage from '../../../../hooks/useSessionStorage'
import { FilterMeny } from '../../../felles/table-filter/FilterMeny'
import { FiltermenyDataEntry } from '../../../felles/table-filter/filtermeny-data-entry'
import {
  FilterType,
  useVeilederFilterContext
} from '../store/VeilederFilterContextProvider'
import { mapHendelseTypeTilTekst } from '../../../../utils/text-mappers'

interface Props {
  deltakere: VeiledersDeltaker[]
}

export const FilterMenyHendelser = (props: Props): React.ReactElement => {
  const [ deltakerePerHendelse, setDeltakerePerHendelse ] = useState<
    FiltermenyDataEntry[]
  >([])
  const [ filterOpen, setFilterOpen ] = useSessionStorage(
    'filter-veileder-hendelse-mine-deltakere',
    true
  )

  const {
    statusFilter,
    hendelseFilter,
    veiledertypeFilter,
    deltakerlisteFilter,
    updateHendelseFilter,
    filtrerDeltakerePaaAltUtenom
  } = useVeilederFilterContext()

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

    filtrerDeltakerePaaAltUtenom(FilterType.Hendelse, props.deltakere).forEach(
      (deltaker: VeiledersDeltaker) => {
        const hendelseTypes: { key: keyof VeiledersDeltaker, hendelse: Hendelser }[] = [
          { key: 'aktivEndring', hendelse: Hendelser.VenterPaSvarFraNav },
          { key: 'svarFraNav', hendelse: Hendelser.SvarFraNav },
          { key: 'oppdateringFraNav', hendelse: Hendelser.OppdateringFraNav },
          { key: 'nyDeltaker', hendelse: Hendelser.NyDeltaker }
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
    props.deltakere,
    statusFilter,
    veiledertypeFilter,
    deltakerlisteFilter,
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
