import { AxiosPromise } from 'axios';

import {
	TiltakDeltagerDetaljerDto,
	TiltakDeltagerDto
} from './data/deltager';
import { axiosInstance } from './utils';
import { TiltakInstansDto } from './data/tiltak';
import { InnloggetAnsatt } from './data/ansatt';

export const fetchInnloggetAnsatt = (): AxiosPromise<InnloggetAnsatt> => {
	return axiosInstance.get('/amt-tiltak/api/tiltaksleverandor/ansatt/meg');
};

export const fetchTiltakInstanser = (tiltaksleverandorId: string): AxiosPromise<TiltakInstansDto[]> => {
	return axiosInstance.get(`/amt-tiltak/api/tiltak?tiltaksleverandorId=${tiltaksleverandorId}`);
};

export const fetchTiltakinstans = (tiltakinstansId: string): AxiosPromise<TiltakInstansDto> => {
	return axiosInstance.get(`/amt-tiltak/api/tiltak-instans/${tiltakinstansId}`);
};

export const fetchDeltakerePaTiltakinstans = (tiltakinstansId: string): AxiosPromise<TiltakDeltagerDto[]> => {
	return axiosInstance.get(`/amt-tiltak/api/tiltak-instans/${tiltakinstansId}/deltagere`);
};

export const fetchTiltakDeltagerDetaljer = (tiltakDeltagerId: string): AxiosPromise<TiltakDeltagerDetaljerDto> => {
	return axiosInstance.get(`/amt-tiltak/api/tiltak-deltager/${tiltakDeltagerId}`);
};


