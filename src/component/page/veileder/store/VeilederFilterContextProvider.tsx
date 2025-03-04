import { createContext, useContext, useState } from 'react'
import { Hendelser, VeiledersDeltaker } from '../../../../api/data/deltaker'
import { tilVeiledertype } from '../../../../utils/deltakerliste-utils'
import { Veiledertype } from '../../../../api/data/veileder'

export enum FilterType {
  Ingen,
  Status,
  Hendelse,
  VeilederType,
  Deltakerliste
}

export interface VeilederFilterContextProps {
  statusFilter: string[],
  updateStatusFilter: (newFilter: string[]) => void,
  removeStatusFilter: (status: string) => void,
  hendelseFilter: string[],
  updateHendelseFilter: (newFilter: string[]) => void,
  removeHendelseFilter: (status: string) => void,
  veiledertypeFilter: string[],
  updateVeilederTypeFilter: (newFilter: string[]) => void,
  removeVeilederTypeFilter: (status: string) => void,
  deltakerlisteFilter: string[],
  updateDeltakerlisteFilter: (newFilter: string[]) => void,
  removeDeltakerlisteFilter: (status: string) => void,
  filtrerDeltakere: (deltakere: VeiledersDeltaker[]) => VeiledersDeltaker[],
  filtrerDeltakerePaaAltUtenom: (filterType: FilterType, deltakere: VeiledersDeltaker[]) => VeiledersDeltaker[]
}

const VeilederFilterContext = createContext<VeilederFilterContextProps | undefined>(undefined)

const useVeilederFilterContext = () => {
  const context = useContext(VeilederFilterContext)

  if (!context) {
    throw new Error('useVeilederFilterContext must be used within an VeilederFilterContextProvider')
  }

  return context
}

const VeilederFilterContextProvider = ({
  children
}: {
  children: React.ReactNode
}) => {
  const [ statusFilter, setStatusFilter ] = useState<string[]>([])
  const [ hendelseFilter, setHendelseFilter ] = useState<string[]>([])
  const [ deltakerlisteFilter, setDeltakerlisteFilter ] = useState<string[]>([])
  const [ veiledertypeFilter, setVeiledertypeFilter ] = useState<string[]>([
    Veiledertype.VEILEDER
  ])

  const updateStatusFilter = (newFilter: string[]) =>
    setStatusFilter(newFilter)
  const removeStatusFilter = (status: string) =>
    removeFilter(status, statusFilter, setStatusFilter)

  const updateHendelseFilter = (newFilter: string[]) =>
    setHendelseFilter(newFilter)
  const removeHendelseFilter = (hendelse: string) =>
    removeFilter(hendelse, hendelseFilter, setHendelseFilter)

  const updateVeilederTypeFilter = (newFilter: string[]) =>
    setVeiledertypeFilter(newFilter)
  const removeVeilederTypeFilter = (status: string) =>
    removeFilter(status, veiledertypeFilter, setVeiledertypeFilter)

  const updateDeltakerlisteFilter = (newFilter: string[]) =>
    setDeltakerlisteFilter(newFilter)
  const removeDeltakerlisteFilter = (status: string) =>
    removeFilter(status, deltakerlisteFilter, setDeltakerlisteFilter)

  const removeFilter = (
    value: string,
    filterValue: string[],
    setFilter: (value: string[]) => void
  ) => setFilter(filterValue.filter((v) => v !== value))

  const matcherStatus = (statusFilter: string[], brukerStatus: string) => {
    if (statusFilter.length === 0) return true
    return statusFilter.includes(brukerStatus)
  }

  const matcherHendelse = (deltaker: VeiledersDeltaker) => {
    if (hendelseFilter.length === 0) return true
    if (deltaker.aktivEndring && hendelseFilter.includes(Hendelser.VenterPaSvarFraNav)) return true
    if (deltaker.svarFraNav && hendelseFilter.includes(Hendelser.SvarFraNav)) return true
    if (deltaker.oppdateringFraNav && hendelseFilter.includes(Hendelser.OppdateringFraNav)) return true
    if (deltaker.nyDeltaker && hendelseFilter.includes(Hendelser.NyDeltaker)) return true
    return false
  }

  const matcherVeiledertype = (veiledertype: Veiledertype) => {
    if (veiledertypeFilter.length === 0) return true
    return veiledertypeFilter.includes(veiledertype)
  }

  const matcherDeltakerliste = (deltakerliste: string) => {
    if (deltakerlisteFilter.length === 0) return true
    return deltakerlisteFilter.includes(deltakerliste)
  }

  const filtrerDeltakerePaStatus = (
    deltakere: VeiledersDeltaker[]
  ): VeiledersDeltaker[] => {
    return deltakere.filter((bruker) =>
      matcherStatus(statusFilter, bruker.status.type)
    )
  }

  const filtrerDeltakerePaHendelse = (
    deltakere: VeiledersDeltaker[]
  ): VeiledersDeltaker[] => {
    return deltakere.filter((deltaker) =>
      matcherHendelse(deltaker)
    )
  }

  const filtrerDeltakerePaDeltakerliste = (
    deltakere: VeiledersDeltaker[]
  ): VeiledersDeltaker[] => {
    return deltakere.filter((bruker) =>
      matcherDeltakerliste(bruker.deltakerliste.navn)
    )
  }

  const filtrerDeltakerePaVeiledertype = (
    deltakere: VeiledersDeltaker[]
  ): VeiledersDeltaker[] => {
    return deltakere.filter((bruker) =>
      matcherVeiledertype(
        tilVeiledertype(bruker.veiledertype === Veiledertype.MEDVEILEDER)
      )
    )
  }

  const filtrerDeltakere = (
    deltakere: VeiledersDeltaker[]
  ): VeiledersDeltaker[] => {
    return filtrerDeltakerePaaAltUtenom(FilterType.Ingen, deltakere)
  }

  const filtrerDeltakerePaaAltUtenom = (
    filterType: FilterType,
    deltakere: VeiledersDeltaker[]
  ) => {
    const filtrertPaStatus =
      filterType == FilterType.Status
        ? deltakere
        : filtrerDeltakerePaStatus(deltakere)
    const filtrertPaHendelse =
      filterType == FilterType.Hendelse
        ? filtrertPaStatus
        : filtrerDeltakerePaHendelse(filtrertPaStatus)
    const filtrertPaVeiledertype =
      filterType == FilterType.VeilederType
        ? filtrertPaHendelse
        : filtrerDeltakerePaVeiledertype(filtrertPaHendelse)
    return filterType == FilterType.Deltakerliste
      ? filtrertPaVeiledertype
      : filtrerDeltakerePaDeltakerliste(filtrertPaVeiledertype)
  }

  const contextValue: VeilederFilterContextProps = {
    statusFilter,
    updateStatusFilter,
    removeStatusFilter,
    hendelseFilter,
    updateHendelseFilter,
    removeHendelseFilter,
    veiledertypeFilter,
    updateVeilederTypeFilter,
    removeVeilederTypeFilter,
    deltakerlisteFilter,
    updateDeltakerlisteFilter,
    removeDeltakerlisteFilter,
    filtrerDeltakere,
    filtrerDeltakerePaaAltUtenom
  }

  return (
    <VeilederFilterContext.Provider value={contextValue} > {children} </VeilederFilterContext.Provider>
  )
}

export { VeilederFilterContext, useVeilederFilterContext, VeilederFilterContextProvider }
