import { AxiosPromise } from 'axios';

import { Bruker, DetaljertBruker, Tiltaksinstans } from './data/bruker';
import {
	BrukerSokParams,
	OppdaterTiltakSluttdatoRequestBody,
	OppdaterTiltakStartdatoRequestBody,
} from './data/request-types';
import { axiosInstance } from './utils';

export const checkIsAuthenticated = (): AxiosPromise<{ isAuthenticated: boolean }> => {
	return axiosInstance.get('/auth-proxy/is-authenticated');
};

export const brukerSok = (brukerSokParams: BrukerSokParams): AxiosPromise<Bruker[]> => {
	return axiosInstance.post('/amt-tiltak/api/bruker/sok', brukerSokParams);
};

export const fetchBrukerDetaljer = (brukerId: string): AxiosPromise<DetaljertBruker> => {
	return axiosInstance.get(`/amt-tiltak/api/bruker/${brukerId}`);
};

export const oppdaterTiltakStartdato = (tiltakinstansId: string, startdato: Date): AxiosPromise<Tiltaksinstans> => {
	const body: OppdaterTiltakStartdatoRequestBody = {
		startdato: startdato.toISOString(),
	};
	return axiosInstance.put(`/amt-tiltak/api/tiltak/${tiltakinstansId}/startdato`, body);
};

export const oppdaterTiltakSluttdato = (tiltakinstansId: string, sluttdato: Date): AxiosPromise<Tiltaksinstans> => {
	const body: OppdaterTiltakSluttdatoRequestBody = {
		sluttdato: sluttdato.toISOString(),
	};
	return axiosInstance.put(`/amt-tiltak/api/tiltak/${tiltakinstansId}/sluttdato`, body);
};
