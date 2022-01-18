export enum TiltakGjennomforingStatus {
    IKKE_STARTET = 'IKKE_STARTET',
    GJENNOMFORES = 'GJENNOMFORES',
    AVSLUTTET = 'AVSLUTTET',
}

export interface Gjennomforing {
    id: string,
    navn: string,
    startDato: Date | undefined,
    sluttDato: Date | undefined,
    status: TiltakGjennomforingStatus | undefined,
    tiltak: Tiltak
}

export interface Tiltak {
    tiltakskode: string,
    tiltaksnavn: string,
}