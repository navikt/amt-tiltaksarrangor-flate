import { TiltakInstansDto } from './tiltak';

export enum TiltakDeltagerStatus {
	NY_BRUKER = 'NY_BRUKER',
	GJENNOMFORES = 'GJENNOMFORES',
	AVBRUTT = 'AVBRUTT',
	FULLFORT = 'FULLFORT'
}

export interface TiltakDeltagerDto {
	id: string,
	fornavn: string,
	mellomnavn: string | undefined,
	etternavn: string,
	fodselsdato: string | undefined,
	startdato: string,
	sluttdato: string,
	status: TiltakDeltagerStatus
}

export interface TiltakDeltagerDetaljerDto {
	id: string,
	fornavn: string,
	mellomnavn: string | undefined,
	etternavn: string,
	fodselsdato: string | undefined,
	telefon: string | undefined,
	epost: string | undefined,
	navKontor: NavKontorDTO,
	navVeileder: NavVeilederDTO,
	startdato: string,
	sluttdato: string,
	status: TiltakDeltagerStatus,
	tiltakInstans: TiltakInstansDto
}

export interface NavKontorDTO {
	navn: string,
	adresse: string
}

export interface NavVeilederDTO {
	navn: string,
	telefon: string,
	epost: string,
}
