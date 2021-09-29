import { AxiosPromise } from 'axios';
import { axiosInstance } from './utils';
import { TiltakInstans } from '../domeneobjekter/tiltak';
import {
	transformInnloggetAnsatt,
	transformTiltakDeltager,
	transformTiltakDeltagerDetaljer,
	transformTiltakInstans,
	transformTiltakInstanser
} from './dtoTransformere';
import { TiltakDeltager, TiltakDeltagerDetaljer } from '../domeneobjekter/deltager';
import { InnloggetAnsatt } from '../domeneobjekter/ansatt';

export const fetchInnloggetAnsatt = (): AxiosPromise<InnloggetAnsatt> => {
	return axiosInstance
		.get('/amt-tiltak/api/tiltaksleverandor/ansatt/meg')
		.then(transformInnloggetAnsatt);
};

export const fetchTiltakinstanser = (tiltaksleverandorId: string): AxiosPromise<TiltakInstans[]> => {
	return axiosInstance
		.get(`/amt-tiltak/api/tiltak?tiltaksleverandorId=${tiltaksleverandorId}`)
		.then(transformTiltakInstanser);
};

export const fetchTiltakinstans = (tiltakinstansId: string): AxiosPromise<TiltakInstans> => {
	return axiosInstance
		.get(`/amt-tiltak/api/tiltak-instans/${tiltakinstansId}`)
		.then(transformTiltakInstans)
};

export const fetchDeltakerePaTiltakinstans = (tiltakinstansId: string): AxiosPromise<TiltakDeltager[]> => {
	return axiosInstance
		.get(`/amt-tiltak/api/tiltak-instans/${tiltakinstansId}/deltagere`)
		.then(transformTiltakDeltager);
};

export const fetchTiltakDeltagerDetaljer = (tiltakDeltagerId: string): AxiosPromise<TiltakDeltagerDetaljer> => {
	return axiosInstance
		.get(`/amt-tiltak/api/tiltak-deltager/${tiltakDeltagerId}`)
		.then(transformTiltakDeltagerDetaljer);
};


