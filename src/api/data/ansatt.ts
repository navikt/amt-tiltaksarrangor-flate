
export enum AnsattRolle {
	KOORDINATOR = 'KOORDINATOR',
	VEILEDER = 'VEILEDER'
}

export interface Virksomhet {
	id: string,
	virksomhetsnummer: string,
	virksomhetsnavn: string,
	roller: AnsattRolle[]
}

export interface InnloggetAnsatt {
	id: string;
	fornavn: string;
	mellomnavn: string | undefined | null;
	etternavn: string;
	virksomheter: Virksomhet[]
}
