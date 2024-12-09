import { Chips } from '@navikt/ds-react'
import React, { useMemo } from 'react'
import globalStyles from '../../../../globals.module.scss'
import { useKoordinatorFilterMenyStore } from '../store/koordinator-filter-meny-store-provider'
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
  } = useKoordinatorFilterMenyStore()

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
          key={status}
          variant="action"
          onDelete={() => removeStatusFilter(status)}
        >
          {mapTiltakDeltakerStatusTilTekst(status)}
        </Chips.Removable>
      ))}

      {hendelseFilter.map((hendelse) => (
        <Chips.Removable
          key={hendelse}
          variant="action"
          onDelete={() => removeHendelseFilter(hendelse)}
        >
          {mapHendelseTypeTilTekst(hendelse)}
        </Chips.Removable>
      ))}

      {veilederFilter.map((veilederId) => (
        <Chips.Removable
          key={veilederId}
          variant="action"
          onDelete={() => removeVeilederFilter(veilederId)}
        >
          {mapAnsattIdTilNavn(veilederId)}
        </Chips.Removable>
      ))}

      {medveilederFilter.map((medveilederId) => (
        <Chips.Removable
          key={medveilederId}
          variant="action"
          onDelete={() => removeMedveilederFilter(medveilederId)}
        >
          {mapAnsattIdTilNavn(medveilederId)}
        </Chips.Removable>
      ))}

      {navKontorFilter.map((navKontor) => (
        <Chips.Removable
          key={navKontor}
          variant="action"
          onDelete={() => removeNavKontorFilter(navKontor)}
        >
          {navKontor}
        </Chips.Removable>
      ))}
    </Chips>
  )
}
