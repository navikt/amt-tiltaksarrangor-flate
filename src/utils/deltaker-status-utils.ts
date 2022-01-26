import { TiltakDeltaker, TiltakDeltakerStatus } from '../domeneobjekter/deltaker'

export const getAntallDeltakerePerStatus = (deltakere: TiltakDeltaker[]): Map<TiltakDeltakerStatus, number> => {
	const statusMap = new Map<TiltakDeltakerStatus, number>()
	deltakere.forEach((deltaker: TiltakDeltaker) => {
		const status = deltaker.status
		const entry = statusMap.get(status)

		if (entry) {
			statusMap.set(status, entry + 1)
		} else {
			statusMap.set(status, 1)
		}
	})

	return statusMap
}
