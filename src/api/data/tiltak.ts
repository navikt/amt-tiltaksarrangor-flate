
export interface TiltakInstansDTO {
	id: string,
	navn: string,
	oppstartdato: string,
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