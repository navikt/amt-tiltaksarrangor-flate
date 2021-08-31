import { Bruker, TiltakStatus, TiltakType } from '../api/data/bruker';

const matcherNavn = (bruker: {fornavn: string, etternavn: string}, navnFilter: string | undefined) => {
    if(!navnFilter || navnFilter.trim().length === 0) return true;

    const matcherFornavn = bruker.fornavn.toLowerCase().includes(navnFilter.toLowerCase());
    const matcherEtternavn = bruker.etternavn.toLowerCase().includes(navnFilter.toLowerCase());

    return matcherFornavn || matcherEtternavn;
}

const matcherStatus = (statusFilter: TiltakStatus[], brukerStatus: TiltakStatus) => {
    if (statusFilter.length === 0) return true;
    return statusFilter.includes(brukerStatus)
}

const matcherType = (typeFilter: TiltakType[], brukerTiltakType: TiltakType) => {
    if (typeFilter.length === 0) return true;
    return typeFilter.includes(brukerTiltakType);
}

export const filtrerBrukere = (brukere: Bruker[], typeFilter: TiltakType[], statusFilter: TiltakStatus[], navnFilter: string): Bruker[] => {
   return brukere
        .filter(bruker => matcherNavn(bruker, navnFilter))
        .filter(bruker => matcherType(typeFilter, bruker.tiltak.type))
        .filter(bruker => matcherStatus(statusFilter, bruker.tiltak.status))
};