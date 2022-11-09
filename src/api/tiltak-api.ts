import { AxiosError, AxiosPromise } from 'axios'

import { formatDateToDateInputStr } from '../utils/date-utils'
import { appUrl } from '../utils/url-utils'
import { InnloggetAnsatt, innloggetAnsattSchema } from './data/ansatt'
import {
	TiltakDeltaker,
	TiltakDeltakerDetaljer,
	tiltakDeltakerDetaljerSchema,
	tiltakDeltakereSchema
} from './data/deltaker'
import {
	Endringsmelding,
	endringsmeldingerSchema,
	Gjennomforing,
	gjennomforingerSchema,
	gjennomforingSchema,
	Koordinator, koordinatorListSchema,
} from './data/tiltak'
import { axiosInstance, logAndThrowError, parse } from './utils'

export const fetchInnloggetAnsatt = (): AxiosPromise<InnloggetAnsatt> => {
	return axiosInstance
		.get(appUrl('/amt-tiltak/api/tiltaksarrangor/ansatt/meg'))
		.then(parse(innloggetAnsattSchema))
		.catch(err => {
			// Ikke logg 401 feil til sentry

			if ((err as AxiosError).response?.status === 401) {
				throw err
			}

			return logAndThrowError(err)
		})
}

// Henter gjennomføringer som er lagt til i oversikten
export const fetchTiltakGjennomforinger = (): AxiosPromise<Gjennomforing[]> => {
	return axiosInstance
		.get(appUrl('/amt-tiltak/api/tiltaksarrangor/gjennomforing'))
		.then(parse(gjennomforingerSchema))
		.catch(logAndThrowError)
}

// Henter alle gjennomføringer som er tilgjengelig, noen gjennomføringer kan allerede være lagt til i oversikten
export const fetchTilgjengeligGjennomforinger = (): AxiosPromise<Gjennomforing[]> => {
	return axiosInstance
		.get(appUrl('/amt-tiltak/api/tiltaksarrangor/gjennomforing/tilgjengelig'))
		.then(parse(gjennomforingerSchema))
		.catch(logAndThrowError)
}

export const opprettTilgangTilGjennomforing = (gjennomforingId: string): AxiosPromise => {
	return axiosInstance
		.post(appUrl(`/amt-tiltak/api/tiltaksarrangor/gjennomforing/${gjennomforingId}/tilgang`))
		.catch(logAndThrowError)
}

export const fjernTilgangTilGjennomforing = (gjennomforingId: string): AxiosPromise => {
	return axiosInstance
		.delete(appUrl(`/amt-tiltak/api/tiltaksarrangor/gjennomforing/${gjennomforingId}/tilgang`))
		.catch(logAndThrowError)
}

export const fetchTiltakGjennomforing = (gjennomforingId: string): AxiosPromise<Gjennomforing> => {
	return axiosInstance
		.get(appUrl(`/amt-tiltak/api/tiltaksarrangor/gjennomforing/${gjennomforingId}`))
		.then(parse(gjennomforingSchema))
		.catch(logAndThrowError)
}

export const fetchKoordinatorerForGjennfomforing = (gjennomforingId: string): AxiosPromise<Koordinator[]> => {
	return axiosInstance
		.get(appUrl(`/amt-tiltak/api/tiltaksarrangor/gjennomforing/${gjennomforingId}/koordinatorer`))
		.then(parse(koordinatorListSchema))
		.catch(logAndThrowError)
}

export const fetchDeltakerePaTiltakGjennomforing = (gjennomforingId: string): AxiosPromise<TiltakDeltaker[]> => {
	return axiosInstance
		.get(appUrl(`/amt-tiltak/api/tiltaksarrangor/gjennomforing/${gjennomforingId}/deltakere`))
		.then(parse(tiltakDeltakereSchema))
		.catch(logAndThrowError)
}

export const fetchTiltakDeltagerDetaljer = (tiltakDeltagerId: string): AxiosPromise<TiltakDeltakerDetaljer> => {
	return axiosInstance
		.get(appUrl(`/amt-tiltak/api/tiltaksarrangor/deltaker/${tiltakDeltagerId}`))
		.then(parse(tiltakDeltakerDetaljerSchema))
		.catch(logAndThrowError)
}

export const hentEndringsmeldinger = (deltakerId: string): AxiosPromise<Endringsmelding[]> => {
	return axiosInstance
		.get(appUrl(`/amt-tiltak/api/tiltaksarrangor/endringsmelding?deltakerId=${deltakerId}`))
		.then(parse(endringsmeldingerSchema))
		.catch(logAndThrowError)
}

export const opprettStartDatoEndringsmelding = (deltakerId: string, startDato: Date): AxiosPromise => {
	const datoStr = formatDateToDateInputStr(startDato)
	return axiosInstance
		.post(appUrl(`/amt-tiltak/api/tiltaksarrangor/endringsmelding/deltaker/${deltakerId}/startdato?startDato=${datoStr}`))
		.catch(logAndThrowError)
}

export const opprettSluttDatoEndringsmelding = (deltakerId: string, sluttDato: Date): AxiosPromise => {
	const datoStr = formatDateToDateInputStr(sluttDato)
	return axiosInstance
		.post(appUrl(`/amt-tiltak/api/tiltaksarrangor/endringsmelding/deltaker/${deltakerId}/sluttdato?sluttDato=${datoStr}`))
		.catch(logAndThrowError)
}
