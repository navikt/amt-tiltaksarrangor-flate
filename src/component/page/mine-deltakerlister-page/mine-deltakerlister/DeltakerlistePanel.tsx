import { LinkCard } from '@navikt/ds-react'
import React from 'react'

import { Oppstartstype } from '../../../../api/data/historikk'
import globalStyles from '../../../../globals.module.scss'
import { deltakerlisteDetaljerPageUrl } from '../../../../navigation'
import { formatDate } from '../../../../utils/date-utils'
import { harFellesOppstart } from '../../../../utils/deltakerliste-utils'

interface DeltakerlistePanelProps {
  id: string
  navn: string
  startdato: Date | null
  sluttdato: Date | null
  oppstartstype: Oppstartstype
}

export const DeltakerlistePanel = (
  props: DeltakerlistePanelProps
): React.ReactElement<DeltakerlistePanelProps> => {
  const { id, navn, startdato, sluttdato, oppstartstype } = props

  return (
    <li className={globalStyles.blokkS}>
      <LinkCard>
        <LinkCard.Title>
          <LinkCard.Anchor href={deltakerlisteDetaljerPageUrl(id)}>{navn}</LinkCard.Anchor>
        </LinkCard.Title>

        {harFellesOppstart(oppstartstype) && (startdato || sluttdato) && (
          <LinkCard.Description>
            {formatDate(startdato)} - {formatDate(sluttdato)}
          </LinkCard.Description>
        )}
      </LinkCard>
    </li>
  )
}
