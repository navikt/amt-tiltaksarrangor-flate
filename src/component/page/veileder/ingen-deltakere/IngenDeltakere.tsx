import { GuidePanel } from '@navikt/ds-react'
import React from 'react'
import styles from './IngenDeltakere.module.scss'
import adult from './adult.svg'

export const IngenDeltakere = (): JSX.Element => (
  <div className={styles.ingenDeltakere}>
    <GuidePanel poster illustration={<img src={adult} alt={'Adult'} />}>
      Du er logget inn som veileder i deltakeroversikten. Her kan du holde
      oversikt over deltakere som du følger opp.
      <br />
      <br />
      Du er ikke veileder til noen deltakere nå. Koordinator kan tildele deg som
      veileder til deltakere.
    </GuidePanel>
  </div>
)
