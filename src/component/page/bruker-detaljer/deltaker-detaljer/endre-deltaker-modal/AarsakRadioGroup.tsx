import { Radio, RadioGroup, Textarea } from '@navikt/ds-react'
import { BESKRIVELSE_MAKS_TEGN, fjernUgyldigeTegn } from '../../../../../utils/endre-deltaker-utils'
import { DeltakerStatusAarsakType } from '../../../../../api/data/deltakerStatusArsak'
import { aarsakTekstMapper } from '../tekst-mappers'

const standardAarsaker = [
  DeltakerStatusAarsakType.FATT_JOBB,
  DeltakerStatusAarsakType.SYK,
  DeltakerStatusAarsakType.TRENGER_ANNEN_STOTTE,
  DeltakerStatusAarsakType.IKKE_MOTT,
  DeltakerStatusAarsakType.UTDANNING,
  DeltakerStatusAarsakType.ANNET
]

interface Props {
  aarsak?: DeltakerStatusAarsakType
  aarsakError?: string
  beskrivelse?: string
  beskrivelseError?: string
  legend: string
  disabled?: boolean
  velgbareAarsaker?: DeltakerStatusAarsakType[]
  className?: string
  onChange: (value: DeltakerStatusAarsakType) => void
  onBeskrivelse: (beskrivelse: string) => void
}

export function AarsakRadioGroup({
  aarsak,
  aarsakError,
  beskrivelse,
  beskrivelseError,
  onChange,
  onBeskrivelse,
  legend,
  disabled,
  velgbareAarsaker,
  className
}: Props) {
  const tilgjengeligeAarsaker = velgbareAarsaker ?? standardAarsaker

  return (
    <RadioGroup
      legend={legend}
      size="small"
      error={aarsakError}
      onChange={onChange}
      value={aarsak ?? ''}
      disabled={disabled}
      className={className ?? ''}
    >
      <>
        {tilgjengeligeAarsaker.map((arsakType) => (
          <Radio value={arsakType} key={arsakType}>
            {aarsakTekstMapper(arsakType)}
          </Radio>
        ))}
        {aarsak === DeltakerStatusAarsakType.ANNET && (
          <Textarea
            onChange={(e) => onBeskrivelse(fjernUgyldigeTegn(e.target.value))}
            value={beskrivelse ?? ''}
            minRows={1}
            rows={1}
            size="small"
            label={null}
            error={beskrivelseError}
            maxLength={BESKRIVELSE_MAKS_TEGN}
            aria-label={'Beskrivelse for årsak "Annet"'}
          />
        )}
      </>
    </RadioGroup>
  )
}
