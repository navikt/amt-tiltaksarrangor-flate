import { ChevronUpIcon, ChevronDownIcon } from '@navikt/aksel-icons'
import { BodyLong, Label } from '@navikt/ds-react'
import React, { useState } from 'react'

import { EMDASH } from '../../../../utils/constants'
import { Nullable } from '../../../../utils/types/or-nothing'
import { Show } from '../../../felles/Show'
import styles from './Bakgrunnsinfo.module.scss'

interface BakgrunnsinfoProps {
  tekst: Nullable<string>
  label: string
}

const MAX_LENGTH = 350

export const Bakgrunnsinfo = ({ tekst, label }: BakgrunnsinfoProps) => {
  const [showAll, setShowAll] = useState(false)

  const erBakgrunnsinfoOverMax = (tekst?.length || 0) > MAX_LENGTH
  let bakgrunnsinfoTekst = tekst || EMDASH

  if (!showAll && erBakgrunnsinfoOverMax) {
    bakgrunnsinfoTekst = bakgrunnsinfoTekst.substring(0, MAX_LENGTH) + '...'
  }

  const toggleShowAll = () => {
    setShowAll((prevShowAll) => !prevShowAll)
  }

  return (
    <div className={styles.wrapper}>
      <Label size="small" as="p">
        {label}
      </Label>

      <BodyLong size="small" className={styles.tekst}>
        {bakgrunnsinfoTekst}
      </BodyLong>

      <Show if={erBakgrunnsinfoOverMax}>
        {showAll && (
          <button className={styles.toggleKnapp} onClick={toggleShowAll}>
            Skjul <ChevronUpIcon />
          </button>
        )}
        {!showAll && (
          <button className={styles.toggleKnapp} onClick={toggleShowAll}>
            Les mer <ChevronDownIcon />
          </button>
        )}
      </Show>
    </div>
  )
}
