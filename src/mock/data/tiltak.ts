import * as faker from 'faker'

import { GjennomforingDTO } from '../../api/data/tiltak'
import { TiltakGjennomforingStatus } from '../../domeneobjekter/tiltak'
import { randomUuid } from '../utils/faker'

export type MockGjennomforing = GjennomforingDTO & { virksomhetId: string }

interface GjennomforingInfo {
	gjennomforingNavn: string;
	tiltakskode: string;
	tiltaksnavn: string;
	status: TiltakGjennomforingStatus
}

const GjennomforingInfoListe: GjennomforingInfo[] = [
	{
		gjennomforingNavn: 'Oppfølging Åsedalen',
		tiltakskode: 'OPPFOLG',
		tiltaksnavn: 'Oppfølging',
		status: TiltakGjennomforingStatus.GJENNOMFORES
	},
	{
		gjennomforingNavn: 'Oppfølging Region Østvest',
		tiltakskode: 'OPPFOLG',
		tiltaksnavn: 'Oppfølging',
		status: TiltakGjennomforingStatus.GJENNOMFORES
	},
	{
		gjennomforingNavn: 'Oppfølging Region Nordsør',
		tiltakskode: 'OPPFOLG',
		tiltaksnavn: 'Oppfølging',
		status: TiltakGjennomforingStatus.IKKE_STARTET
	},
	{
		gjennomforingNavn: 'Oppfølging Region Test',
		tiltakskode: 'OPPFOLG',
		tiltaksnavn: 'Oppfølging',
		status: TiltakGjennomforingStatus.GJENNOMFORES
	},
	{
		gjennomforingNavn: 'Oppfølging Region Vestøst',
		tiltakskode: 'OPPFOLG',
		tiltaksnavn: 'Oppfølging',
		status: TiltakGjennomforingStatus.AVSLUTTET
	},
]

export const lagTiltakGjennomforinger = (): GjennomforingDTO[] => {
	const gjennomforinger: GjennomforingDTO[] = []

	GjennomforingInfoListe
		.forEach(t => gjennomforinger.push(lagGjennomforing(t)))

	return gjennomforinger
}

const lagGjennomforing = (gjennomforingInfo: GjennomforingInfo): GjennomforingDTO => {
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
		arrangor: {
			virksomhetNavn: faker.company.companyName(),
			organisasjonNavn: faker.company.companyName()
		}
	}
}
