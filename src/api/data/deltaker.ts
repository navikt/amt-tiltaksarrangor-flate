import { GjennomforingDTO } from './tiltak'

export interface TiltakDeltagerDTO {
	id: string,
	fornavn: string,
	mellomnavn: string | null,
	etternavn: string,
	fodselsnummer: string,
	startDato: string | null,
	sluttDato: string | null,
	status: DeltakerStatus,
	registrertDato: string
}

export interface DeltakerStatus {
	type: string
	endretDato: string
}

export type TiltakDeltagerDetaljerDTO = TiltakDeltagerDTO & {
	epost: string | null,
	telefonnummer: string | null,
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
