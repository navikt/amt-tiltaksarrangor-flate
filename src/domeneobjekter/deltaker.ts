import { Gjennomforing } from './tiltak'

export enum TiltakDeltakerStatus {
    VENTER_PA_OPPSTART = 'VENTER_PA_OPPSTART',
    GJENNOMFORES = 'GJENNOMFORES',
    HAR_SLUTTET = 'HAR_SLUTTET',
    IKKE_AKTUELL = 'IKKE_AKTUELL'
}

export interface TiltakDeltaker {
    id: string,
    fornavn: string,
    mellomnavn: string | undefined,
    etternavn: string,
    fodselsnummer: string,
    oppstartdato: Date | undefined,
    sluttdato: Date | undefined,
    status: TiltakDeltakerStatus,
    registrertDato: Date
}

export type TiltakDeltakerDetaljer = TiltakDeltaker & {
    telefon: string | null,
    epost: string | null,
    navKontor: NavKontor,
    navVeileder: NavVeileder | null,
    gjennomforing: Gjennomforing
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
