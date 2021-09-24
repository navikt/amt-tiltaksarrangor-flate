import { TiltakInstansStatus } from '../../api/data/tiltak';
import { randBetween, randomUuid } from '../utils/faker';
import * as faker from 'faker';
import { MockTiltakInstans } from './index';

interface TiltakInstansInfo {
	tiltakInstansNavn: string;
	tiltaktype: string;
	tiltaknavn: string;
}

const tiltakInstansInfoListe: TiltakInstansInfo[] = [
	{
		tiltakInstansNavn: 'Jobbklubb',
		tiltaktype: 'JOBBK',
		tiltaknavn: 'Jobbklubb'
	},
	{
		tiltakInstansNavn: 'Sveisekurs',
		tiltaktype: 'GRUPPEAMO',
		tiltaknavn: 'Gruppe AMO'
	}
];

export const lagTiltakinstanser = (): MockTiltakInstans[] => {
	const tiltakinstanser: MockTiltakInstans[] = [];

	tiltakInstansInfoListe.forEach(tiltak => {
		const antallInstanser = randBetween(1, 4);

		for (let i = 0; i < antallInstanser; i++) {
			tiltakinstanser.push(lagTiltakinstanse(tiltak));
		}
	});

	return tiltakinstanser;
};

const lagTiltakinstanse = (tiltakInstansInfo: TiltakInstansInfo): MockTiltakInstans => {
	const deltagerAntall = randBetween(1, 15);
	const deltagerKapasitet = deltagerAntall + randBetween(0, 10);
	const status = faker.random.objectElement(TiltakInstansStatus) as TiltakInstansStatus;

	// TODO utled start/slutt fra status NOSONAR

	return {
		id: randomUuid(),
		deltagerAntall,
		deltagerKapasitet,
		navn: tiltakInstansInfo.tiltakInstansNavn,
		status: status,
		tiltak: {
			tiltaksnavn: tiltakInstansInfo.tiltaknavn,
			tiltakstype: tiltakInstansInfo.tiltaktype
		},
		startdato: faker.date.past().toISOString(),
		sluttdato: faker.date.future().toISOString()
	};
};
