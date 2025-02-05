import { forwardRef, useImperativeHandle, useState } from 'react'
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
  detailLabel?: string
  min?: Date
  max?: Date
  defaultSluttdato?: Date
  defaultMaaned?: Date
  defaultVarighet?: VarighetValg
  erForOppstartsdato?: boolean
}

export interface SluttdatoRef {
  sluttdato: Date | undefined
  validate: () => boolean
  error?: string
}

export const SluttdatoVelger = forwardRef<SluttdatoRef, SluttdatoVelgerProps>(
  function SluttdatoVelger(
    {
      tiltakskode,
      legend,
      detailLabel,
      min,
      max,
      defaultSluttdato,
      defaultMaaned,
      defaultVarighet,
      erForOppstartsdato
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

    const { datepickerProps } = useDatepicker({
      fromDate: min,
      toDate: max,
      defaultMonth: defaultSluttdato ?? defaultMaaned,
      defaultSelected: defaultSluttdato,
      onDateChange: (date: Date | undefined) => {
        if (date) {
          setDateInput(formatDate(date))
        } else {
          setDateInput('')
        }
        sluttdato.handleChange(date)
      }
    })

    useImperativeHandle(ref, () => ({
      sluttdato: sluttdato.sluttdato,
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
        {varighetValgForType(tiltakskode, erForOppstartsdato).map((v) => (
          <Radio value={v} key={v}>
            {varigheter[v].navn}
          </Radio>
        ))}
        <Radio value={VarighetValg.ANNET}>
          Annet - velg dato
        </Radio>
        {valgtVarighet === VarighetValg.ANNET && (
          <DatePicker {...datepickerProps} >
            <DatePicker.Input
              className={styles.velgSluttdatoField}
              value={dateInput}
              label="Annet - velg dato"
              size="small"
              hideLabel={true}
              onChange={handleDateInputChange}
            />
          </DatePicker>
        )}
        {valgtVarighet !== VarighetValg.ANNET && valgtVarighet && (
          <BodyShort size="small" className={styles.nySluttdato}>
            {detailLabel || 'Ny sluttdato'}: {formatDate(sluttdato.sluttdato)}
          </BodyShort>
        )}
      </RadioGroup>
    )
  }
)
