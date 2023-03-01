import { AxiosError, AxiosPromise } from 'axios'

import { formatDateToDateInputStr, formatNullableDateToDateInputStr } from '../utils/date-utils'
import { Nullable } from '../utils/types/or-nothing'
import { appUrl } from '../utils/url-utils'
import { InnloggetAnsatt, innloggetAnsattSchema } from './data/ansatt'
import {
	DeltakerOversikt,
	deltakerOversiktSchema,
	TiltakDeltaker,
	TiltakDeltakerDetaljer,
	tiltakDeltakerDetaljerSchema,
	tiltakDeltakereSchema
} from './data/deltaker'
import { DeltakerStatusAarsak, Endringsmelding, endringsmeldingerSchema } from './data/endringsmelding'
import {
	Gjennomforing,
	gjennomforingerSchema,
	gjennomforingSchema,
	Koordinator,
	koordinatorListSchema,
} from './data/tiltak'
import { axiosInstance, logAndThrowError, parse } from './utils'

export const fetchInnloggetAnsatt = (): AxiosPromise<InnloggetAnsatt> => {
	const url = appUrl('/amt-tiltak/api/tiltaksarrangor/ansatt/meg')
	return axiosInstance
		.get(url)
		.then(parse(innloggetAnsattSchema))
		.catch(err => {
			// Ikke logg 401 feil til sentry

			if ((err as AxiosError).response?.status === 401) {
				throw err
			}

			return logAndThrowError(err, url)
		})
}

// Henter gjennomføringer som er lagt til i oversikten
export const fetchTiltakGjennomforinger = (): AxiosPromise<Gjennomforing[]> => {
	const url = appUrl('/amt-tiltak/api/tiltaksarrangor/gjennomforing')
	return axiosInstance
		.get(url)
		.then(parse(gjennomforingerSchema))
		.catch(err => logAndThrowError(err, url))
}

// Henter alle gjennomføringer som er tilgjengelig, noen gjennomføringer kan allerede være lagt til i oversikten
export const fetchTilgjengeligGjennomforinger = (): AxiosPromise<Gjennomforing[]> => {
	const url = appUrl('/amt-tiltak/api/tiltaksarrangor/gjennomforing/tilgjengelig')
	return axiosInstance
		.get(url)
		.then(parse(gjennomforingerSchema))
		.catch(err => logAndThrowError(err, url))
}

export const opprettTilgangTilGjennomforing = (gjennomforingId: string): AxiosPromise => {
	const url = appUrl(`/amt-tiltak/api/tiltaksarrangor/gjennomforing/${gjennomforingId}/tilgang`)
	return axiosInstance
		.post(url)
		.catch(err => logAndThrowError(err, url))
}

export const fjernTilgangTilGjennomforing = (gjennomforingId: string): AxiosPromise => {
	const url = appUrl(`/amt-tiltak/api/tiltaksarrangor/gjennomforing/${gjennomforingId}/tilgang`)
	return axiosInstance
		.delete(url)
		.catch(err => logAndThrowError(err, url))
}

export const fetchTiltakGjennomforing = (gjennomforingId: string): AxiosPromise<Gjennomforing> => {
	const url = appUrl(`/amt-tiltak/api/tiltaksarrangor/gjennomforing/${gjennomforingId}`)
	return axiosInstance
		.get(url)
		.then(parse(gjennomforingSchema))
		.catch(err => logAndThrowError(err, url))
}

export const fetchKoordinatorerForGjennfomforing = (gjennomforingId: string): AxiosPromise<Koordinator[]> => {
	const url = appUrl(`/amt-tiltak/api/tiltaksarrangor/gjennomforing/${gjennomforingId}/koordinatorer`)
	return axiosInstance
		.get(url)
		.then(parse(koordinatorListSchema))
		.catch(err => logAndThrowError(err, url))
}

export const fetchDeltakerePaTiltakGjennomforing = (gjennomforingId: string): AxiosPromise<TiltakDeltaker[]> => {
	const url = appUrl(`/amt-tiltak/api/tiltaksarrangor/deltaker?gjennomforingId=${gjennomforingId}`)
	return axiosInstance
		.get(url)
		.then(parse(tiltakDeltakereSchema))
		.catch(err => logAndThrowError(err, url))
}

export const fetchDeltakeroversikt = (): AxiosPromise<DeltakerOversikt> => {
	const url = appUrl('/amt-tiltak/api/tiltaksarrangor/deltakeroversikt')
	return axiosInstance
		.get(url)
		.then(parse(deltakerOversiktSchema))
		.catch(err => logAndThrowError(err, url))
}

export const fetchTiltakDeltakerDetaljer = (tiltakDeltagerId: string): AxiosPromise<TiltakDeltakerDetaljer> => {
	const url = appUrl(`/amt-tiltak/api/tiltaksarrangor/deltaker/${tiltakDeltagerId}`)
	return axiosInstance
		.get(url)
		.then(parse(tiltakDeltakerDetaljerSchema))
		.catch(err => logAndThrowError(err, url))
}

export const hentEndringsmeldinger = (deltakerId: string): AxiosPromise<Endringsmelding[]> => {
	const url = appUrl(`/amt-tiltak/api/tiltaksarrangor/endringsmelding/aktiv?deltakerId=${deltakerId}`)
	return axiosInstance
		.get(url)
		.then(parse(endringsmeldingerSchema))
		.catch(err => logAndThrowError(err, url))
}

export const leggTilOppstartsdato = (deltakerId: string, startDato: Date): AxiosPromise => {
	const url = appUrl(`/amt-tiltak/api/tiltaksarrangor/deltaker/${deltakerId}/oppstartsdato`)
	return axiosInstance
		.post(
			url,
			{ oppstartsdato: formatDateToDateInputStr(startDato) },
		)
		.catch(err => logAndThrowError(err, url))
}

export const endreOppstartsdato = (deltakerId: string, startDato: Date): AxiosPromise => {
	const url = appUrl(`/amt-tiltak/api/tiltaksarrangor/deltaker/${deltakerId}/oppstartsdato`)
	return axiosInstance
		.patch(
			url,
			{ oppstartsdato: formatDateToDateInputStr(startDato) },
		)
		.catch(err => logAndThrowError(err, url))
}

export const endreDeltakelsesprosent = (deltakerId: string, deltakelseProsent: number, gyldigFraDato: Nullable<Date>): AxiosPromise => {
	const url = appUrl(`/amt-tiltak/api/tiltaksarrangor/deltaker/${deltakerId}/deltakelse-prosent`)
	return axiosInstance
		.patch(
			url,
			{ deltakelseProsent: deltakelseProsent, gyldigFraDato: formatNullableDateToDateInputStr(gyldigFraDato) }
		)
		.catch(err => logAndThrowError(err, url))
}

export const forlengDeltakelse = (deltakerId: string, sluttDato: Date): AxiosPromise => {
	const url = appUrl(`/amt-tiltak/api/tiltaksarrangor/deltaker/${deltakerId}/forleng-deltakelse`)
	return axiosInstance
		.patch(
			url,
			{ sluttdato: formatDateToDateInputStr(sluttDato) },
		)
		.catch(err => logAndThrowError(err, url))
}

export const avsluttDeltakelse = (deltakerId: string, sluttDato: Date, aarsak: DeltakerStatusAarsak): AxiosPromise => {
	const url = appUrl(`/amt-tiltak/api/tiltaksarrangor/deltaker/${deltakerId}/avslutt-deltakelse`)
	return axiosInstance
		.patch(
			url,
			{ sluttdato: formatDateToDateInputStr(sluttDato), aarsak: aarsak },
		)
		.catch(err => logAndThrowError(err, url))
}

export const deltakerIkkeAktuell = (deltakerId: string, aarsak: DeltakerStatusAarsak): AxiosPromise => {
	const url = appUrl(`/amt-tiltak/api/tiltaksarrangor/deltaker/${deltakerId}/ikke-aktuell`)
	return axiosInstance
		.patch(
			url,
			{ aarsak },
		)
		.catch(err => logAndThrowError(err, url))
}

export const tilbakekallEndringsmelding = (endringsmeldingId: string): AxiosPromise => {
	const url = appUrl(`/amt-tiltak/api/tiltaksarrangor/endringsmelding/${endringsmeldingId}/tilbakekall`)
	return axiosInstance
		.patch(
			url,
		)
		.catch(err => logAndThrowError(err, url))
}

export const skjulDeltaker = (deltakerId: string): AxiosPromise => {
	const url = appUrl(`/amt-tiltak/api/tiltaksarrangor/deltaker/${deltakerId}/skjul`)
	return axiosInstance
		.patch(
			url,
		)
		.catch(err => logAndThrowError(err, url))
}