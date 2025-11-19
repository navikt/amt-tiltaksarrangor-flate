import { RadioGroup } from '@navikt/ds-react'
import React, { useEffect, useState } from 'react'
import { Nullable } from '../../../../../utils/types/or-nothing'
import { AarsakRadio } from './AarsakRadio'
import { AarsakRadioMedBeskrivelse } from './AarsakRadioMedBeskrivelse'
import { DeltakerStatusAarsakType } from '../../../../../api/data/deltakerStatusArsak'

interface AarsakSelectorProps {
  tittel: string,
  defaultAarsak?: DeltakerStatusAarsakType,
  onAarsakSelected: (
    aarsak: DeltakerStatusAarsakType,
    beskrivelse: Nullable<string>
  ) => void
}

export const AarsakSelector = ({
  tittel,
  defaultAarsak,
  onAarsakSelected,
}: AarsakSelectorProps) => {
  const [ aarsak, settAarsak ] = useState<DeltakerStatusAarsakType | undefined>(defaultAarsak)
  const [beskrivelse, settBeskrivelse] = useState<Nullable<string>>()
  const onBeskrivelse = (nyBeskrivelse: Nullable<string>) => {
    settBeskrivelse(nyBeskrivelse)
  }

  useEffect(() => {
    if (!aarsak) return
    const aarsakBeskrivelse =
      aarsak === DeltakerStatusAarsakType.ANNET ? beskrivelse : null
    onAarsakSelected(aarsak, aarsakBeskrivelse)
  }, [beskrivelse, aarsak, onAarsakSelected, tittel])

  return (
    <RadioGroup size="small" legend={tittel} onChange={(a) => settAarsak(a)} defaultValue={aarsak}>
      <AarsakRadio aarsakType={DeltakerStatusAarsakType.FATT_JOBB} />
      <AarsakRadio aarsakType={DeltakerStatusAarsakType.SYK} />
      <AarsakRadio aarsakType={DeltakerStatusAarsakType.TRENGER_ANNEN_STOTTE} />
      <AarsakRadio aarsakType={DeltakerStatusAarsakType.IKKE_MOTT} />
      <AarsakRadio aarsakType={DeltakerStatusAarsakType.UTDANNING} />
      <AarsakRadioMedBeskrivelse
        aarsakType={DeltakerStatusAarsakType.ANNET}
        valgtAarsak={aarsak}
        onBeskrivelse={onBeskrivelse}
      />
    </RadioGroup>
  )
}
