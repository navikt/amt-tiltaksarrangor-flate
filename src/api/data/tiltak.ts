
export enum TiltakInstansStatus {
	IKKE_STARTET= 'IKKE_STARTET',
	GJENNOMFORES= 'GJENNOMFORES',
	AVSLUTTET= 'AVSLUTTET',
}

export interface TiltakInstansDto {
	id: string,
	navn: string,
	startdato: string,
	sluttdato: string,
	status: TiltakInstansStatus,
	deltagerAntall: number,
	deltagerKapasitet: number,
	tiltak: TiltakDto
}

export interface TiltakDto {
	tiltakskode: string,
	tiltaksnavn: string,
}