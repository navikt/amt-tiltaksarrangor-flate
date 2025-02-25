import React from 'react'
import { ForslagEndringType, ForslagStatusType } from '../../../../../api/data/forslag'

import {
  Box,
  HGrid,
  Heading,
  VStack
} from '@navikt/ds-react'
import { EndringType } from '../../../../../api/data/historikk'
import { UlestEndringType } from '../../../../../api/data/ulestEndring'
import { DefaultIcon, EndringTypeIkon } from '../EndringTypeIkon'
import styles from './AktivtForslagPanel.module.scss'
import { ForslagStatusTag } from './ForslagStatusTag'
import { forslagEndringsTittel } from './forslagUtils'

export interface Props {
  children: React.ReactNode
  fjernEndring: React.ReactNode
  tittel?: string
  forslagStatusType?: ForslagStatusType
  endringType?: EndringType | ForslagEndringType
  erAktivtForslag?: boolean
  ulestEndringType?: UlestEndringType
}

export const EndringPanel = ({
  children,
  tittel,
  fjernEndring,
  forslagStatusType,
  endringType,
  erAktivtForslag,
  ulestEndringType,
}: Props) => {
  return (
    <Box
      background="surface-default"
      borderColor="border-default"
      borderWidth="1"
      borderRadius="medium"
      className={styles.panel}
    >
      <HGrid columns="2rem auto" className={styles.grid}>
        {endringType
          ? <EndringTypeIkon size="large" type={endringType} />
          : <DefaultIcon size="large" />
        }
        <VStack>
          <div className={styles.tittel}>
            <Heading level="4" size="small" className={styles.tittel_hedaing}>
              {getEndringsTittel(tittel, endringType, ulestEndringType)}
            </Heading>
            {forslagStatusType && <ForslagStatusTag type={forslagStatusType} />}
            {erAktivtForslag && fjernEndring}
          </div>
          {children}
        </VStack>
      </HGrid>

      {!erAktivtForslag && fjernEndring}
    </Box>
  )
}

const getEndringsTittel = (
  tittel?: string,
  endringType?: EndringType | ForslagEndringType,
  ulestEndringType?: UlestEndringType
): string => {
  if (tittel) {
    return tittel
  } else if (endringType) {
    return forslagEndringsTittel(endringType)
  } else if (ulestEndringType === UlestEndringType.NavBrukerEndring) {
    return 'Kontaktinformasjon oppdatert'
  } else if (ulestEndringType === UlestEndringType.NavEndring) {
    return 'Kontaktinformasjon til Nav oppdatert'
  }
  return 'Oppdatert deltkaer'
}