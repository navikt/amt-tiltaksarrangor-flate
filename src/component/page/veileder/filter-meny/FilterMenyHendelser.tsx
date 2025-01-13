import React, { useEffect, useState } from 'react'
import {
  Hendelser,
  VeiledersDeltaker
} from '../../../../api/data/deltaker'
import globalStyles from '../../../../globals.module.scss'
import useLocalStorage from '../../../../hooks/useLocalStorage'
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
  const [ filterOpen, setFilterOpen ] = useLocalStorage(
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

  useEffect(() => {
    const hendelser = { ...Hendelser }
    const deltakereFiltrert = filtrerDeltakerePaaAltUtenom(
      FilterType.Hendelse,
      props.deltakere
    )

    const hendelseMap = Object.keys(hendelser).reduce(
      (list: Map<string, FiltermenyDataEntry>, hendelse: string) => {
        const antallDeltakereTotalt = deltakereFiltrert.filter(
          (deltaker) => hendelse === Hendelser.VenterPaSvarFraNav
            ? !!deltaker.aktivEndring
            : false
        ).length
        const antallDeltakereFiltrert = deltakereFiltrert.filter(
          (deltaker) => hendelse === Hendelser.VenterPaSvarFraNav
            ? !!deltaker.aktivEndring
            : false
        ).length

        return antallDeltakereTotalt == 0
          ? list
          : list.set(hendelse, {
            id: hendelse,
            displayName: mapHendelseTypeTilTekst(hendelse),
            antallDeltakere: antallDeltakereFiltrert
          })
      },
      new Map<string, FiltermenyDataEntry>()
    )

    setDeltakerePerHendelse([ ...hendelseMap.values() ])
  }, [
    props.deltakere,
    statusFilter,
    veiledertypeFilter,
    deltakerlisteFilter,
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
