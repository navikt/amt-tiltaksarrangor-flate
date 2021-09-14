import { AxiosPromise } from 'axios';

import { Bruker, DetaljertBruker, DeprecatedTiltaksinstans } from './data/bruker';
import {
	OppdaterTiltakSluttdatoRequestBody,
	OppdaterTiltakStartdatoRequestBody,
} from './data/request-types';
import { axiosInstance } from './utils';
import { Tiltak, Tiltakinstans } from './data/tiltak';
import { InnloggetAnsatt } from './data/ansatt';

export const fetchInnloggetAnsatt = (): AxiosPromise<InnloggetAnsatt> => {
	return axiosInstance.get(`/amt-tiltak/api/tiltaksleverandor/ansatt/me`);
};

export const fetchDeltakerePaTiltakinstans = (tiltakinstansId: string): AxiosPromise<Bruker[]> => {
	return axiosInstance.get(`/amt-tiltak/api/tiltak/instans/${tiltakinstansId}/brukere`);
};

export const fetchTiltakinstans = (tiltakinstansId: string): AxiosPromise<Tiltakinstans> => {
	return axiosInstance.get(`/amt-tiltak/api/tiltak/instans/${tiltakinstansId}`);
};

export const fetchBrukerDetaljer = (brukerId: string): AxiosPromise<DetaljertBruker> => {
	return axiosInstance.get(`/amt-tiltak/api/bruker/${brukerId}`);
};

export const fetchTiltak = (): AxiosPromise<Tiltak[]> => {
	return axiosInstance.get('/amt-tiltak/api/tiltak');
};

export const oppdaterTiltakStartdato = (tiltakinstansId: string, startdato: Date): AxiosPromise<DeprecatedTiltaksinstans> => {
	const body: OppdaterTiltakStartdatoRequestBody = {
		startdato: startdato.toISOString(),
	};
	return axiosInstance.put(`/amt-tiltak/api/tiltak/${tiltakinstansId}/startdato`, body);
};

export const oppdaterTiltakSluttdato = (tiltakinstansId: string, sluttdato: Date): AxiosPromise<DeprecatedTiltaksinstans> => {
	const body: OppdaterTiltakSluttdatoRequestBody = {
		sluttdato: sluttdato.toISOString(),
	};
	return axiosInstance.put(`/amt-tiltak/api/tiltak/${tiltakinstansId}/sluttdato`, body);
};
