import { TiltakDto, TiltakInstansDto } from '../api/data/tiltak';

export const finnUnikeTiltak = (tiltakInstanser: TiltakInstansDto[]): TiltakDto[] => {
	const unikeTiltak: TiltakDto[] = [];

	tiltakInstanser.forEach(instans => {
		const tiltak = unikeTiltak.find(t => t.tiltakskode === instans.tiltak.tiltakskode)

		if (!tiltak) {
			unikeTiltak.push(instans.tiltak)
		}
	});

	return unikeTiltak;
};

export const finnTiltakInstanser = (tiltakskode: string, tiltakInstanser: TiltakInstansDto[]): TiltakInstansDto[] => {
	return tiltakInstanser.filter(instans => instans.tiltak.tiltakskode === tiltakskode);
};