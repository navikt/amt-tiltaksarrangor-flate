import { Chips } from '@navikt/ds-react'
import React from 'react'
import globalStyles from '../../../../globals.module.scss'
import { useVeilederFilterContext } from '../store/VeilederFilterContextProvider'
import {
  mapHendelseTypeTilTekst,
  mapTiltakDeltakerStatusTilTekst,
  mapVeilderTypeTilTekst
} from '../../../../utils/text-mappers'

export const FilterMenyChips = (): React.ReactElement => {
  const {
    statusFilter,
    hendelseFilter,
    veiledertypeFilter,
    deltakerlisteFilter,
    removeStatusFilter,
    removeHendelseFilter,
    removeVeilederTypeFilter,
    removeDeltakerlisteFilter
  } = useVeilederFilterContext()

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
          key={status}
          onDelete={() => removeHendelseFilter(hendelse)}
        >
          {mapHendelseTypeTilTekst(hendelse)}
        </Chips.Removable>
      ))}
      {deltakerlisteFilter.map((deltakerListe) => (
        <Chips.Removable
          data-color="accent"
          key={deltakerListe}
          onDelete={() => removeDeltakerlisteFilter(deltakerListe)}
        >
          {deltakerListe}
        </Chips.Removable>
      ))}
      {veiledertypeFilter.map((veilederType) => (
        <Chips.Removable
          data-color="accent"
          key={veilederType}
          onDelete={() => removeVeilederTypeFilter(veilederType)}
        >
          {mapVeilderTypeTilTekst(veilederType)}
        </Chips.Removable>
      ))}
    </Chips>
  )
}
