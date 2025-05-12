import { DateValidationT, useDatepicker, DatePicker } from '@navikt/ds-react'

interface Props {
  readonly label?: string
  readonly error?: string
  readonly min?: Date
  readonly max?: Date
  readonly defaultDate?: Date
  readonly defaultMonth?: Date
  readonly onValidate?: (validation: DateValidationT, date?: Date) => void
  readonly onChange: (date: Date | undefined) => void
}

export function SimpleDatePicker({
  label,
  error,
  min,
  max,
  defaultDate,
  defaultMonth,
  onValidate,
  onChange,
}: Props) {
  const { datepickerProps, inputProps } = useDatepicker({
    fromDate: min,
    toDate: max,
    defaultSelected: defaultDate,
    defaultMonth: defaultMonth,
    onValidate: onValidate,
    onDateChange: onChange,
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
