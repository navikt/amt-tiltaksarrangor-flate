import { Kolonnenavn } from '../../component/page/tiltaksoversikt/bruker-oversikt/types';
import { SorteringType } from '../../utils/sortering-utils';
import { TiltakStatus, TiltakType } from './bruker';

export interface BrukerSokParams {
	filter: {
		navnFnrSok: string | undefined;
		tiltakTyper: TiltakType[];
		tiltakStatuser: TiltakStatus[];
	};
	sortering?: {
		kolonnenavn: Kolonnenavn;
		sorteringType: SorteringType;
	};
}

export interface OppdaterTiltakStartdatoRequestBody {
	startdato: string;
}

export interface OppdaterTiltakSluttdatoRequestBody {
	sluttdato: string;
}
