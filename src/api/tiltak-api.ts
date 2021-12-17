import { AxiosPromise } from 'axios'

import { InnloggetAnsatt } from '../domeneobjekter/ansatt'
import { TiltakDeltaker, TiltakDeltakerDetaljer } from '../domeneobjekter/deltaker'
import { TiltakInstans } from '../domeneobjekter/tiltak'
import {
	transformInnloggetAnsatt,
	transformTiltakDeltager,
	transformTiltakDeltagerDetaljer,
	transformTiltakInstans,
	transformTiltakInstanser
} from './dtoTransformere'
import { axiosInstance } from './utils'

export const fetchInnloggetAnsatt = (): AxiosPromise<InnloggetAnsatt> => {
	return axiosInstance
		.get('/amt-tiltak/api/arrangor/ansatt/meg')
		.then(transformInnloggetAnsatt)
}

export const fetchTiltakinstanser = (arrangorId: string): AxiosPromise<TiltakInstans[]> => {
	return axiosInstance
		.get(`/amt-tiltak/api/tiltak-instans?arrangorId=${arrangorId}`)
		.then(transformTiltakInstanser)
}

export const fetchTiltakinstans = (tiltakinstansId: string): AxiosPromise<TiltakInstans> => {
	return axiosInstance
		.get(`/amt-tiltak/api/tiltak-instans/${tiltakinstansId}`)
		.then(transformTiltakInstans)
}

export const fetchDeltakerePaTiltakinstans = (tiltakinstansId: string): AxiosPromise<TiltakDeltaker[]> => {
	return axiosInstance
		.get(`/amt-tiltak/api/tiltak-instans/${tiltakinstansId}/deltakere`)
		.then(transformTiltakDeltager)
}

export const fetchTiltakDeltagerDetaljer = (tiltakDeltagerId: string): AxiosPromise<TiltakDeltakerDetaljer> => {
	return axiosInstance
		.get(`/amt-tiltak/api/tiltak-deltaker/${tiltakDeltagerId}`)
		.then(transformTiltakDeltagerDetaljer)
}


