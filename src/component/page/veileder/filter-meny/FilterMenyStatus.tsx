import {
  TiltakDeltakerStatus,
  VeiledersDeltaker
} from '../../../../api/data/deltaker'
import React, { useEffect, useState } from 'react'
import { FiltermenyDataEntry } from '../../../felles/table-filter/filtermeny-data-entry'
import { mapTiltakDeltakerStatusTilTekst } from '../../../../utils/text-mappers'
import { FilterMeny } from '../../../felles/table-filter/FilterMeny'
import globalStyles from '../../../../globals.module.scss'
import {
  FilterType,
  useVeilederFilterContext
} from '../store/VeilederFilterContextProvider'
import useLocalStorage from '../../../../hooks/useLocalStorage'

interface Props {
  deltakere: VeiledersDeltaker[]
}

export const FilterMenyStatus = (props: Props): React.ReactElement => {
  const [deltakerePerStatus, setDeltakerePerStatus] = useState<
    FiltermenyDataEntry[]
  >([])
  const [filterOpen, setFilterOpen] = useLocalStorage(
    'filter-veileder-status-mine-deltakere',
    true
  )

  const {
    statusFilter,
    hendelseFilter,
    veiledertypeFilter,
    deltakerlisteFilter,
    updateStatusFilter,
    filtrerDeltakerePaaAltUtenom
  } = useVeilederFilterContext()

  useEffect(() => {
    const statuser = { ...TiltakDeltakerStatus }
    const deltakereFiltrert = filtrerDeltakerePaaAltUtenom(
      FilterType.Status,
      props.deltakere
    )

    const statusMap = Object.keys(statuser).reduce(
      (list: Map<string, FiltermenyDataEntry>, status: string) => {
        const antallDeltakereTotalt = deltakereFiltrert.filter(
          (deltaker) => deltaker.status.type === status
        ).length
        const antallDeltakereFiltrert = deltakereFiltrert.filter(
          (deltaker) => deltaker.status.type === status
        ).length
        return antallDeltakereTotalt == 0
          ? list
          : list.set(status, {
              id: status,
              displayName: mapTiltakDeltakerStatusTilTekst(status),
              antallDeltakere: antallDeltakereFiltrert
            })
      },
      new Map<string, FiltermenyDataEntry>()
    )

    setDeltakerePerStatus([...statusMap.values()])
  }, [
    props.deltakere,
    hendelseFilter,
    veiledertypeFilter,
    deltakerlisteFilter,
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
