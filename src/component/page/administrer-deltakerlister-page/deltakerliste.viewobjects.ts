export interface ArrangorOverenhet {
    navn: string;
    arrangorer: Arrangor[]
}

export interface Arrangor {
    id: string;
    navn: string;
    deltakerlister: Deltakerliste[];
}

export interface Deltakerliste {
    id: string;
    navn: string;
    tiltaksnavn: string;
    startDato: Date | null;
    sluttDato: Date | null;
}

export interface Deltakerliste2 { //TODO flat ut listen og bruke reduce for å lage et map
    id: string;
    navn: string;
    tiltaksnavn: string;
    startDato: Date | null;
    sluttDato: Date | null;
    arrangorOverenhetNavn: string;
    arrangorId: string;
    arrangorNavn: string;
}

