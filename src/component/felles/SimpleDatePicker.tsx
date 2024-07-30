import { DateValidationT, useDatepicker, DatePicker } from '@navikt/ds-react'

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
  const { datepickerProps, inputProps } = useDatepicker({
    fromDate: min,
    toDate: max,
    defaultSelected: defaultDate,
    defaultMonth: defaultMonth,
    onValidate: onValidate,
    onDateChange: onChange
  })

  return (
    <DatePicker {...datepickerProps}>
      <DatePicker.Input
        {...inputProps}
        label={label}
        size="small"
        error={error}
      />
    </DatePicker>
  )
}
