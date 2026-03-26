import { ChevronLeftIcon } from '@navikt/aksel-icons'
import { Label, Link } from '@navikt/ds-react'
import cls from 'classnames'
import React from 'react'
import { Link as RouterLink } from 'react-router-dom'

import styles from './Tilbakelenke.module.scss'

interface TilbakelenkeProps {
  to: string
  className?: string
}

export const Tilbakelenke = (
  props: TilbakelenkeProps
): React.ReactElement<TilbakelenkeProps> => {
  return (
    <Link as={RouterLink} to={props.to} className={cls(styles.tilbakelenke, props.className)}>
      <ChevronLeftIcon className={styles.pil} />
      <Label as="span" size="small">
        Tilbake
      </Label>
    </Link>

  )
}
