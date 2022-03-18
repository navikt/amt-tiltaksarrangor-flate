import * as faker from 'faker'

import { GjennomforingDto, TiltakGjennomforingStatus } from '../../api/data/tiltak'
import { randomUuid } from '../utils/faker'

export type MockGjennomforing = GjennomforingDto & { virksomhetId: string }

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

export const lagTiltakGjennomforinger = (): GjennomforingDto[] => {
	const gjennomforinger: GjennomforingDto[] = []

	GjennomforingInfoListe
		.forEach(t => gjennomforinger.push(lagGjennomforing(t)))

	return gjennomforinger
}

const lagGjennomforing = (gjennomforingInfo: GjennomforingInfo): GjennomforingDto => {
	return {
		id: randomUuid(),
		navn: gjennomforingInfo.gjennomforingNavn,
		status: gjennomforingInfo.status,
		tiltak: {
			tiltaksnavn: gjennomforingInfo.tiltaksnavn,
			tiltakskode: gjennomforingInfo.tiltakskode
		},
		startDato: faker.date.past(),
		sluttDato: faker.date.future(),
		arrangor: {
			virksomhetNavn: faker.company.companyName(),
			organisasjonNavn: faker.company.companyName()
		}
	}
}
