import dayjs from 'dayjs'

import { EMDASH } from './constants'
import { Nullable } from './types/or-nothing'

export const formatDate = (date: Nullable<Date>): string => {
	if (!date) return EMDASH
	return dayjs(date).format('DD.MM.YYYY')
}

export const formatDateStr = (dateStr: Nullable<string>): string => {
	if (!dateStr) return EMDASH
	return dayjs(dateStr).format('DD.MM.YYYY')
}

export const dateStrWithMonthName = (dateStr: Nullable<Date>): string => {
	if (!dateStr) return EMDASH
	return dayjs(dateStr).format('DD. MMMM YYYY')
}

export const formatDateStrToDateInputStr = (dateStr: string): string => {
	return dayjs(dateStr).format('YYYY-MM-DD')
}

export const formatDateToDateInputStr = (date: Date): string => {
	return dayjs(date).format('YYYY-MM-DD')
}

export const formatNullableDateToDateInputStr = (date: Nullable<Date>): string | undefined => {
	if (!date) return undefined
	return dayjs(date).format('YYYY-MM-DD')
}

export const stringToDate = (dateStr: string): Date => dayjs(dateStr, 'YYYY-MM-DD').toDate()

export const sortDateNullsFirst = (d1Str: Nullable<string>, d2Str: Nullable<string>): number => {
	if (d1Str == null) {
		return -1
	}

	if (d2Str == null) {
		return 1
	}

	const date1 = dayjs(d1Str)
	const date2 = dayjs(d2Str)

	if (date1.isSame(date2)) {
		return 0
	}

	return date1.isBefore(date2) ? -1 : 1
}

export const maxDate = (date1: Nullable<Date>, date2: Nullable<Date>) : Nullable<Date> => {
	if(date1 == null) return date2
	if(date2 == null) return date1

	return dayjs(date1).isAfter(dayjs(date2))? date1 : date2
}