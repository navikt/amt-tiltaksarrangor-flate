
export enum AnsattRolle {
    KOORDINATOR = 'KOORDINATOR',
    VEILEDER = 'VEILEDER'
}

export interface Virksomhet {
    id: string,
    overordnetEnhetOrganisasjonsnummer: string,
    overordnetEnhetNavn: string,
    organisasjonsnummer: string,
    navn: string,
    roller: AnsattRolle []
}

export interface InnloggetAnsatt {
    id: string;
    fornavn: string;
    mellomnavn: string | undefined | null;
    etternavn: string;
    leverandorer: Virksomhet[]
}
