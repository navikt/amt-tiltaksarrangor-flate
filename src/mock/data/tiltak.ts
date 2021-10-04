import * as faker from 'faker'

import { TiltakInstansStatus } from '../../domeneobjekter/tiltak'
import { randBetween, randomUuid } from '../utils/faker'

export interface MockTiltakInstans {
	id: string,
	virksomhetId: string;
	navn: string,
	startdato: string,
	sluttdato: string,
	status: string,
	deltagerAntall: number,
	deltagerKapasitet: number,
	tiltak: {
		tiltakstype: string,
		tiltaksnavn: string
	}
}

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
]

export const lagTiltakinstanser = (virksomhetId: string): MockTiltakInstans[] => {
	const tiltakinstanser: MockTiltakInstans[] = []

	tiltakInstansInfoListe.forEach(tiltak => {
		const antallInstanser = randBetween(1, 4)

		for (let i = 0; i < antallInstanser; i++) {
			tiltakinstanser.push(lagTiltakinstanse(virksomhetId, tiltak))
		}
	})

	return tiltakinstanser
}

const lagTiltakinstanse = (virksomhetId: string, tiltakInstansInfo: TiltakInstansInfo): MockTiltakInstans => {
	const deltagerAntall = randBetween(1, 15)
	const deltagerKapasitet = deltagerAntall + randBetween(0, 10)
	const status = faker.random.objectElement(TiltakInstansStatus) as TiltakInstansStatus

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
		sluttdato: faker.date.future().toISOString(),
		virksomhetId: virksomhetId
	}
}
