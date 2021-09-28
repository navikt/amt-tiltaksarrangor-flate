
export interface TiltakInstansDTO {
	id: string,
	navn: string,
	startdato: string,
	sluttdato: string,
	status: string,
	deltagerAntall: number,
	deltagerKapasitet: number,
	tiltak: TiltakDTO
}

export interface TiltakDTO {
	tiltakskode: string,
	tiltaksnavn: string,
}