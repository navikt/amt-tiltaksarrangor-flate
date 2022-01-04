import { TiltakDTO } from '../api/data/tiltak'
import { Gjennomforing } from '../domeneobjekter/tiltak'

export const finnUnikeTiltak = (gjennomforinger: Gjennomforing[]): TiltakDTO[] => {
	const unikeTiltak: TiltakDTO[] = []

	gjennomforinger.forEach(gjennomforing => {
		const tiltak = unikeTiltak.find(t => t.tiltakskode === gjennomforing.tiltak.tiltakskode)

		if (!tiltak) {
			unikeTiltak.push(gjennomforing.tiltak)
		}
	})

	return unikeTiltak
}

export const finnTiltakGjennomforinger = (tiltakskode: string, gjennomforinger: Gjennomforing[]): Gjennomforing[] => {
	return gjennomforinger.filter(gjennomforing => gjennomforing.tiltak.tiltakskode === tiltakskode)
}