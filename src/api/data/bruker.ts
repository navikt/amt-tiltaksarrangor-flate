
export interface Bruker {
	id: string; //TODO: Skal vi bruke uuid eller heltall?
	fodselsdato: string;
	fornavn: string;
	etternavn: string;
	tiltakType: TiltakType;
	tiltakStatus: TiltakStatus;
	tiltak: string;
}

export enum TiltakType {
	JOBBSOKERKURS = 'JOBBSOKERKURS',
	AVKLARING = 'AVKLARING',
	GRUPPE_AMO = 'GRUPPE_AMO',
	OPPFOLGING = 'OPPFOLGING'
}

export enum TiltakStatus {
	NY_BRUKER= 'NY_BRUKER',
	PAMELDT= 'PAMELDT',
	GJENNOMFORES= 'GJENNOMFORES'
}