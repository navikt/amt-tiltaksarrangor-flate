import { TiltakStatus, TiltakType } from './bruker';
import { SortDirection, TableHeaderName } from '../../component/user-table/header/UserTableHeader';

// TODO: Might be better to use different enums for the DTO than TableHeaderName and SortDirection

export interface BrukerSokParams {
    filter: {
        navnFnrSok: string | undefined,
        tiltakTyper: TiltakType[],
        tiltakStatuser: TiltakStatus[]
    },
    sort?: {
        name: TableHeaderName,
        sortDirection: SortDirection
    }
}

export interface OppdaterTiltakStartdatoRequestBody {
    startdato: string;
}

export interface OppdaterTiltakSluttdatoRequestBody {
    sluttdato: string;
}