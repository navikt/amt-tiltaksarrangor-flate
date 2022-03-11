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
    arrangor: Arrangor
}

export interface Tiltak {
    tiltakskode: string,
    tiltaksnavn: string,
}

export interface Arrangor {
    virksomhetNavn: string,
    organisasjonNavn?: string
}