import { TiltakDeltaker, TiltakDeltakerStatus } from '../domeneobjekter/deltaker'

export const getAntallDeltakerePerStatus = (deltakere: TiltakDeltaker[]): Map<TiltakDeltakerStatus, number> => {
	const statusMap = new Map<TiltakDeltakerStatus, number>()
	deltakere.forEach((deltaker: TiltakDeltaker) => {
		const status = deltaker.status
		const entry = statusMap.get(status)

		statusMap.set(status, entry ? entry + 1 : 1)
	})

	return statusMap
}
