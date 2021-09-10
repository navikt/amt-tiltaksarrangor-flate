
export interface Tiltak {
	type: string;       // JOBBKLUBB
	typeNavn: string;   // Jobbklubb
	navn: string;       // Sveisekurs
	// enum for individuell/gruppe?
	tiltakinstanser: Tiltakinstans[];
}

export interface Tiltakinstans {
	id: string;
	startDato: string;
	sluttDato: string;
	deltakere: number;
}