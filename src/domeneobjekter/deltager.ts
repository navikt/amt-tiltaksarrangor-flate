import { TiltakInstans } from './tiltak'

export enum TiltakDeltagerStatus {
    NY_BRUKER = 'NY_BRUKER',
    GJENNOMFORES = 'GJENNOMFORES',
    AVBRUTT = 'AVBRUTT',
    FULLFORT = 'FULLFORT'
}

export interface TiltakDeltager {
    id: string,
    fornavn: string,
    mellomnavn: string | undefined,
    etternavn: string,
    fodselsnummer: string | undefined,
    oppstartdato: Date | undefined,
    sluttdato: Date | undefined,
    status: TiltakDeltagerStatus
}

export interface TiltakDeltagerDetaljer {
    id: string,
    fornavn: string,
    mellomnavn: string | null,
    etternavn: string,
    fodselsnummer: string | null,
    telefon: string | null,
    epost: string | null,
    navKontor: NavKontor,
    navVeileder: NavVeileder | null,
    oppstartdato: Date | undefined,
    sluttdato: Date | undefined,
    status: TiltakDeltagerStatus,
    tiltakInstans: TiltakInstans
}

export interface NavKontor {
    navn: string,
    adresse: string
}

export interface NavVeileder {
    navn: string,
    telefon: string,
    epost: string,
}
