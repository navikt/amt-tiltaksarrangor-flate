import React from 'react'
import { ForslagEndringType, ForslagStatusType } from '../../../../../api/data/forslag'

import {
  Box,
  HGrid,
  Heading,
  VStack
} from '@navikt/ds-react'
import { EndringType, TiltakskoordinatorEndringsType } from '../../../../../api/data/historikk'
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
  nyNavVeileder?: boolean
}

export const EndringPanel = ({
  children,
  tittel,
  fjernEndring,
  forslagStatusType,
  endringType,
  erAktivtForslag,
  ulestEndringType,
  nyNavVeileder
}: Props) => {
  const endringIkon = endringType
    ? <EndringTypeIkon size="large" type={endringType} />
    : ulestEndringType 
      ? <EndringTypeIkon size="large" type={ulestEndringType} />
      : <DefaultIcon size="large" />

  return (
    <Box
      background="surface-default"
      borderColor="border-default"
      borderWidth="1"
      borderRadius="medium"
      className={styles.panel}
    >
      <HGrid columns="2rem auto" className={styles.grid}>
        {endringIkon}
        <VStack>
          <div className={styles.tittel}>
            <Heading level="4" size="small" className={styles.tittel_hedaing}>
              {getEndringsTittel(tittel, endringType, ulestEndringType, nyNavVeileder)}
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
  ulestEndringType?: UlestEndringType,
  nyNavVeileder?: boolean
): string => {
  if (tittel) {
    return tittel
  } else if (endringType) {
    return forslagEndringsTittel(endringType)
  } else if (ulestEndringType === UlestEndringType.NavBrukerEndring) {
    return 'Kontaktinformasjon oppdatert'
  } else if (nyNavVeileder) {
    return 'Endret Nav-veileder'
  } else if (ulestEndringType === UlestEndringType.NavEndring) {
    return 'Kontaktinformasjon til Nav oppdatert'
  } else if (ulestEndringType === UlestEndringType.DeltMedArrangor) {
    return 'Informasjon sendt til arrangør'
  } else if (ulestEndringType === UlestEndringType.TildeltPlass) {
    return 'Fått plass'
  } else if (ulestEndringType === UlestEndringType.Avslag) {
		return 'Deltakelse ikke aktuell'
	}
  return 'Oppdatert deltaker'
}
