import { AxiosError, AxiosPromise } from 'axios'

import { formatDateToDateInputStr, formatNullableDateToDateInputStr } from '../utils/date-utils'
import { Nullable } from '../utils/types/or-nothing'
import { appUrl } from '../utils/url-utils'
import { Rolle } from './data/ansatt'
import {
	Deltaker,
	deltakerlisteVeilederSchema,
	deltakerSchema, KoordinatorsDeltakerliste,
	koordinatorsDeltakerlisteSchema,
	MineDeltakerlister,
	mineDeltakerlisterSchema,
	VeiledersDeltaker
} from './data/deltaker'
import {
	DeltakerStatusAarsak,
	Endringsmelding,
	endringsmeldingerSchema,
	EndringsmeldingType
} from './data/endringsmelding'
import {
	AdminDeltakerliste,
	adminDeltakerlisterSchema,
} from './data/tiltak'
import { tilgjengeligeVeiledereSchema, TilgjengeligVeileder, Veileder } from './data/veileder'
import { axiosInstance, logAndThrowError, parse } from './utils'

export const fetchMineRoller = (): AxiosPromise<Rolle[]> => {
	const url = appUrl('/amt-tiltaksarrangor-bff/tiltaksarrangor/meg/roller')
	return axiosInstance
		.get(url)
		.catch(err => {
			// Ikke logg 401 feil til sentry
			if ((err as AxiosError).response?.status === 401) {
				throw err
			}

			return logAndThrowError(err, url)
		})
}

export const fetchAlleDeltakerlister = (): AxiosPromise<AdminDeltakerliste[]> => {
	const url = appUrl('/amt-tiltaksarrangor-bff/tiltaksarrangor/koordinator/admin/deltakerlister')
	return axiosInstance
		.get(url)
		.then(parse(adminDeltakerlisterSchema))
		.catch(err => logAndThrowError(err, url))
}

export const leggTilDeltakerliste = (deltakerlisteId: string): AxiosPromise => {
	const url = appUrl(`/amt-tiltaksarrangor-bff/tiltaksarrangor/koordinator/admin/deltakerliste/${deltakerlisteId}`)
	return axiosInstance
		.post(url)
		.catch(err => logAndThrowError(err, url))
}

export const fjernDeltakerliste = (deltakerlisteId: string): AxiosPromise => {
	const url = appUrl(`/amt-tiltaksarrangor-bff/tiltaksarrangor/koordinator/admin/deltakerliste/${deltakerlisteId}`)
	return axiosInstance
		.delete(url)
		.catch(err => logAndThrowError(err, url))
}

export const fetchKoordinatorsDeltakerliste = (deltakerlisteId: string): AxiosPromise<KoordinatorsDeltakerliste> => {
	const url = appUrl(`/amt-tiltaksarrangor-bff/tiltaksarrangor/koordinator/deltakerliste/${deltakerlisteId}`)
	return axiosInstance
		.get(url)
		.then(parse(koordinatorsDeltakerlisteSchema))
		.catch(err => logAndThrowError(err, url))
}

export const fetchDeltakeroversikt = (): AxiosPromise<MineDeltakerlister> => {
	const url = appUrl('/amt-tiltaksarrangor-bff/tiltaksarrangor/koordinator/mine-deltakerlister')
	return axiosInstance
		.get(url)
		.then(parse(mineDeltakerlisterSchema))
		.catch(err => {
			// Ikke logg 403-feil til sentry
			if ((err as AxiosError).response?.status === 403) {
				throw err
			}

			return logAndThrowError(err, url)
		})
}

export const fetchMineDeltakere = (): AxiosPromise<VeiledersDeltaker[]> => {
	const url = appUrl('/amt-tiltaksarrangor-bff/tiltaksarrangor/veileder/mine-deltakere')
	return axiosInstance
		.get(url)
		.then(parse(deltakerlisteVeilederSchema))
		.catch(err => logAndThrowError(err, url))
}

export const fetchDeltaker = (deltakerId: string): AxiosPromise<Deltaker> => {
	const url = appUrl(`/amt-tiltaksarrangor-bff/tiltaksarrangor/deltaker/${deltakerId}`)
	return axiosInstance
		.get(url)
		.then(parse(deltakerSchema))
		.catch(err => logAndThrowError(err, url))
}

export const hentEndringsmeldinger = (deltakerId: string): AxiosPromise<Endringsmelding[]> => {
	const url = appUrl(`/amt-tiltaksarrangor-bff/tiltaksarrangor/deltaker/${deltakerId}/endringsmeldinger`)
	return axiosInstance
		.get(url)
		.then(parse(endringsmeldingerSchema))
		.catch(err => logAndThrowError(err, url))
}

export const leggTilOppstartsdato = (deltakerId: string, startDato: Date): AxiosPromise => {
	const url = appUrl(`/amt-tiltaksarrangor-bff/tiltaksarrangor/deltaker/${deltakerId}/endringsmelding`)
	return axiosInstance
		.post(
			url,
			{ innhold: { type: EndringsmeldingType.LEGG_TIL_OPPSTARTSDATO, oppstartsdato: formatDateToDateInputStr(startDato) } },
		)
		.catch(err => logAndThrowError(err, url))
}

export const endreOppstartsdato = (deltakerId: string, startDato: Date): AxiosPromise => {
	const url = appUrl(`/amt-tiltaksarrangor-bff/tiltaksarrangor/deltaker/${deltakerId}/endringsmelding`)
	return axiosInstance
		.post(
			url,
			{ innhold: { type: EndringsmeldingType.ENDRE_OPPSTARTSDATO, oppstartsdato: formatDateToDateInputStr(startDato) } },
		)
		.catch(err => logAndThrowError(err, url))
}

export const endreDeltakelsesprosent = (deltakerId: string, deltakelseProsent: number, gyldigFraDato: Nullable<Date>): AxiosPromise => {
	const url = appUrl(`/amt-tiltaksarrangor-bff/tiltaksarrangor/deltaker/${deltakerId}/endringsmelding`)
	return axiosInstance
		.post(
			url,
			{ innhold: { type: EndringsmeldingType.ENDRE_DELTAKELSE_PROSENT, deltakelseProsent: deltakelseProsent, gyldigFraDato: formatNullableDateToDateInputStr(gyldigFraDato) } }
		)
		.catch(err => logAndThrowError(err, url))
}

export const forlengDeltakelse = (deltakerId: string, sluttDato: Date): AxiosPromise => {
	const url = appUrl(`/amt-tiltaksarrangor-bff/tiltaksarrangor/deltaker/${deltakerId}/endringsmelding`)
	return axiosInstance
		.post(
			url,
			{ innhold: { type: EndringsmeldingType.FORLENG_DELTAKELSE, sluttdato: formatDateToDateInputStr(sluttDato) } },
		)
		.catch(err => logAndThrowError(err, url))
}

export const avsluttDeltakelse = (deltakerId: string, sluttDato: Date, aarsak: DeltakerStatusAarsak): AxiosPromise => {
	const url = appUrl(`/amt-tiltaksarrangor-bff/tiltaksarrangor/deltaker/${deltakerId}/endringsmelding`)
	return axiosInstance
		.post(
			url,
			{ innhold: { type: EndringsmeldingType.AVSLUTT_DELTAKELSE, sluttdato: formatDateToDateInputStr(sluttDato), aarsak: aarsak } },
		)
		.catch(err => logAndThrowError(err, url))
}

export const deltakerIkkeAktuell = (deltakerId: string, aarsak: DeltakerStatusAarsak): AxiosPromise => {
	const url = appUrl(`/amt-tiltaksarrangor-bff/tiltaksarrangor/deltaker/${deltakerId}/endringsmelding`)
	return axiosInstance
		.post(
			url,
			{ innhold: { type: EndringsmeldingType.DELTAKER_IKKE_AKTUELL, aarsak: aarsak } },
		)
		.catch(err => logAndThrowError(err, url))
}

export const postTilbyPlass = (deltakerId: string): AxiosPromise => {
	const url = appUrl(`/amt-tiltaksarrangor-bff/tiltaksarrangor/deltaker/${deltakerId}/endringsmelding`)
	return axiosInstance
		.post(
			url,
			{ innhold: { type: EndringsmeldingType.TILBY_PLASS } },
		)
		.catch(err => logAndThrowError(err, url))
}

export const postSettPaaVenteliste = (deltakerId: string): AxiosPromise => {
	const url = appUrl(`/amt-tiltaksarrangor-bff/tiltaksarrangor/deltaker/${deltakerId}/endringsmelding`)
	return axiosInstance
		.post(
			url,
			{ innhold: { type: EndringsmeldingType.SETT_PAA_VENTELISTE } },
		)
		.catch(err => logAndThrowError(err, url))
}

export const postEndreSluttdato = (deltakerId: string, sluttDato: Date): AxiosPromise => {
	const url = appUrl(`/amt-tiltaksarrangor-bff/tiltaksarrangor/deltaker/${deltakerId}/endringsmelding`)
	return axiosInstance
		.post(
			url,
			{ innhold: { type: EndringsmeldingType.ENDRE_SLUTTDATO, sluttdato: formatDateToDateInputStr(sluttDato) } },
		)
		.catch(err => logAndThrowError(err, url))
}


export const tilbakekallEndringsmelding = (endringsmeldingId: string): AxiosPromise => {
	const url = appUrl(`/amt-tiltaksarrangor-bff/tiltaksarrangor/endringsmelding/${endringsmeldingId}`)
	return axiosInstance
		.delete(
			url,
		)
		.catch(err => logAndThrowError(err, url))
}

export const skjulDeltaker = (deltakerId: string): AxiosPromise => {
	const url = appUrl(`/amt-tiltaksarrangor-bff/tiltaksarrangor/deltaker/${deltakerId}`)
	return axiosInstance
		.delete(
			url,
		)
		.catch(err => logAndThrowError(err, url))
}

export const hentTilgjengeligeVeiledere = (deltakerlisteId: string): AxiosPromise<TilgjengeligVeileder[]> => {
	const url = appUrl(`/amt-tiltaksarrangor-bff/tiltaksarrangor/koordinator/${deltakerlisteId}/veiledere`)
	return axiosInstance
		.get(url)
		.then(parse(tilgjengeligeVeiledereSchema))
		.catch(err => logAndThrowError(err, url))
}

export const tildelVeilederForDeltaker = (deltakerId: string, veiledere: Veileder[]): AxiosPromise => {
	const url = appUrl(`/amt-tiltaksarrangor-bff/tiltaksarrangor/koordinator/veiledere?deltakerId=${deltakerId}`)
	return axiosInstance
		.post(
			url,
			{ veiledere: veiledere.map(v => { return { ansattId: v.ansattId, erMedveileder: v.erMedveileder } }) },
		)
		.catch(err => logAndThrowError(err, url))
}
