import { TextField } from '@navikt/ds-react'
import dayjs from 'dayjs'
import React, { useState } from 'react'

import { formatDate, formatNullableDateToDateInputStr } from '../../utils/date-utils'
import { Nullable } from '../../utils/types/or-nothing'

interface IProps {
	label: Nullable<string>
	date?: Nullable<Date>
	min?: Nullable<Date>
	max?: Nullable<Date>
	className?: string
	onDateChanged: (date: Nullable<Date>) => void
}

export const DateField = ({
	label,
	date,
	min,
	max,
	className,
	onDateChanged,
}: IProps): React.ReactElement => {
	const [ dateStr, setDateStr ] = useState(formatNullableDateToDateInputStr(date) || '')
	const [ errorMsg, setErrorMsg ] = useState<string>()

	const onChange = ((e: React.ChangeEvent<HTMLInputElement>): void => {
		const newDateStr = e.target.value
		const newDate = dayjs(newDateStr)
		const beforeMin = dayjs(min).subtract(1, 'day')

		setDateStr(newDateStr)
		
		if (!newDate.isValid()) {
			onDateChanged(null)
			setErrorMsg(undefined)
			return
		}

		if (min && newDate.isBefore(beforeMin)) {
			setErrorMsg(`Dato må være etter ${formatDate(beforeMin.toDate())}`)
			onDateChanged(null)
		} else if (max && newDate.isAfter(max)) {
			setErrorMsg(`Dato må være før ${formatDate(dayjs(max).add(1, 'day').toDate())}`)
			onDateChanged(null)
		} else {
			if (errorMsg) {
				setErrorMsg(undefined)
			}
			onDateChanged(newDate.toDate())
		}
	})

	return <TextField
		className={className}
		label={label}
		type={'date' as any} // eslint-disable-line
		value={dateStr}
		onChange={onChange}
		error={errorMsg}
		min={formatNullableDateToDateInputStr(min)}
		max={formatNullableDateToDateInputStr(max)}
	/>
}
