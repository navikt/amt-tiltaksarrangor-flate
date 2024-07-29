import { useEffect, useState } from 'react'
import { Tiltakskode } from '../../../../../api/data/tiltak'
import { Nullable } from '../../../../../utils/types/or-nothing'
import { VarighetValg, varigheter, varighetValgForType } from './varighet'
import dayjs from 'dayjs'
import { BodyShort, Radio, RadioGroup } from '@navikt/ds-react'
import { DateField } from '../../../../felles/DateField'
import { formatDate } from '../../../../../utils/date-utils'
import styles from './SluttdatoVelger.module.scss'

interface SluttdatoVelgerProps {
  tiltakskode: Tiltakskode
  legend: string
  mindato: Nullable<Date>
  maxdato: Nullable<Date>
  defaultSluttdato?: Nullable<Date>
  defaultVarighet?: VarighetValg
  onChange: (date: Nullable<Date>) => void
}

export function SluttdatoVelger({
  tiltakskode,
  legend,
  mindato,
  maxdato,
  defaultSluttdato,
  defaultVarighet,
  onChange
}: SluttdatoVelgerProps) {
  const [varighet, setVarighet] = useState(defaultVarighet)
  const [annet, setAnnet] = useState<Nullable<Date>>(defaultSluttdato)

  useEffect(() => {
    if (varighet) {
      if (varighet !== VarighetValg.ANNET) {
        onChange(kalkulerSluttDato(varighet))
      } else {
        handleAnnet(annet)
      }
    }
  }, [varighet])

  const kalkulerSluttDato = (valgtVarighet: VarighetValg): Date => {
    const v = varigheter[valgtVarighet]
    return dayjs(mindato).add(v.antall, v.tidsenhet).toDate()
  }

  const handleAnnet = (date: Nullable<Date>) => {
    setAnnet(date)
    onChange(date)
  }

  const handleVarighet = (valgtVarighet: VarighetValg) => {
    setVarighet(valgtVarighet)
  }

  return (
    <RadioGroup size="small" legend={legend} onChange={handleVarighet}>
      {varighetValgForType(tiltakskode).map((v) => (
        <Radio value={v} key={v}>
          {varigheter[v].navn}
        </Radio>
      ))}
      <Radio value={VarighetValg.ANNET}>
        Annet - velg dato
        {varighet === VarighetValg.ANNET && (
          <DateField
            defaultDate={annet}
            min={mindato}
            max={maxdato}
            label={null}
            onDateChanged={handleAnnet}
            aria-label="Annet - velg dato"
          />
        )}
      </Radio>
      {varighet !== VarighetValg.ANNET && varighet && (
        <BodyShort size="small" className={styles.nySluttdato}>
          Ny sluttdato: {formatDate(kalkulerSluttDato(varighet))}
        </BodyShort>
      )}
    </RadioGroup>
  )
}
