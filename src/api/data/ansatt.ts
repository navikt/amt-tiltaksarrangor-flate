
export interface VirksomhetDTO {
	id: string,
	organisasjonsnummer: string,
	organisasjonsnavn: string,
	virksomhetsnummer: string,
	virksomhetsnavn: string,
	roller: string []
}

export interface InnloggetAnsattDTO {
	id: string,
	fornavn: string,
	mellomnavn: string | undefined | null,
	etternavn: string,
	virksomheter: VirksomhetDTO[]
}
