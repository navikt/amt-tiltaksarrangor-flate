import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { Tiltakskode } from '../../../../../api/data/tiltak'
import { VarighetValg, varigheter, varighetValgForType } from './varighet'
import {
  BodyShort,
  DatePicker,
  Radio,
  RadioGroup,
  useDatepicker
} from '@navikt/ds-react'
import { formatDate } from '../../../../../utils/date-utils'
import styles from './SluttdatoVelger.module.scss'
import { useSluttdato } from './use-sluttdato'
import dayjs from 'dayjs'

interface SluttdatoVelgerProps {
  tiltakskode: Tiltakskode
  legend: string
  min?: Date
  max?: Date
  defaultSluttdato?: Date
  defaultVarighet?: VarighetValg
  onChange: (date: Date | undefined) => void
}

export interface ValidateRef {
  validate: () => boolean
  error?: string
}

export const SluttdatoVelger = forwardRef<ValidateRef, SluttdatoVelgerProps>(
  function SluttdatoVelger(
    {
      tiltakskode,
      legend,
      min,
      max,
      defaultSluttdato,
      defaultVarighet,
      onChange
    }: SluttdatoVelgerProps,
    ref
  ) {
    const [valgtVarighet, setValgtVarighet] = useState(defaultVarighet)
    const [dateInput, setDateInput] = useState<string>(
      defaultSluttdato ? formatDate(defaultSluttdato) : ''
    )

    const sluttdato = useSluttdato({
      min,
      max,
      valgtVarighet,
      defaultAnnetDato: defaultSluttdato
    })

    useEffect(() => {
      onChange(sluttdato.sluttdato)
    }, [sluttdato.sluttdato])

    const { datepickerProps } = useDatepicker({
      fromDate: min,
      toDate: max,
      defaultMonth: defaultSluttdato,
      defaultSelected: defaultSluttdato,
      onDateChange: (date) => {
        if (date) {
          setDateInput(formatDate(date))
        }
        sluttdato.handleChange(date)
      }
    })

    useImperativeHandle(ref, () => ({
      validate: sluttdato.valider,
      error: sluttdato.error
    }))

    const handleVarighet = (valgtVarighet: VarighetValg) => {
      setValgtVarighet(valgtVarighet)
    }

    const handleDateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const date = dayjs(e.target.value, 'DD.MM.YYYY', true)
      setDateInput(e.target.value)
      sluttdato.handleChange(date.toDate())
    }

    return (
      <RadioGroup
        value={valgtVarighet ?? ''}
        size="small"
        legend={legend}
        onChange={handleVarighet}
        error={sluttdato.error}
      >
        {varighetValgForType(tiltakskode).map((v) => (
          <Radio value={v} key={v}>
            {varigheter[v].navn}
          </Radio>
        ))}
        <Radio value={VarighetValg.ANNET}>
          Annet - velg dato
          {valgtVarighet === VarighetValg.ANNET && (
            <DatePicker {...datepickerProps}>
              <DatePicker.Input
                value={dateInput}
                label="Annet - velg dato"
                size="small"
                hideLabel={true}
                onChange={handleDateInputChange}
              />
            </DatePicker>
          )}
        </Radio>
        {valgtVarighet !== VarighetValg.ANNET && valgtVarighet && (
          <BodyShort size="small" className={styles.nySluttdato}>
            Ny sluttdato: {formatDate(sluttdato.sluttdato)}
          </BodyShort>
        )}
      </RadioGroup>
    )
  }
)
