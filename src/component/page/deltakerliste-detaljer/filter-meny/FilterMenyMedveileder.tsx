import { TiltakDeltaker } from '../../../../api/data/deltaker'
import React, { useCallback, useEffect, useState } from 'react'
import {
  FilterType,
  useKoordinatorFilterContext
} from '../store/KoordinatorFilterContextProvider'
import globalStyles from '../../../../globals.module.scss'
import { FilterMeny } from '../../../felles/table-filter/FilterMeny'
import {
  getMedveiledere,
  HAR_IKKE_MEDVEILEDER_FILTER_TEKST,
  veilederNavn
} from '../../../../utils/veileder-utils'
import { FiltermenyDataEntry } from '../../../felles/table-filter/filtermeny-data-entry'
import useSessionStorage from '../../../../hooks/useSessionStorage'

interface Props {
  deltakere: TiltakDeltaker[]
}

export const FilterMenyMedveileder = (props: Props): React.ReactElement => {
  const [deltakerePerMedveileder, setDeltakerePerMedveileder] = useState<
    FiltermenyDataEntry[]
  >([])
  const [filterOpen, setFilterOpen] = useSessionStorage(
    'filter-deltakerliste-medveileder',
    true
  )

  const {
    medveilederFilter,
    updateMedveilederFilter,
    statusFilter,
    hendelseFilter,
    veilederFilter,
    filtrerDeltakere,
    filtrerDeltakerePaaAltUtenom
  } = useKoordinatorFilterContext()

  const createInitialDataMap = useCallback((): Map<
    string,
    FiltermenyDataEntry
  > => {
    const medveilederMap = new Map<string, FiltermenyDataEntry>()

    props.deltakere.forEach((deltaker) => {
      const medveiledere = getMedveiledere(deltaker)
      medveiledere.forEach((medveileder) => {
        medveilederMap.set(medveileder.ansattId, {
          id: medveileder.ansattId,
          displayName: veilederNavn(medveileder),
          antallDeltakere: 0
        })
      })
    })

    const sortedMap = new Map(
      [...medveilederMap.entries()].sort((a, b) =>
        a[1].displayName.localeCompare(b[1].displayName)
      )
    )

    const utenMedveilederMap = new Map<string, FiltermenyDataEntry>()
    utenMedveilederMap.set(HAR_IKKE_MEDVEILEDER_FILTER_TEKST, {
      id: HAR_IKKE_MEDVEILEDER_FILTER_TEKST,
      displayName: HAR_IKKE_MEDVEILEDER_FILTER_TEKST,
      antallDeltakere: 0
    })

    return new Map<string, FiltermenyDataEntry>([
      ...utenMedveilederMap,
      ...sortedMap
    ])
  }, [props.deltakere])

  useEffect(() => {
    const map = createInitialDataMap()
    filtrerDeltakerePaaAltUtenom(
      FilterType.Medveileder,
      props.deltakere
    ).forEach((deltaker) => {
      const medveiledere = getMedveiledere(deltaker)

      if (medveiledere.length === 0) {
        const entry = map.get(HAR_IKKE_MEDVEILEDER_FILTER_TEKST)
        if (entry !== null) {
          map.set(HAR_IKKE_MEDVEILEDER_FILTER_TEKST, {
            id: HAR_IKKE_MEDVEILEDER_FILTER_TEKST,
            displayName: HAR_IKKE_MEDVEILEDER_FILTER_TEKST,
            antallDeltakere: entry ? entry.antallDeltakere + 1 : 1
          })
        }
      } else {
        medveiledere.forEach((medveileder) => {
          const entry = map.get(medveileder.ansattId)
          map.set(medveileder.ansattId, {
            id: medveileder.ansattId,
            displayName: veilederNavn(medveileder),
            antallDeltakere: entry ? entry.antallDeltakere + 1 : 1
          })
        })
      }
    })

    setDeltakerePerMedveileder([...map.values()])
  }, [
    props.deltakere,
    statusFilter,
    hendelseFilter,
    veilederFilter,
    filtrerDeltakere,
    filtrerDeltakerePaaAltUtenom,
    createInitialDataMap
  ])

  return (
    <FilterMeny
      navn="Medveileder"
      data={deltakerePerMedveileder}
      className={globalStyles.blokkXs}
      filter={medveilederFilter}
      open={filterOpen}
      onToggle={() => {
        setFilterOpen(!filterOpen)
      }}
      updateFilter={updateMedveilederFilter}
    />
  )
}
