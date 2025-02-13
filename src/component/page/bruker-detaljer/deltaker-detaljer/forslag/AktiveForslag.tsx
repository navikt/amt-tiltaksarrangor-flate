import React from 'react'
import { AktivtForslag } from '../../../../../api/data/forslag'
import styles from './Forslag.module.scss'
import { Box, Heading } from '@navikt/ds-react'
import { AktivtForslagPanel } from './AktivtForslagPanel'

interface Props {
  readonly forslag: AktivtForslag[]
  readonly deltakerId: string
  readonly fjernBehandledeForslag: (forslag: AktivtForslag) => void
}
export const AktiveForslag = ({
  deltakerId,
  forslag,
  fjernBehandledeForslag
}: Props) => {
  if (forslag.length === 0) {
    return
  }

  return (
    <Box
      background="bg-subtle"
      padding={{ xs: '2', md: '4' }}
      borderRadius="medium"
    >
      <Heading level="3" size="small" className={styles.aktiveForslagTitle}>
        Forslag sendt til Nav:
      </Heading>
      {forslag.map((it) => {
        return (
          <AktivtForslagPanel
            forslag={it}
            deltakerId={deltakerId}
            fjernBehandledeForslag={fjernBehandledeForslag}
            key={it.id}
          />
        )
      })}
    </Box>
  )
}
