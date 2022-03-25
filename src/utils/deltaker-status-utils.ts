import dayjs from 'dayjs'

import { DeltakerStatus, TiltakDeltaker, TiltakDeltakerStatus } from '../api/data/deltaker'


export const getAntallDeltakerePerStatus = (deltakere: TiltakDeltaker[]): Map<TiltakDeltakerStatus, number> => {
	const statusMap = new Map<TiltakDeltakerStatus, number>()
	deltakere.forEach((deltaker: TiltakDeltaker) => {
		const status = deltaker.status.type
		const entry = statusMap.get(status)

		statusMap.set(status, entry ? entry + 1 : 1)
	})

	return statusMap
}

export const deltakerSkalSkjulesFra = (status: DeltakerStatus) => {
	return dayjs(status.endretDato).add(2, 'w')
}

export const sluttaForOver2UkerSiden = (status: DeltakerStatus) => {
	const skalSkjulesDato = deltakerSkalSkjulesFra(status)
	return (status.type === TiltakDeltakerStatus.IKKE_AKTUELL || status.type === TiltakDeltakerStatus.HAR_SLUTTET )
		&& dayjs().isAfter(skalSkjulesDato)
}