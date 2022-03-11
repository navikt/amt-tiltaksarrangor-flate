
export interface GjennomforingDTO {
	id: string,
	navn: string,
	startDato: string | null,
	sluttDato: string | null,
	status: string,
	tiltak: TiltakDTO,
	arrangor: ArrangorDTO
}

export interface TiltakDTO {
	tiltakskode: string,
	tiltaksnavn: string,
}

export interface ArrangorDTO {
	virksomhetNavn: string,
	organisasjonNavn: string | null
}

