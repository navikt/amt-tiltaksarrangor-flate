
export interface VirksomhetDTO {
	id: string,
	overordnetEnhetOrganisasjonsnummer: string,
	overordnetEnhetNavn: string,
	organisasjonsnummer: string,
	navn: string,
	roller: string []
}

export interface InnloggetAnsattDTO {
	id: string,
	fornavn: string,
	mellomnavn: string | undefined | null,
	etternavn: string,
	arrangorer: VirksomhetDTO[]
}
