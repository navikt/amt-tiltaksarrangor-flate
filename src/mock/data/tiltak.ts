import * as faker from 'faker'

import { GjennomforingDTO } from '../../api/data/tiltak'
import { TiltakGjennomforingStatus } from '../../domeneobjekter/tiltak'
import { randomUuid } from '../utils/faker'

export type MockGjennomforing = GjennomforingDTO & { virksomhetId: string }

interface GjennomforingInfo {
	gjennomforingNavn: string;
	tiltakskode: string;
	tiltaksnavn: string;
	virksomhetId: string;
	status: TiltakGjennomforingStatus
}

const GjennomforingInfoListe: GjennomforingInfo[] = [
	{
		gjennomforingNavn: 'Oppfølging Åsedalen',
		tiltakskode: 'OPPFOLG',
		tiltaksnavn: 'Oppfølging',
		virksomhetId: '4b26083d-c320-49e1-9104-b4dcdbcc8067',
		status: TiltakGjennomforingStatus.GJENNOMFORES
	},
	{
		gjennomforingNavn: 'Oppfølging Region Østvest',
		tiltakskode: 'OPPFOLG',
		tiltaksnavn: 'Oppfølging',
		virksomhetId: '4b26083d-c320-49e1-9104-b4dcdbcc8067',
		status: TiltakGjennomforingStatus.GJENNOMFORES
	},
	{
		gjennomforingNavn: 'Oppfølging Region Nordsør',
		tiltakskode: 'OPPFOLG',
		tiltaksnavn: 'Oppfølging',
		virksomhetId: '4b26083d-c320-49e1-9104-b4dcdbcc8067',
		status: TiltakGjennomforingStatus.IKKE_STARTET
	},
	{
		gjennomforingNavn: 'Oppfølging Region Test',
		tiltakskode: 'OPPFOLG',
		tiltaksnavn: 'Oppfølging',
		virksomhetId: '7ee8b861-6dc7-4cc2-9706-252c82b63104',
		status: TiltakGjennomforingStatus.GJENNOMFORES
	},
	{
		gjennomforingNavn: 'Oppfølging Region Vestøst',
		tiltakskode: 'OPPFOLG',
		tiltaksnavn: 'Oppfølging',
		virksomhetId: '7ee8b861-6dc7-4cc2-9706-252c82b63104',
		status: TiltakGjennomforingStatus.AVSLUTTET
	},
]

export const lagTiltakGjennomforinger = (virksomhetId: string): MockGjennomforing[] => {
	const gjennomforinger: MockGjennomforing[] = []

	GjennomforingInfoListe
		.filter(t => t.virksomhetId === virksomhetId)
		.forEach(t => gjennomforinger.push(lagGjennomforing(t)))

	return gjennomforinger
}

const lagGjennomforing = (gjennomforingInfo: GjennomforingInfo): MockGjennomforing => {
	return {
		id: randomUuid(),
		navn: gjennomforingInfo.gjennomforingNavn,
		status: gjennomforingInfo.status,
		tiltak: {
			tiltaksnavn: gjennomforingInfo.tiltaksnavn,
			tiltakskode: gjennomforingInfo.tiltakskode
		},
		startDato: faker.date.past().toISOString(),
		sluttDato: faker.date.future().toISOString(),
		virksomhetId: gjennomforingInfo.virksomhetId
	}
}
