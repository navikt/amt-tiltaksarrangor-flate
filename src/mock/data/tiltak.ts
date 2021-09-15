import { Tiltak, Tiltakinstans } from '../../api/data/tiltak';
import { randBetween } from '../utils/faker';
import * as faker from 'faker';

interface BaseTiltak {
	navn: string;
	type: string;
	typeNavn: string;
}

const baseTiltakList: BaseTiltak[] = [
	{
		navn: 'Jobbklubb',
		type: 'JOBBK',
		typeNavn: 'Jobbklubb'
	},
	{
		navn: 'Sveisekurs',
		type: 'GRUPPEAMO',
		typeNavn: 'Gruppe AMO'
	}
];

const lagTiltak = (): Tiltak[] => {
	const tiltak: Tiltak[] = [];

	baseTiltakList.forEach(baseTiltak => {
		const antallInstanser = randBetween(1, 3);

		tiltak.push({
			id: randBetween(1000, 1000000).toString(),
			...baseTiltak,
			tiltakinstanser: lagTiltakinstanser(antallInstanser),
		});
	});

	return tiltak;
};

const lagTiltakinstanser = (antallInstanser: number): Tiltakinstans[] => {
	const tiltakinstanser: Tiltakinstans[] = [];

	for (let i = 0; i < antallInstanser; i++) {
		tiltakinstanser.push(lagTiltakinstanse());
	}

	return tiltakinstanser;
};

const lagTiltakinstanse = (): Tiltakinstans => {
	const deltakerAntall = randBetween(0, 20);
	const deltakerKapasitet = deltakerAntall + randBetween(0, 10);

	return {
		id: randBetween(1000, 1000000).toString(),
		deltakerAntall,
		deltakerKapasitet,
		startdato: faker.date.past().toISOString(),
		sluttdato: faker.date.future().toISOString()
	};
};

export const mockTiltak = lagTiltak();
