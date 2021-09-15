import { TiltakStatus, TiltakType } from '../api/data/bruker';
import { EtikettFokus, EtikettInfo, EtikettSuksess } from 'nav-frontend-etiketter';
import React from 'react';

export const mapTiltakTypeTilTekst = (tiltakType: TiltakType): string => {
	switch (tiltakType) {
		case TiltakType.AVKLARING:
			return 'Avklaring';
		case TiltakType.GRUPPE_AMO:
			return 'Gruppe AMO';
		case TiltakType.JOBBSOKERKURS:
			return 'Jobbsøkerkurs';
		case TiltakType.OPPFOLGING:
			return 'Oppfølging';
		default:
			return tiltakType;
	}
};

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

export const mapTiltakStatusTilEtikett = (tiltakStatus: TiltakStatus) => {
	switch (tiltakStatus) {
		case TiltakStatus.GJENNOMFORES:
			return <EtikettSuksess>Gjennomføres</EtikettSuksess>;
		case TiltakStatus.NY_BRUKER:
			return <EtikettInfo>Ny bruker</EtikettInfo>;
		case TiltakStatus.PAMELDT:
			return <EtikettFokus>Påmeldt</EtikettFokus>;
		default:
			return null;
	}
};