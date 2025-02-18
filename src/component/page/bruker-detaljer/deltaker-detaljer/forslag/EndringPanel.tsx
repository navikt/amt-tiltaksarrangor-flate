import React from 'react'
import { ForslagEndringType, ForslagStatusType } from '../../../../../api/data/forslag'

import {
  Box,
  HGrid,
  Heading,
  VStack
} from '@navikt/ds-react'
import { EndringType } from '../../../../../api/data/historikk'
import { EndringTypeIkon } from '../EndringTypeIkon'
import styles from './AktivtForslagPanel.module.scss'
import { ForslagStatusTag } from './ForslagStatusTag'
import { endringsTittel } from './forslagUtils'

export interface Props {
  children: React.ReactNode
  tittel?: string
  fjernEndringComponent: React.ReactNode
  forslagStatusType?: ForslagStatusType
  endringType: EndringType | ForslagEndringType
  erAktivtForslag?: boolean
}

export const EndringPanel = ({
  children,
  tittel,
  fjernEndringComponent,
  forslagStatusType,
  endringType,
  erAktivtForslag
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
        <VStack>
          <EndringTypeIkon
            size="large"
            type={endringType}
          />
        </VStack>
        <VStack>
          <div className={styles.tittel}>
            <Heading level="4" size="small" className={styles.tittel_hedaing}>
              {tittel || endringsTittel(endringType)}
            </Heading>
            {forslagStatusType && <ForslagStatusTag
              type={forslagStatusType}
              className={styles.status}
            />}

            {erAktivtForslag && fjernEndringComponent}

          </div>
          {children}
        </VStack>
      </HGrid>

      {!erAktivtForslag && fjernEndringComponent}
    </Box>
  )
}
