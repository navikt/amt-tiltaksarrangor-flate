import { PersonIcon } from '@navikt/aksel-icons'
import { Heading } from '@navikt/ds-react'
import React from 'react'

import { Koordinator } from '../../../api/data/tiltak'
import globalStyles from '../../../globals.module.scss'
import styles from './KoordinatorInfo.module.scss'

const koordinatorDisplayString = (k: Koordinator): string => {
  if (k.mellomnavn != null) {
    return `${k.fornavn} ${k.mellomnavn} ${k.etternavn}`
  }
  return `${k.fornavn} ${k.etternavn}`
}

interface KoordinatorInfoProps {
  koordinatorer: Koordinator[]
}

export const KoordinatorInfo = (props: KoordinatorInfoProps) => {
  if (props.koordinatorer.length === 0) {
    return <></>
  }

  return (
    <div className={globalStyles.blokkM}>
      <Heading size="xsmall" level="3" className={globalStyles.blokkXxs}>
        Koordinatorer
      </Heading>
      <ul className={styles.koordinatorList}>
        {props.koordinatorer.map((k) => (
          <li className={styles.koordinator} key={koordinatorDisplayString(k)}>
            <PersonIcon aria-hidden className={styles.koordinatorIcon} />{' '}
            {koordinatorDisplayString(k)}
          </li>
        ))}
      </ul>
    </div>
  )
}
