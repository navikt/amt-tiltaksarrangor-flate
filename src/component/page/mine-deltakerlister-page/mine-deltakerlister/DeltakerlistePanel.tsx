import { BodyShort } from '@navikt/ds-react'
import React from 'react'

import globalStyles from '../../../../globals.module.scss'
import { deltakerlisteDetaljerPageUrl } from '../../../../navigation'
import { SpaLenkepanel } from '../../../felles/spa-lenkepanel/SpaLenkepanel'
import styles from './DeltakerlistePanel.module.scss'
import { formatDate } from '../../../../utils/date-utils'
import { Oppstartstype } from '../../../../api/data/historikk'

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
      <SpaLenkepanel to={deltakerlisteDetaljerPageUrl(id)}>
        <div className={styles.content}>
          <BodyShort as="span" className={styles.panelTittel}>
            {navn}
          </BodyShort>
          {oppstartstype === Oppstartstype.FELLES && (startdato || sluttdato) && (
            <BodyShort size="small" className={styles.datotekst}>
              <span>
                {formatDate(startdato)} - {formatDate(sluttdato)}
              </span>
            </BodyShort>
          )}
        </div>
      </SpaLenkepanel>
    </li>
  )
}
