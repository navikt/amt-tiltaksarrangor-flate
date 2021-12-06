export enum TiltakInstansStatus {
    IKKE_STARTET= 'IKKE_STARTET',
    GJENNOMFORES= 'GJENNOMFORES',
    AVSLUTTET= 'AVSLUTTET',
}

export interface TiltakInstans {
    id: string,
    navn: string,
    oppstartdato: Date,
    sluttdato: Date,
    status: TiltakInstansStatus | undefined,
    tiltak: Tiltak
}

export interface Tiltak {
    tiltakskode: string,
    tiltaksnavn: string,
}