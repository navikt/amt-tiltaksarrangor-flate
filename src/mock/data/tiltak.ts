import * as faker from 'faker'

import { TiltakInstansDTO } from '../../api/data/tiltak'
import { TiltakInstansStatus } from '../../domeneobjekter/tiltak'
import { randBetween, randomUuid } from '../utils/faker'

export type MockTiltakInstans = TiltakInstansDTO & { virksomhetId: string }

interface TiltakInstansInfo {
	tiltakInstansNavn: string;
	tiltakskode: string;
	tiltaksnavn: string;
	virksomhetId: string;
}

const tiltakInstansInfoListe: TiltakInstansInfo[] = [
	{
		tiltakInstansNavn: 'Oppfølging Åsedalen',
		tiltakskode: 'OPPFOLG',
		tiltaksnavn: 'Oppfølging',
		virksomhetId: '4b26083d-c320-49e1-9104-b4dcdbcc8067'
	},
	{
		tiltakInstansNavn: 'Oppfølging Region Østvest',
		tiltakskode: 'OPPFOLG',
		tiltaksnavn: 'Oppfølging',
		virksomhetId: '4b26083d-c320-49e1-9104-b4dcdbcc8067'
	},
	{
		tiltakInstansNavn: 'Oppfølging Region Vestøst',
		tiltakskode: 'OPPFOLG',
		tiltaksnavn: 'Oppfølging',
		virksomhetId: '7ee8b861-6dc7-4cc2-9706-252c82b63104'
	},
]

export const lagTiltakinstanser = (virksomhetId: string): MockTiltakInstans[] => {
	const tiltakinstanser: MockTiltakInstans[] = []

	tiltakInstansInfoListe
		.filter(t => t.virksomhetId === virksomhetId)
		.forEach(t => tiltakinstanser.push(lagTiltakinstanse(t)))

	return tiltakinstanser
}

const lagTiltakinstanse = (tiltakInstansInfo: TiltakInstansInfo): MockTiltakInstans => {
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
		virksomhetId: tiltakInstansInfo.virksomhetId
	}
}
