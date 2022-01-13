
export interface GjennomforingDTO {
	id: string,
	navn: string,
	startDato: string | null,
	sluttDato: string | null,
	status: string,
	tiltak: TiltakDTO
}

export interface TiltakDTO {
	tiltakskode: string,
	tiltaksnavn: string,
}