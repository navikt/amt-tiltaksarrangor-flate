export interface OverordnetEnhetVO {
    navn: string;
    enheter: EnhetVO[]
}

export interface EnhetVO {
    id: string;
    navn: string;
    deltakerlister: DeltakerlisteVO[];
}

export interface DeltakerlisteVO {
    id: string;
    navn: string;
    tiltaksnavn: string;
    startDato: Date | null;
    sluttDato: Date | null;
    lagtTil: boolean;
}
