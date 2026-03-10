import { Chips } from '@navikt/ds-react'
import React, { useMemo } from 'react'
import globalStyles from '../../../../globals.module.scss'
import { useKoordinatorFilterContext } from '../store/KoordinatorFilterContextProvider'
import { mapHendelseTypeTilTekst, mapTiltakDeltakerStatusTilTekst } from '../../../../utils/text-mappers'
import { TiltakDeltaker } from '../../../../api/data/deltaker'
import { veilederNavn } from '../../../../utils/veileder-utils'

interface Props {
  deltakere: TiltakDeltaker[]
}

export const FilterMenyChips: React.FC<Props> = ({ deltakere }) => {
  const veiledere = useMemo(() => {
    return [...new Set(deltakere.map((detaker) => detaker.veiledere).flat())]
  }, [deltakere])

  const {
    statusFilter,
    removeStatusFilter,
    hendelseFilter,
    removeHendelseFilter,
    veilederFilter,
    removeVeilederFilter,
    medveilederFilter,
    removeMedveilederFilter,
    navKontorFilter,
    removeNavKontorFilter
  } = useKoordinatorFilterContext()

  const mapAnsattIdTilNavn = (ansattId: string) => {
    const veileder = veiledere.find(
      (veileder) => veileder.ansattId === ansattId
    )
    return veileder ? veilederNavn(veileder) : ansattId
  }

  return (
    <Chips className={globalStyles.blokkXs} title="Fjern filter">
      {statusFilter.map((status) => (
        <Chips.Removable
          data-color="accent"
          key={status}
          onDelete={() => removeStatusFilter(status)}
        >
          {mapTiltakDeltakerStatusTilTekst(status)}
        </Chips.Removable>
      ))}
      {hendelseFilter.map((hendelse) => (
        <Chips.Removable
          data-color="accent"
          key={hendelse}
          onDelete={() => removeHendelseFilter(hendelse)}
        >
          {mapHendelseTypeTilTekst(hendelse)}
        </Chips.Removable>
      ))}
      {veilederFilter.map((veilederId) => (
        <Chips.Removable
          data-color="accent"
          key={veilederId}
          onDelete={() => removeVeilederFilter(veilederId)}
        >
          {mapAnsattIdTilNavn(veilederId)}
        </Chips.Removable>
      ))}
      {medveilederFilter.map((medveilederId) => (
        <Chips.Removable
          data-color="accent"
          key={medveilederId}
          onDelete={() => removeMedveilederFilter(medveilederId)}
        >
          {mapAnsattIdTilNavn(medveilederId)}
        </Chips.Removable>
      ))}
      {navKontorFilter.map((navKontor) => (
        <Chips.Removable
          data-color="accent"
          key={navKontor}
          onDelete={() => removeNavKontorFilter(navKontor)}
        >
          {navKontor}
        </Chips.Removable>
      ))}
    </Chips>
  )
}
