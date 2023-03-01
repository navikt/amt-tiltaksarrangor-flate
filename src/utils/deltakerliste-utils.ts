import { Deltakerliste } from '../api/data/deltaker'

export const finnUnikeDeltakerlister = (detakerlister: Deltakerliste[]): Deltakerliste[] => {
	const unikeDeltakerlister: Deltakerliste[] = []

	detakerlister.forEach(deltakerliste => {
		const deltakerliste1 = unikeDeltakerlister.find(t => t.type === deltakerliste.type)

		if (!deltakerliste1) {
			unikeDeltakerlister.push(deltakerliste)
		}
	})

	return unikeDeltakerlister
}

export const finnDeltakerlister = (type: string, deltakerlister: Deltakerliste[]): Deltakerliste[] => {
	return deltakerlister.filter(deltakerliste => deltakerliste.type === type)
}