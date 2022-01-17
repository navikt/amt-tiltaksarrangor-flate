import { GjennomforingDTO } from './tiltak'

export interface TiltakDeltagerDTO {
	id: string,
	fornavn: string,
	mellomnavn: string | null,
	etternavn: string,
	fodselsnummer: string,
	startDato: string | null,
	sluttDato: string | null,
	status: string,
	registrertDato: string
}

export type TiltakDeltagerDetaljerDTO = TiltakDeltagerDTO & {
	epost: string | null,
	telefon: string | null,
	navKontor: NavKontorDTO | null,
	navVeileder: NavVeilederDTO | null,
	gjennomforing: GjennomforingDTO
}

export interface NavKontorDTO {
	navn: string,
}

export interface NavVeilederDTO {
	navn: string,
	telefon: string,
	epost: string,
}
