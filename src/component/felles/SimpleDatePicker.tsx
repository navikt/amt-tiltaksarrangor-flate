import { DateValidationT, useDatepicker, DatePicker } from '@navikt/ds-react'
import dayjs from 'dayjs'
import React from 'react'
import { useRef } from 'react'

interface Props {
  label?: string
  error?: string
  min?: Date
  max?: Date
  defaultDate?: Date
  defaultMonth?: Date
  onValidate?: (validation: DateValidationT, date?: Date) => void
  onChange: (date: Date | undefined) => void
}

export function SimpleDatePicker({
  label,
  error,
  min,
  max,
  defaultDate,
  defaultMonth,
  onValidate,
  onChange
}: Props) {
  const ref = useRef<HTMLInputElement>(null)
  const { datepickerProps, inputProps } = useDatepicker({
    fromDate: min,
    toDate: max,
    defaultSelected: defaultDate,
    defaultMonth: defaultMonth,
    onValidate: (dateValidation) => {
      if (onValidate) {
        onValidate(dateValidation, dayjs(ref?.current?.value).toDate())
      }
    },
    onDateChange: onChange
  })

  return (
    <DatePicker {...datepickerProps}>
      <DatePicker.Input
        {...inputProps}
        ref={ref}
        label={label}
        error={error}
        size="small"
      />
    </DatePicker>
  )
}
