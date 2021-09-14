import { OrNothing } from '../../utils/types/or-nothing';

export interface Deltaker {
	id: string;
	fodselsdato: string;
	fornavn: string;
	etternavn: string;
	stardato: string | undefined;
	sluttdato: string | undefined;
	tiltak: DeprecatedTiltaksinstans;
}

export interface DetaljertBruker {
	id: string;
	fodselsdato: string;
	fornavn: string;
	etternavn: string;
	tiltak: DeprecatedTiltaksinstans;

	navEnhet: NavEnhet;
	kontaktinfo: Kontaktinfo;
	navVeileder: OrNothing<NavVeileder>;
}

export interface DeprecatedTiltaksinstans {
	id: string;
	type: TiltakType;
	status: TiltakStatus;
	navn: string;
	startdato: OrNothing<string>;
	sluttdato: OrNothing<string>;
}

export interface NavEnhet {
	enhetId: string;
	enhetNavn: string;
}

interface Kontaktinfo {
	email: OrNothing<string>;
	telefonnummer: OrNothing<string>;
}

interface NavVeileder {
	navn: string;
	email: OrNothing<string>;
	telefonnummer: OrNothing<string>;
}

export enum TiltakType {
	JOBBSOKERKURS = 'JOBBSOKERKURS',
	AVKLARING = 'AVKLARING',
	GRUPPE_AMO = 'GRUPPE_AMO',
	OPPFOLGING = 'OPPFOLGING',
}

export enum TiltakStatus {
	NY_BRUKER = 'NY_BRUKER',
	PAMELDT = 'PAMELDT',
	GJENNOMFORES = 'GJENNOMFORES',
}
