import React, { useCallback, useEffect, useState } from 'react'
import {
  TiltakDeltaker,
  TiltakDeltakerStatus
} from '../../../../api/data/deltaker'
import { Tiltakskode } from '../../../../api/data/tiltak'
import globalStyles from '../../../../globals.module.scss'
import useLocalStorage from '../../../../hooks/useLocalStorage'
import { getIndividuellStatuser, getKursStatuser } from '../../../../utils/filtrering-utils'
import { mapTiltakDeltakerStatusTilTekst } from '../../../../utils/text-mappers'
import { FilterMeny } from '../../../felles/table-filter/FilterMeny'
import { FiltermenyDataEntry } from '../../../felles/table-filter/filtermeny-data-entry'
import {
  FilterType,
  useKoordinatorFilterContext
} from '../store/KoordinatorFilterContextProvider'

interface Props {
  deltakere: TiltakDeltaker[]
  tiltakskode: Tiltakskode
  erKurs: boolean
}

export const FilterMenyStatus = (props: Props): React.ReactElement => {
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

    // TODO sjekk opp påmeldingstype
    const statuser = props.erKurs
      ? getKursStatuser()
      : getIndividuellStatuser()

    statuser.forEach((status) => {
      const tekst = mapTiltakDeltakerStatusTilTekst(status)

      // TODO sjekk opp påmeldingstype og nye tiltakstyper
      // if(props.pameldingstype === Pameldingstype.TRENGER_GODKJENNING &&
      //   (status === TiltakDeltakerStatus.VURDERES || status === TiltakDeltakerStatus.SOKT_INN))
      if (
        (!props.erKurs || props.tiltakskode === Tiltakskode.JOBBKLUBB) &&
        props.tiltakskode !== Tiltakskode.GRUPPE_FAG_OG_YRKESOPPLAERING &&
        props.tiltakskode !== Tiltakskode.GRUPPE_ARBEIDSMARKEDSOPPLAERING &&
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
  }, [props.erKurs, props.tiltakskode])

  useEffect(() => {
    const statusMap = createInitialDataMap()

    filtrerDeltakerePaaAltUtenom(FilterType.Status, props.deltakere).forEach(
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
    props.deltakere,
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
