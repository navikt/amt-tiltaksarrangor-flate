import * as faker from 'faker'

import { Gjennomforing, Koordinator, TiltakGjennomforingStatus } from '../../api/data/tiltak'
import { gjennomforingId } from './id'

export type MockGjennomforing = Gjennomforing

interface GjennomforingInfo {
	gjennomforingNavn: string;
	tiltakskode: string;
	tiltaksnavn: string;
	status: TiltakGjennomforingStatus
}

export const gjennomforingInfoListe: GjennomforingInfo[] = [
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
	{
		gjennomforingNavn: 'Oppfølging Region Nordsør',
		tiltakskode: 'OPPFOLG',
		tiltaksnavn: 'Oppfølging',
		status: TiltakGjennomforingStatus.IKKE_STARTET
	}
]

export const tilgjengeligGjennomforinger: GjennomforingInfo[] = [
	{
		gjennomforingNavn: 'Oppfølging Test 1',
		tiltakskode: 'OPPFOLG',
		tiltaksnavn: 'Oppfølging',
		status: TiltakGjennomforingStatus.GJENNOMFORES
	},
	{
		gjennomforingNavn: 'Oppfølging Test 2',
		tiltakskode: 'OPPFOLG',
		tiltaksnavn: 'Oppfølging',
		status: TiltakGjennomforingStatus.GJENNOMFORES
	},
]

export const lagMockGjennomforinger = (gjennomforingInfoer: GjennomforingInfo[]): MockGjennomforing[] => {
	const gjennomforinger: Gjennomforing[] = []

	gjennomforingInfoer
		.forEach(t => gjennomforinger.push(lagMockGjennomforing(t)))

	return gjennomforinger
}

const lagMockGjennomforing = (gjennomforingInfo: GjennomforingInfo): MockGjennomforing => {
	return {
		id: gjennomforingId(),
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

export const lagMockKoordinatorer = (): Koordinator[] => {
	return [
		{
			fornavn: 'Per',
			mellomnavn: null,
			etternavn: 'Koordinatorsen'
		},
		{
			fornavn: 'Karoline',
			mellomnavn: 'Ann',
			etternavn: 'Koordinatorsdottir'
		}
	]
}
