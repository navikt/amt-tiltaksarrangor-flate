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
    startDato: Date | undefined,
    sluttDato: Date | undefined,
    status: TiltakDeltakerStatus,
    registrertDato: Date
}

export type TiltakDeltakerDetaljer = TiltakDeltaker & {
    telefon: string | null,
    epost: string | null,
    navKontor: NavKontor | null,
    navVeileder: NavVeileder | null,
    gjennomforing: Gjennomforing
}

export interface NavKontor {
    navn: string,
}

export interface NavVeileder {
    navn: string,
    telefon: string,
    epost: string,
}
