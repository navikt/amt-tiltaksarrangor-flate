import { Chips } from '@navikt/ds-react'
import React from 'react'
import globalStyles from '../../../../globals.module.scss'
import { useVeilederFilterMenyStore } from '../store/veileder-filter-meny-store-provider'
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
  } = useVeilederFilterMenyStore()

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
          key={status}
          variant="action"
          onDelete={() => removeHendelseFilter(hendelse)}
        >
          {mapHendelseTypeTilTekst(hendelse)}
        </Chips.Removable>
      ))}

      {deltakerlisteFilter.map((deltakerListe) => (
        <Chips.Removable
          key={deltakerListe}
          variant="action"
          onDelete={() => removeDeltakerlisteFilter(deltakerListe)}
        >
          {deltakerListe}
        </Chips.Removable>
      ))}

      {veiledertypeFilter.map((veilederType) => (
        <Chips.Removable
          key={veilederType}
          variant="action"
          onDelete={() => removeVeilederTypeFilter(veilederType)}
        >
          {mapVeilderTypeTilTekst(veilederType)}
        </Chips.Removable>
      ))}
    </Chips>
  )
}
