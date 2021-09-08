import { Bruker, TiltakStatus } from '../api/data/bruker';

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

export const filtrerBrukere = (brukere: Bruker[], statusFilter: TiltakStatus[], navnFilter: string): Bruker[] => {
   return brukere
        .filter(bruker => matcherNavn(bruker, navnFilter))
        .filter(bruker => matcherStatus(statusFilter, bruker.tiltak.status))
};