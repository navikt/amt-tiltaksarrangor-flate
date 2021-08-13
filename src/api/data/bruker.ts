import { OrNothing } from '../../utils/types/or-nothing';

export interface Bruker {
	id: string; // TODO: Skal vi bruke uuid eller heltall?
	fodselsdato: string;
	fornavn: string; // TODO: Kan hende det holder med kun et felt for navn
	etternavn: string;
	tiltak: Tiltak;
}

export interface DetaljertBruker {
	id: string; // TODO: Skal vi bruke uuid eller heltall?
	fodselsdato: string;
	fornavn: string; // TODO: Kan hende det holder med kun et felt for navn
	etternavn: string;
	tiltak: Tiltak;
	navEnhet: NavEnhet;
	kontaktinfo: Kontaktinfo;
	navVeileder: OrNothing<NavVeileder>;
}

interface Tiltak {
	type: TiltakType;
	status: TiltakStatus;
	navn: string;
	startDato: OrNothing<string>;
	sluttDato: OrNothing<string>;
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
	JOBBSOKERKURS   = 'JOBBSOKERKURS',
	AVKLARING       = 'AVKLARING',
	GRUPPE_AMO      = 'GRUPPE_AMO',
	OPPFOLGING      = 'OPPFOLGING'
}

export enum TiltakStatus {
	NY_BRUKER       = 'NY_BRUKER',
	PAMELDT         = 'PAMELDT',
	GJENNOMFORES    = 'GJENNOMFORES'
}