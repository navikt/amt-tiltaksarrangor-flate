import dayjs from 'dayjs'
import React, { useState } from 'react'

import { DateValidationT } from '@navikt/ds-react'
import { formatDate } from '../../utils/date-utils'
import { Nullable } from '../../utils/types/or-nothing'
import { SimpleDatePicker } from './SimpleDatePicker'

interface Props {
  label: Nullable<string>
  defaultDate?: Nullable<Date>
  min?: Nullable<Date>
  max?: Nullable<Date>
  onDateChanged: (date: Nullable<Date>) => void
}

export const DateField = ({
  label,
  defaultDate,
  min,
  max,
  onDateChanged
}: Props): React.ReactElement => {
  const [errorMsg, setErrorMsg] = useState<string>()

  const onChange = (dato: Date | undefined): void => {
    if (!dato) {
      onDateChanged(null)
      return
    }
    onDateChanged(dato)
  }

  const validate = (validation: DateValidationT) => {
    if (validation.isInvalid) {
      setErrorMsg('Ugyldig dato')
    } else if (min && validation.isBefore) {
      setErrorMsg(
        `Dato må være etter ${formatDate(dayjs(min).subtract(1, 'day').toDate())}`
      )
    } else if (max && validation.isAfter) {
      setErrorMsg(
        `Dato må være før ${formatDate(dayjs(max).add(1, 'day').toDate())}`
      )
    } else {
      setErrorMsg(undefined)
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
