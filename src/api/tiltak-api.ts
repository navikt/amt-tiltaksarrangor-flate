import { AxiosError, AxiosPromise } from 'axios'

import { formatDateToDateStr } from '../utils/date-utils'
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

// Henter gjennomføringer som er lagt til i oversikten
export const fetchTiltakGjennomforinger = (): AxiosPromise<Gjennomforing[]> => {
	return axiosInstance
		.get(appUrl('/amt-tiltak/api/gjennomforing'))
		.then(parse(gjennomforingerSchema))
		.catch(logAndThrowError)
}

// Henter alle gjennomføringer som er tilgjengelig, noen gjennomføringer kan allerede være lagt til i oversikten
export const fetchTilgjengeligGjennomforinger = (): AxiosPromise<Gjennomforing[]> => {
	return axiosInstance
		.get(appUrl('/amt-tiltak/api/gjennomforing/tilgjengelig'))
		.then(parse(gjennomforingerSchema))
		.catch(logAndThrowError)
}

export const opprettTilgangTilGjennomforing = (gjennomforingId: string): AxiosPromise => {
	return axiosInstance
		.post(appUrl(`/amt-tiltak/api/gjennomforing/${gjennomforingId}/tilgang`))
		.catch(logAndThrowError)
}

export const fjernTilgangTilGjennomforing = (gjennomforingId: string): AxiosPromise => {
	return axiosInstance
		.delete(appUrl(`/amt-tiltak/api/gjennomforing/${gjennomforingId}/tilgang`))
		.catch(logAndThrowError)
}

export const fetchTiltakGjennomforing = (gjennomforingId: string): AxiosPromise<Gjennomforing> => {
	return axiosInstance
		.get(appUrl(`/amt-tiltak/api/gjennomforing/${gjennomforingId}`))
		.then(parse(gjennomforingSchema))
		.catch(logAndThrowError)
}

export const fetchKoordinatorerForGjennfomforing = (gjennomforingId: string): AxiosPromise<Koordinator[]> => {
	return axiosInstance
		.get(appUrl(`/amt-tiltak/api/gjennomforing/${gjennomforingId}/koordinatorer`))
		.then(parse(koordinatorListSchema))
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

export const hentEndringsmeldinger = (deltakerId: string): AxiosPromise<Endringsmelding[]> => {
	return axiosInstance
		.get(appUrl(`/amt-tiltak/api/tiltaksarrangor/endringsmelding?deltakerId=${deltakerId}`))
		.then(parse(endringsmeldingerSchema))
		.catch(logAndThrowError)
}

export const opprettStartDatoEndringsmelding = (deltakerId: string, startDato: Date): AxiosPromise => {
	const datoStr = formatDateToDateStr(startDato)
	return axiosInstance
		.post(appUrl(`/amt-tiltak/api/tiltaksarrangor/endringsmelding/deltaker/${deltakerId}/startdato?startDato=${datoStr}`))
		.catch(logAndThrowError)
}
