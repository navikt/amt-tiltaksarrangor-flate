import { AxiosPromise } from 'axios'
import { appUrl } from '../utils/url-utils'
import { axiosInstance, logAndThrowError, parse } from './utils'
import { formatDateToDateInputStr } from '../utils/date-utils'
import { EndringAarsak, aktivtForslagSchema } from './data/forslag'


export const forlengDeltakelseForslag = (deltakerId: string, sluttDato: Date, begrunnelse: string): AxiosPromise => {
	const url = appUrl(`/amt-tiltaksarrangor-bff/tiltaksarrangor/deltaker/${deltakerId}/forslag/forleng`)
	return axiosInstance
		.post(
			url,
			{ sluttdato: formatDateToDateInputStr(sluttDato), begrunnelse: begrunnelse },
		)
		.then(parse(aktivtForslagSchema))
		.catch(err => logAndThrowError(err, url))
}

export const ikkeAktuellForslag = (deltakerId: string, aarsak: EndringAarsak, begrunnelse?: string): AxiosPromise => {
	const url = appUrl(`/amt-tiltaksarrangor-bff/tiltaksarrangor/deltaker/${deltakerId}/forslag/ikke-aktuell`)
	return axiosInstance
		.post(
			url,
			{ aarsak: aarsak, begrunnelse: begrunnelse ?? null },
		)
		.then(parse(aktivtForslagSchema))
		.catch(err => logAndThrowError(err, url))
}

export const tilbakekallForslag = (deltakerId: string, forslagId: string): AxiosPromise => {
	const url = appUrl(`/amt-tiltaksarrangor-bff/tiltaksarrangor/deltaker/${deltakerId}/forslag/${forslagId}/tilbakekall`)
	return axiosInstance
		.post(url)
		.catch(err => logAndThrowError(err, url))
}
