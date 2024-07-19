import React from 'react'

import { hentFodselsdato, hentPersonnummer } from '../../../utils/bruker-utils'
import styles from './Fnr.module.scss'

interface FnrProps {
  fnr: string
}

export const Fnr = (props: FnrProps): React.ReactElement => {
  const fodselsdato = hentFodselsdato(props.fnr)
  const personnummer = hentPersonnummer(props.fnr)

  return (
    <>
      <span className={styles.fodselsdato}>{fodselsdato}</span>
      <span>{personnummer}</span>
    </>
  )
}
