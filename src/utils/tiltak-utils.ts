import { TiltakDTO } from '../api/data/tiltak';
import { TiltakInstans } from '../domeneobjekter/tiltak';

export const finnUnikeTiltak = (tiltakInstanser: TiltakInstans[]): TiltakDTO[] => {
	const unikeTiltak: TiltakDTO[] = [];

	tiltakInstanser.forEach(instans => {
		const tiltak = unikeTiltak.find(t => t.tiltakskode === instans.tiltak.tiltakskode)

		if (!tiltak) {
			unikeTiltak.push(instans.tiltak)
		}
	});

	return unikeTiltak;
};

export const finnTiltakInstanser = (tiltakskode: string, tiltakInstanser: TiltakInstans[]): TiltakInstans[] => {
	return tiltakInstanser.filter(instans => instans.tiltak.tiltakskode === tiltakskode);
};