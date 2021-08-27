import { AxiosPromise } from 'axios';

import { Bruker, DetaljertBruker, Tiltaksinstans } from './data/bruker';
import {
	OppdaterTiltakSluttdatoRequestBody,
	OppdaterTiltakStartdatoRequestBody,
} from './data/request-types';
import { axiosInstance } from './utils';

export const fetchTiltakoversikt = (): AxiosPromise<Bruker[]> => {
	return axiosInstance.get('/amt-tiltak/api/bruker/sok');
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
