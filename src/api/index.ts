import { AxiosPromise } from 'axios';
import { Bruker, TiltakStatus, TiltakType } from './data/bruker';
import { axiosInstance } from './utils';

export interface BrukerSokParams {
	filter: {
		navnFnrSok: string | undefined,
		tiltakTyper: TiltakType[],
		tiltakStatuser: TiltakStatus[]
	}
}

export const brukerSok = (brukerSokParams: BrukerSokParams): AxiosPromise<Bruker[]> => {
	return axiosInstance.post('/amt-tiltak/api/bruker/sok', brukerSokParams);
};
