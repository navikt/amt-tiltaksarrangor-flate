
export interface Tiltak {
	id: string;
	type: string;       // JOBBKLUBB
	typeNavn: string;   // Jobbklubb
	navn: string;       // Sveisekurs
	// enum for individuell/gruppe?
	tiltakinstanser: Tiltakinstans[];
}

export interface Tiltakinstans {
	id: string;
	startdato: string;
	sluttdato: string;
	deltakere: number;
}
