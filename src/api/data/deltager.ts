import { TiltakInstansDTO } from './tiltak'

export interface TiltakDeltagerDTO {
	id: string,
	fornavn: string,
	mellomnavn: string | null,
	etternavn: string,
	fodselsnummer: string,
	oppstartdato: string | null,
	sluttdato: string | null,
	status: string,
	registrertDato: string
}

export type TiltakDeltagerDetaljerDTO = TiltakDeltagerDTO & {
	epost: string | null,
	telefon: string | null,
	navKontor: NavKontorDTO,
	navVeileder: NavVeilederDTO | null,
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
