import { TiltakInstansDTO } from './tiltak'

export interface TiltakDeltagerDTO {
	id: string,
	fornavn: string,
	mellomnavn: string | null,
	etternavn: string,
	fodselsnummer: string,
	oppstartdato: string | null,
	sluttdato: string | null,
	status: string
}

export interface TiltakDeltagerDetaljerDTO {
	id: string,
	fornavn: string,
	mellomnavn: string | null,
	etternavn: string,
	fodselsnummer: string,
	telefon: string | null,
	epost: string | null,
	navKontor: NavKontorDTO,
	navVeileder: NavVeilederDTO | null,
	oppstartdato: string | null,
	sluttdato: string | null,
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
