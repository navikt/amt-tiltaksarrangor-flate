import { TiltakStatus, TiltakType } from '../api/data/bruker';

export const mapTiltakStatusTilTekst = (tiltakStatus: TiltakStatus): string => {
	switch (tiltakStatus) {
		case TiltakStatus.GJENNOMFORES:
			return 'Gjennomføres';
		case TiltakStatus.NY_BRUKER:
			return 'Ny Bruker';
		case TiltakStatus.PAMELDT:
			return 'Påmeldt';
		default:
			return tiltakStatus;
	}
};

export const mapTiltakTypeTilTekst = (tiltakType: TiltakType): string => {
	switch (tiltakType) {
		case TiltakType.AVKLARING:
			return 'Avklaring';
		case TiltakType.GRUPPE_AMO:
			return 'Gruppe AMO';
		case TiltakType.JOBBSOKERKURS:
			return 'Jobbsokerkurs';
		case TiltakType.OPPFOLGING:
			return 'Oppfølging';
		default:
			return tiltakType;
	}
};
