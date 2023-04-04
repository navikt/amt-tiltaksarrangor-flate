import { Deltakerliste } from '../api/data/deltaker'
import { Veiledertype } from '../api/data/veileder'

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

export const tilVeiledertype = (erMedveileder: boolean) => erMedveileder ? Veiledertype.MEDVEILEDER : Veiledertype.VEILEDER
