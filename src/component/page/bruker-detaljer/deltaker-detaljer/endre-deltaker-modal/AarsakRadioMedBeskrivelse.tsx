import { DeltakerStatusAarsakType } from '../../../../../api/data/endringsmelding'
import React, { useEffect, useState } from 'react'
import { aarsakTekstMapper } from '../tekst-mappers'
import { Textarea, useId } from '@navikt/ds-react'
import styles from './AarsakSelector.module.scss'
import { AarsakRadio } from './AarsakRadio'
import { Nullable } from '../../../../../utils/types/or-nothing'
import { BESKRIVELSE_MAKS_TEGN, fjernUgyldigeTegn } from '../../../../../utils/endre-deltaker-utils'

interface AarsakRadioMedBeskrivelseProps {
  aarsakType: DeltakerStatusAarsakType
  valgtAarsak: DeltakerStatusAarsakType | undefined
  onBeskrivelse: (beskrivelse: Nullable<string>) => void
}

export const AarsakRadioMedBeskrivelse = ({
  aarsakType,
  valgtAarsak,
  onBeskrivelse
}: AarsakRadioMedBeskrivelseProps) => {
  const [beskrivelse, settBeskrivelse] = useState<Nullable<string>>()
  const detailId = useId()
  const visBeskrivelse = valgtAarsak === aarsakType

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const nyBeskrivelse = fjernUgyldigeTegn(e.target.value)
    settBeskrivelse(nyBeskrivelse)
    onBeskrivelse(nyBeskrivelse)
  }

  useEffect(() => {
    if (valgtAarsak === aarsakType) {
      onBeskrivelse(beskrivelse)
    }
  }, [aarsakType, beskrivelse, onBeskrivelse, valgtAarsak])

  return (<>
    <AarsakRadio aarsakType={aarsakType} />
    {visBeskrivelse ? (
      <Textarea
        onChange={handleChange}
        value={beskrivelse ?? ''}
        minRows={1}
        rows={1}
        size="small"
        label={null}
        maxLength={BESKRIVELSE_MAKS_TEGN}
        className={styles.tekstboks}
        aria-label={aarsakTekstMapper(aarsakType)}
        aria-describedby={detailId}
      />
    ) : (
      <></>
    )}
  </>
  )
}
