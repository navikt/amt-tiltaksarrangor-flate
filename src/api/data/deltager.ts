import { TiltakInstansDTO } from './tiltak';

export interface TiltakDeltagerDTO {
	id: string,
	fornavn: string,
	mellomnavn: string | undefined,
	etternavn: string,
	fodselsnummer: string | undefined,
	startdato: string,
	sluttdato: string,
	status: string
}

export interface TiltakDeltagerDetaljerDTO {
	id: string,
	fornavn: string,
	mellomnavn: string | undefined,
	etternavn: string,
	fodselsnummer: string | undefined,
	telefon: string | undefined,
	epost: string | undefined,
	navKontor: NavKontorDTO,
	navVeileder: NavVeilederDTO,
	startdato: string,
	sluttdato: string,
	status: string,
	tiltakInstans: TiltakInstansDTO
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
