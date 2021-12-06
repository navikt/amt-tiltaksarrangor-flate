
export interface TiltakInstansDTO {
	id: string,
	navn: string,
	oppstartdato: string,
	sluttdato: string,
	status: string,
	tiltak: TiltakDTO
}

export interface TiltakDTO {
	tiltakskode: string,
	tiltaksnavn: string,
}