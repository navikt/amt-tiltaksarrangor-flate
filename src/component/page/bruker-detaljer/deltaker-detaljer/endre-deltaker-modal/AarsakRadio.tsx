import { Radio } from '@navikt/ds-react'
import React from 'react'

import { DeltakerStatusAarsakType } from '../../../../../api/data/endringsmelding'
import { aarsakTekstMapper } from '../tekst-mappers'

interface AarsakRadioProps {
  aarsakType: DeltakerStatusAarsakType
}

export const AarsakRadio = ({ aarsakType }: AarsakRadioProps) => {
  const tekst = aarsakTekstMapper(aarsakType)
  return (
    <Radio value={aarsakType}>
      {tekst}
    </Radio>
  )
}
