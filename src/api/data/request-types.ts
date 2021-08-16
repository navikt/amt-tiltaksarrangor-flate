import { TiltakStatus, TiltakType } from './bruker';

export interface BrukerSokParams {
    filter: {
        navnFnrSok: string | undefined,
        tiltakTyper: TiltakType[],
        tiltakStatuser: TiltakStatus[]
    }
}

export interface OppdaterTiltakStartdatoRequestBody {
    startdato: string;
}
export interface OppdaterTiltakSluttdatoRequestBody {
    sluttdato: string;
}