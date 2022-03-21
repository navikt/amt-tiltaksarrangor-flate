import { AxiosPromise } from 'axios'

import { appUrl } from '../utils/url-utils'
import { InnloggetAnsattDto, innloggetAnsattSchema } from './data/ansatt'
import {
	TiltakDeltakerDetaljerDto,
	tiltakDeltakerDetaljerSchema,
	TiltakDeltakerDto,
	tiltakDeltakereSchema
} from './data/deltaker'
import { GjennomforingDto, gjennomforingerSchema, gjennomforingSchema } from './data/tiltak'
import { axiosInstance, logAndThrowError, parse } from './utils'

export const fetchInnloggetAnsatt = (): AxiosPromise<InnloggetAnsattDto> => {
	return axiosInstance
		.get(appUrl('/amt-tiltak/api/arrangor/ansatt/meg'))
		.then(parse(innloggetAnsattSchema))
		.catch(logAndThrowError)
}

export const fetchTiltakGjennomforinger = (): AxiosPromise<GjennomforingDto[]> => {
	return axiosInstance
		.get(appUrl('/amt-tiltak/api/gjennomforing'))
		.then(parse(gjennomforingerSchema))
		.catch(logAndThrowError)
}

export const fetchTiltakGjennomforing = (gjennomforingId: string): AxiosPromise<GjennomforingDto> => {
	return axiosInstance
		.get(appUrl(`/amt-tiltak/api/gjennomforing/${gjennomforingId}`))
		.then(parse(gjennomforingSchema))
		.catch(logAndThrowError)
}

export const fetchDeltakerePaTiltakGjennomforing = (gjennomforingId: string): AxiosPromise<TiltakDeltakerDto[]> => {
	return axiosInstance
		.get(appUrl(`/amt-tiltak/api/gjennomforing/${gjennomforingId}/deltakere`))
		.then(parse(tiltakDeltakereSchema))
		.catch(logAndThrowError)
}

export const fetchTiltakDeltagerDetaljer = (tiltakDeltagerId: string): AxiosPromise<TiltakDeltakerDetaljerDto> => {
	return axiosInstance
		.get(appUrl(`/amt-tiltak/api/tiltak-deltaker/${tiltakDeltagerId}`))
		.then(parse(tiltakDeltakerDetaljerSchema))
		.catch(logAndThrowError)
}
