import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'

import { DateValidationT } from '@navikt/ds-react'
import { formatDate } from '../../utils/date-utils'
import { Nullable } from '../../utils/types/or-nothing'
import { SimpleDatePicker } from './SimpleDatePicker'

interface Props {
  label: Nullable<string>
  defaultDate?: Nullable<Date>
  min?: Nullable<Date>
  max?: Nullable<Date>
  error?: string
  onValidate?: (validation: DateValidationT) => void
  onDateChanged: (date: Nullable<Date>) => void
}

export const DateField = ({
  label,
  defaultDate,
  min,
  max,
  error,
  onDateChanged,
  onValidate
}: Props): React.ReactElement => {
  const [errorMsg, setErrorMsg] = useState<string | undefined>()

  useEffect(() => {
    if (error) {
      onDateChanged(null)
    }
    setErrorMsg(error)
  }, [error])

  const onChange = (dato: Date | undefined): void => {
    if (!dato) {
      onDateChanged(null)
      return
    }
    onDateChanged(dato)
  }

  const validate = (validation: DateValidationT) => {
    if (onValidate) {
      onValidate(validation)
    } else {
      setErrorMsg(validateRange(validation, min, max))
    }
  }

  return (
    <SimpleDatePicker
      label={label ?? undefined}
      error={errorMsg}
      defaultDate={defaultDate ?? undefined}
      onChange={onChange}
      onValidate={validate}
      min={min ?? undefined}
      max={max ?? undefined}
    />
  )
}

export function validateRange(
  validation: DateValidationT,
  min: Nullable<Date>,
  max: Nullable<Date>
) {
  if (validation.isInvalid) {
    return 'Ugyldig dato'
  } else if (min && validation.isBefore) {
    return `Dato må være etter ${formatDate(dayjs(min).subtract(1, 'day').toDate())}`
  } else if (max && validation.isAfter) {
    return `Dato må være før ${formatDate(dayjs(max).add(1, 'day').toDate())}`
  } else {
    return undefined
  }
}
