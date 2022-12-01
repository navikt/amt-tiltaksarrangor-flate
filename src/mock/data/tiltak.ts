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
		tiltakskode: 'INDOPPFAG',
		tiltaksnavn: 'Oppfølging',
		status: TiltakGjennomforingStatus.GJENNOMFORES
	},
	{
		gjennomforingNavn: 'Oppfølging Region Østvest',
		tiltakskode: 'INDOPPFAG',
		tiltaksnavn: 'Oppfølging',
		status: TiltakGjennomforingStatus.GJENNOMFORES
	},
	{
		gjennomforingNavn: 'Avklaring Region Test',
		tiltakskode: 'AVKLARAG',
		tiltaksnavn: 'Avklaring',
		status: TiltakGjennomforingStatus.GJENNOMFORES
	},
	{
		gjennomforingNavn: 'AFT Region Vestøst',
		tiltakskode: 'ARBFORB',
		tiltaksnavn: 'Arbeidsforberedende trening (AFT)',
		status: TiltakGjennomforingStatus.GJENNOMFORES
	},
	{
		gjennomforingNavn: 'Oppfølging Region Nordsør',
		tiltakskode: 'INDOPPFAG',
		tiltaksnavn: 'Oppfølging',
		status: TiltakGjennomforingStatus.IKKE_STARTET
	},
	{
		gjennomforingNavn: 'Arbeidsrettet rehabilitering Region Nordsør',
		tiltakskode: 'ARBRRHDAG',
		tiltaksnavn: 'Arbeidsrettet rehabilitering',
		status: TiltakGjennomforingStatus.GJENNOMFORES
	},
	{
		gjennomforingNavn: 'Digitalt oppfølgingstiltak Region Nordsør',
		tiltakskode: 'DIGIOPPARB',
		tiltaksnavn: 'Digitalt oppfølgingstiltak for arbeidsledige',
		status: TiltakGjennomforingStatus.GJENNOMFORES
	},
	{
		gjennomforingNavn: 'Gruppe Fag- og yrkesopplæring Region Nordsør',
		tiltakskode: 'GRUFAGYRKE',
		tiltaksnavn: 'Gruppe Fag- og yrkesopplæring VGS og høyere yrkesfaglig utdanning',
		status: TiltakGjennomforingStatus.GJENNOMFORES
	},
	{
		gjennomforingNavn: 'Varig tilrettelagt arbeid i skjermet virksomhet Region Nordsør',
		tiltakskode: 'VASV',
		tiltaksnavn: 'Varig tilrettelagt arbeid i skjermet virksomhet ',
		status: TiltakGjennomforingStatus.GJENNOMFORES
	},
]

export const tilgjengeligGjennomforinger: GjennomforingInfo[] = [
	{
		gjennomforingNavn: 'Oppfølging Test 1',
		tiltakskode: 'INDOPPFAG',
		tiltaksnavn: 'Oppfølging',
		status: TiltakGjennomforingStatus.GJENNOMFORES
	},
	{
		gjennomforingNavn: 'Oppfølging Test 2',
		tiltakskode: 'INDOPPFAG',
		tiltaksnavn: 'Oppfølging',
		status: TiltakGjennomforingStatus.GJENNOMFORES
	},
	{
		gjennomforingNavn: 'Avklaring Region Test 2',
		tiltakskode: 'AVKLARAG',
		tiltaksnavn: 'Avklaring',
		status: TiltakGjennomforingStatus.GJENNOMFORES
	},
	{
		gjennomforingNavn: 'AFT Region Vestøst 2',
		tiltakskode: 'ARBFORB',
		tiltaksnavn: 'Arbeidsforberedende trening (AFT)',
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
