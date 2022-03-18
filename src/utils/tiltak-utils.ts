import { GjennomforingDto, TiltakDto } from '../api/data/tiltak'

export const finnUnikeTiltak = (gjennomforinger: GjennomforingDto[]): TiltakDto[] => {
	const unikeTiltak: TiltakDto[] = []

	gjennomforinger.forEach(gjennomforing => {
		const tiltak = unikeTiltak.find(t => t.tiltakskode === gjennomforing.tiltak.tiltakskode)

		if (!tiltak) {
			unikeTiltak.push(gjennomforing.tiltak)
		}
	})

	return unikeTiltak
}

export const finnTiltakGjennomforinger = (tiltakskode: string, gjennomforinger: GjennomforingDto[]): GjennomforingDto[] => {
	return gjennomforinger.filter(gjennomforing => gjennomforing.tiltak.tiltakskode === tiltakskode)
}