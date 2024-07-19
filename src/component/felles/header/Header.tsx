import { Heading } from '@navikt/ds-react'
import React from 'react'
import { useTilbakelenkeStore } from '../../../store/tilbakelenke-store'
import { Tilbakelenke } from '../tilbakelenke/Tilbakelenke'
import styles from './Header.module.scss'

interface HeaderProps {
  isLoggedIn: boolean
}

export const Header = (props: HeaderProps): React.ReactElement => {
  const { tilbakeTilUrl } = useTilbakelenkeStore()

  if (!props.isLoggedIn) return <></>

  return (
    <nav className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.titleWrapper}>
          {tilbakeTilUrl && <Tilbakelenke to={tilbakeTilUrl} />}
        </div>
        <Heading size="medium" level="1" className={styles.title}>
          Deltakeroversikt
        </Heading>
      </div>
    </nav>
  )
}
