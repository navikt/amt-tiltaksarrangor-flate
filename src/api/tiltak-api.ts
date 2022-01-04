import { AxiosPromise } from 'axios'

import { InnloggetAnsatt } from '../domeneobjekter/ansatt'
import { TiltakDeltaker, TiltakDeltakerDetaljer } from '../domeneobjekter/deltaker'
import { Gjennomforing } from '../domeneobjekter/tiltak'
import {
	transformGjennomforing,
	transformGjennomforinger,
	transformInnloggetAnsatt,
	transformTiltakDeltager,
	transformTiltakDeltagerDetaljer } from './dtoTransformere'
import { axiosInstance } from './utils'

export const fetchInnloggetAnsatt = (): AxiosPromise<InnloggetAnsatt> => {
	return axiosInstance
		.get('/amt-tiltak/api/arrangor/ansatt/meg')
		.then(transformInnloggetAnsatt)
}

export const fetchTiltakGjennomforinger = (arrangorId: string): AxiosPromise<Gjennomforing[]> => {
	return axiosInstance
		.get(`/amt-tiltak/api/gjennomforing?arrangorId=${arrangorId}`)
		.then(transformGjennomforinger)
}

export const fetchTiltakGjennomforing = (gjennomforingId: string): AxiosPromise<Gjennomforing> => {
	return axiosInstance
		.get(`/amt-tiltak/api/gjennomforing/${gjennomforingId}`)
		.then(transformGjennomforing)
}

export const fetchDeltakerePaTiltakGjennomforing = (gjennomforingId: string): AxiosPromise<TiltakDeltaker[]> => {
	return axiosInstance
		.get(`/amt-tiltak/api/gjennomforing/${gjennomforingId}/deltakere`)
		.then(transformTiltakDeltager)
}

export const fetchTiltakDeltagerDetaljer = (tiltakDeltagerId: string): AxiosPromise<TiltakDeltakerDetaljer> => {
	return axiosInstance
		.get(`/amt-tiltak/api/tiltak-deltaker/${tiltakDeltagerId}`)
		.then(transformTiltakDeltagerDetaljer)
}


