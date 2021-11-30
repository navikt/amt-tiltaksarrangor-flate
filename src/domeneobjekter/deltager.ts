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
    startdato: Date,
    sluttdato: Date,
    status: TiltakDeltagerStatus
}

export interface TiltakDeltagerDetaljer {
    id: string,
    fornavn: string,
    mellomnavn: string | undefined,
    etternavn: string,
    fodselsnummer: string | undefined,
    telefon: string | undefined,
    epost: string | undefined,
    navKontor: NavKontor,
    navVeileder: NavVeileder | undefined,
    startdato: Date,
    sluttdato: Date,
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
