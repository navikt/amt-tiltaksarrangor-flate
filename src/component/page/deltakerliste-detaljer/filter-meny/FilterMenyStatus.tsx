import React, { useCallback, useEffect, useState } from 'react'
import {
  KoordinatorsDeltakerliste,
  TiltakDeltaker,
  TiltakDeltakerStatus
} from '../../../../api/data/deltaker'
import { Pameldingstype } from '../../../../api/data/tiltak'
import globalStyles from '../../../../globals.module.scss'
import useLocalStorage from '../../../../hooks/useLocalStorage'
import { getFilterStatuser } from '../../../../utils/filtrering-utils'
import { mapTiltakDeltakerStatusTilTekst } from '../../../../utils/text-mappers'
import { FilterMeny } from '../../../felles/table-filter/FilterMeny'
import { FiltermenyDataEntry } from '../../../felles/table-filter/filtermeny-data-entry'
import {
  FilterType,
  useKoordinatorFilterContext
} from '../store/KoordinatorFilterContextProvider'

interface Props {
  deltakerliste: KoordinatorsDeltakerliste
}

export const FilterMenyStatus = ({ deltakerliste }: Props): React.ReactElement => {
  const [deltakerePerStatus, setDeltakerePerStatus] = useState<
    FiltermenyDataEntry[]
  >([])
  const [filterOpen, setFilterOpen] = useLocalStorage(
    'filter-deltakerliste-status',
    true
  )

  const {
    statusFilter,
    updateStatusFilter,
    hendelseFilter,
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

    const statuser = getFilterStatuser(deltakerliste.oppstartstype, deltakerliste.pameldingstype, deltakerliste.tiltakskode)

    statuser.forEach((status) => {
      const tekst = mapTiltakDeltakerStatusTilTekst(status)
      // For dirkete påmeldinger
      // skal ikke "Vurderes" og "Søkt inn" vises i statusfilteret
      if (
        deltakerliste.pameldingstype === Pameldingstype.DIREKTE_VEDTAK &&
        (status === TiltakDeltakerStatus.VURDERES || status === TiltakDeltakerStatus.SOKT_INN)
      ) {
        return
      }

      dataMap.set(status, {
        id: status,
        displayName: tekst,
        antallDeltakere: 0
      })
    })
    return dataMap
  }, [ deltakerliste.oppstartstype, deltakerliste.tiltakskode ])

  useEffect(() => {
    const statusMap = createInitialDataMap()

    filtrerDeltakerePaaAltUtenom(FilterType.Status, deltakerliste.deltakere).forEach(
      (deltaker: TiltakDeltaker) => {
        const status = deltaker.status.type
        const entry = statusMap.get(status)

        statusMap.set(status, {
          id: status,
          displayName: entry ? entry.displayName : '',
          antallDeltakere: entry ? entry.antallDeltakere + 1 : 1
        })
      }
    )

    setDeltakerePerStatus([...statusMap.values()])
  }, [
    deltakerliste.deltakere,
    hendelseFilter,
    medveilederFilter,
    veilederFilter,
    filtrerDeltakere,
    createInitialDataMap,
    filtrerDeltakerePaaAltUtenom
  ])

  return (
    <FilterMeny
      navn="Status"
      data={deltakerePerStatus}
      className={globalStyles.blokkXs}
      filter={statusFilter}
      open={filterOpen}
      onToggle={() => {
        setFilterOpen(!filterOpen)
      }}
      updateFilter={updateStatusFilter}
    />
  )
}
