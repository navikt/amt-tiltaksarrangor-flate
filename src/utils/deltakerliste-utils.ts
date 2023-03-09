import { Deltakerliste, TiltakDeltakerStatus, VeiledersDeltaker } from '../api/data/deltaker'

export const finnUnikeTiltakstyper = (detakerlister: Deltakerliste[]): string[] => {
	const unikeTiltakstyper: string[] = []

	detakerlister.forEach(deltakerliste => {
		const type1 = unikeTiltakstyper.find(t => t === deltakerliste.type)

		if (!type1) {
			unikeTiltakstyper.push(deltakerliste.type)
		}
	})

	return unikeTiltakstyper
}

export const finnDeltakerlister = (type: string, deltakerlister: Deltakerliste[]): Deltakerliste[] => {
	return deltakerlister.filter(deltakerliste => deltakerliste.type === type)
}

export const getAntallVeiledersDeltakerePerStatus = (deltakere: VeiledersDeltaker[]): Map<TiltakDeltakerStatus, number> => {
	const statusMap = new Map<TiltakDeltakerStatus, number>()
	deltakere.forEach((deltaker: VeiledersDeltaker) => {
		const status = deltaker.status.type
		const entry = statusMap.get(status)

		statusMap.set(status, entry ? entry + 1 : 1)
	})

	return statusMap
}

export const getDeltakerePerDeltakerliste = (deltakere: VeiledersDeltaker[]): Map<string, number> => {
	const deltakerlisteMap = new Map<string, number>()
	deltakere.forEach((deltaker: VeiledersDeltaker) => {
		const deltakerliste = deltaker.deltakerliste.navn
		const entry = deltakerlisteMap.get(deltakerliste)

		deltakerlisteMap.set(deltakerliste, entry ? entry + 1 : 1)
	})

	return deltakerlisteMap
}
