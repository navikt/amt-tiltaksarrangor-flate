import dayjs from 'dayjs'

import { EMDASH } from './constants'
import { OrNothing } from './types/or-nothing'

export const formatDate = (dateStr: Date | undefined): string => {
	if (!dateStr) return EMDASH
	return dayjs(dateStr).format('DD.MM.YYYY')
}

export const dateStrWithMonthName = (dateStr: Date | undefined): string => {
	if (!dateStr)
		return ''

	return dayjs(dateStr).format('DD. MMMM YYYY')
}

export const formatDateInputStr = (dateStr: OrNothing<string>): string => {
	return dateStr ? dayjs(dateStr).format('YYYY-MM-DD') : ''
}

export const stringToDate = (dateStr: string): Date => dayjs(dateStr, 'YYYY-MM-DD').toDate()

export const sortDateNullsFirst = (d1Str: OrNothing<string>, d2Str: OrNothing<string>): number => {
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
