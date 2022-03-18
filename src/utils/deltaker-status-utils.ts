import dayjs from 'dayjs'

import { DeltakerStatusDto, TiltakDeltakerDto, TiltakDeltakerStatus } from '../api/data/deltaker'


export const getAntallDeltakerePerStatus = (deltakere: TiltakDeltakerDto[]): Map<TiltakDeltakerStatus, number> => {
	const statusMap = new Map<TiltakDeltakerStatus, number>()
	deltakere.forEach((deltaker: TiltakDeltakerDto) => {
		const status = deltaker.status.type
		const entry = statusMap.get(status)

		statusMap.set(status, entry ? entry + 1 : 1)
	})

	return statusMap
}

export const deltakerSkalSkjulesFra = (status: DeltakerStatusDto) => {
	return dayjs(status.endretDato).add(2, 'w')
}

export const sluttaForOver2UkerSiden = (status: DeltakerStatusDto) => {
	const skalSkjulesDato = deltakerSkalSkjulesFra(status)
	return (status.type === TiltakDeltakerStatus.IKKE_AKTUELL || status.type === TiltakDeltakerStatus.HAR_SLUTTET )
		&& dayjs().isAfter(skalSkjulesDato)
}