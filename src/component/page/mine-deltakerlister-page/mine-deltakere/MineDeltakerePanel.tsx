import { LinkCard } from '@navikt/ds-react'
import React from 'react'

import { Link } from 'react-router-dom'
import { VeilederFor } from '../../../../api/data/deltaker'
import { MINE_DELTAKERE_PAGE_ROUTE } from '../../../../navigation'
import clipboard from './clipboard.svg'
import styles from './MineDeltakerePanel.module.scss'

interface MineDeltakerePanelProps {
  veileder: VeilederFor
}

export const MineDeltakerePanel = (
  props: MineDeltakerePanelProps
): React.ReactElement<MineDeltakerePanelProps> => {
  return (
    <div className={styles.content}>
      <LinkCard>
        <LinkCard.Icon>
          <img src={clipboard} alt="" className={styles.clipboardimage} />
        </LinkCard.Icon>
        <LinkCard.Title>
          <LinkCard.Anchor asChild >
            <Link to={MINE_DELTAKERE_PAGE_ROUTE}>Mine deltakere</Link>
          </LinkCard.Anchor>
        </LinkCard.Title>

        <LinkCard.Description>
          Du er veileder for {props.veileder.veilederFor} deltakere og
          medveileder for {props.veileder.medveilederFor} deltakere.
        </LinkCard.Description>
      </LinkCard>
    </div>
  )
}
