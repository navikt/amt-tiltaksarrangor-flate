import { Button } from '@navikt/ds-react'
import cls from 'classnames'
import React, { useEffect, useState } from 'react'

import { klikkFnrKnapp, loggKlikk } from '../../../../utils/amplitude-utils'
import styles from './KopierKnapp.module.scss'

interface KopierKnappProps {
  kopierTekst: string
  children: React.ReactNode
  className?: string
  ariaLabel?: string
}

const COPY_TOOLTIP_DURATION_MS = 1000

export const KopierKnapp = (
  props: KopierKnappProps
): React.ReactElement<KopierKnappProps> => {
  const [copySuccess, setCopySuccess] = useState<boolean>(false)

  const handleOnClick = () => {
    navigator.clipboard
      .writeText(props.kopierTekst)
      .then(() => setCopySuccess(true))
      .catch(() => setCopySuccess(false))

    loggKlikk(klikkFnrKnapp)
  }

  useEffect(() => {
    if (copySuccess) {
      const timeOutId = window.setTimeout(
        () => setCopySuccess(false),
        COPY_TOOLTIP_DURATION_MS
      )

      return () => clearTimeout(timeOutId)
    }
  }, [copySuccess])

  return (
    <div className={styles.wrapper}>
      <Button
        onClick={handleOnClick}
        aria-label={props.ariaLabel}
        className={cls(styles.kopierKnapp, props.className)}
      >
        {props.children}
      </Button>
      <span
        className={cls(styles.tooltip, {
          [styles.tooltipVisible]: copySuccess
        })}
      >
        Kopiert
      </span>
    </div>
  )
}
