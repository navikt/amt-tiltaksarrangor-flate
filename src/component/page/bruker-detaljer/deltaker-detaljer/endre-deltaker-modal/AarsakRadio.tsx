import { Radio } from '@navikt/ds-react'
import React from 'react'

import { aarsakTekstMapper } from '../tekst-mappers'
import { DeltakerStatusAarsakType } from '../../../../../api/data/deltakerStatusArsak'

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
