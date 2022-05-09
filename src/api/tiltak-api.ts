import { AxiosError, AxiosPromise } from 'axios'

import { formatDateToDateStr } from '../utils/date-utils'
import { appUrl } from '../utils/url-utils'
import { InnloggetAnsatt, innloggetAnsattSchema } from './data/ansatt'
import {
	TilgangInvitasjonInfo,
	TiltakDeltaker,
	TiltakDeltakerDetaljer,
	tiltakDeltakerDetaljerSchema,
	tiltakDeltakereSchema
} from './data/deltaker'
import { Gjennomforing, gjennomforingerSchema, gjennomforingSchema } from './data/tiltak'
import { axiosInstance, logAndThrowError, parse } from './utils'

export const fetchInnloggetAnsatt = (): AxiosPromise<InnloggetAnsatt> => {
	return axiosInstance
		.get(appUrl('/amt-tiltak/api/arrangor/ansatt/meg'))
		.then(parse(innloggetAnsattSchema))
		.catch(err => {
			// Ikke logg 401 feil til sentry

			if ((err as AxiosError).response?.status === 401) {
				throw err
			}

			return logAndThrowError(err)
		})
}

export const fetchTiltakGjennomforinger = (): AxiosPromise<Gjennomforing[]> => {
	return axiosInstance
		.get(appUrl('/amt-tiltak/api/gjennomforing'))
		.then(parse(gjennomforingerSchema))
		.catch(logAndThrowError)
}

export const fetchTiltakGjennomforing = (gjennomforingId: string): AxiosPromise<Gjennomforing> => {
	return axiosInstance
		.get(appUrl(`/amt-tiltak/api/gjennomforing/${gjennomforingId}`))
		.then(parse(gjennomforingSchema))
		.catch(logAndThrowError)
}

export const fetchDeltakerePaTiltakGjennomforing = (gjennomforingId: string): AxiosPromise<TiltakDeltaker[]> => {
	return axiosInstance
		.get(appUrl(`/amt-tiltak/api/gjennomforing/${gjennomforingId}/deltakere`))
		.then(parse(tiltakDeltakereSchema))
		.catch(logAndThrowError)
}

export const fetchTiltakDeltagerDetaljer = (tiltakDeltagerId: string): AxiosPromise<TiltakDeltakerDetaljer> => {
	return axiosInstance
		.get(appUrl(`/amt-tiltak/api/tiltak-deltaker/${tiltakDeltagerId}`))
		.then(parse(tiltakDeltakerDetaljerSchema))
		.catch(logAndThrowError)
}

export const fetchTilgangInvitasjonInfo = (invitasjonId: string): AxiosPromise<TilgangInvitasjonInfo> => {
	return axiosInstance
		.get(appUrl(`/amt-tiltak/api/tiltaksarrangor/tilgang/invitasjon/${invitasjonId}/info`))
		.catch(logAndThrowError)
}

export const aksepterTilgangInvitasjon = (invitasjonId: string): AxiosPromise => {
	return axiosInstance
		.patch(appUrl(`/amt-tiltak/api/tiltaksarrangor/tilgang/invitasjon/${invitasjonId}/aksepter`))
		.catch(logAndThrowError)
}

export const opprettStartDatoEndringsmelding = (deltakerId: string, startDato: Date): AxiosPromise => {
	const datoStr = formatDateToDateStr(startDato)
	return axiosInstance
		.post(appUrl(`/amt-tiltak/api/tiltaksarrangor/endringsmelding/deltaker/${deltakerId}/startdato?startDato=${datoStr}`))
		.catch(logAndThrowError)
}
