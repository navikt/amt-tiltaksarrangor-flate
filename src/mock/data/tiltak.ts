import * as faker from 'faker'

import { TiltakInstansDTO } from '../../api/data/tiltak'
import { TiltakInstansStatus } from '../../domeneobjekter/tiltak'
import { randBetween, randomUuid } from '../utils/faker'

export type MockTiltakInstans = TiltakInstansDTO & { virksomhetId: string }

interface TiltakInstansInfo {
	tiltakInstansNavn: string;
	tiltakskode: string;
	tiltaksnavn: string;
}

const tiltakInstansInfoListe: TiltakInstansInfo[] = [
	{
		tiltakInstansNavn: 'Oppfølging Åsedalen',
		tiltakskode: 'INDOPPF',
		tiltaksnavn: 'Oppfølging'
	},
	{
		tiltakInstansNavn: 'Oppfølging Region Østvest',
		tiltakskode: 'INDOPPF',
		tiltaksnavn: 'Oppfølging'
	},
]

export const lagTiltakinstanser = (virksomhetId: string): MockTiltakInstans[] => {
	const tiltakinstanser: MockTiltakInstans[] = []

	tiltakInstansInfoListe.forEach(tiltak => {
		const antallInstanser = randBetween(1, 1)

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
			tiltaksnavn: tiltakInstansInfo.tiltaksnavn,
			tiltakskode: tiltakInstansInfo.tiltakskode
		},
		oppstartdato: faker.date.past().toISOString(),
		sluttdato: faker.date.future().toISOString(),
		virksomhetId: virksomhetId
	}
}
