import { AxiosPromise } from 'axios';
import { Bruker, DetaljertBruker, TiltakStatus, TiltakType } from './data/bruker';
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

export const fetchBrukerDetaljer = (brukerId: string): AxiosPromise<DetaljertBruker> => {
	return axiosInstance.get(`/amt-tiltak/api/bruker/${brukerId}`);
};

export const oppdaterTiltakStartdato = (brukerId: string, startdato: Date): AxiosPromise<DetaljertBruker> => {
	return axiosInstance.get(`/amt-tiltak/api/bruker/${brukerId}`);
};
