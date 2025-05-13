import { AxiosPromise } from 'axios'
import { appUrl } from '../utils/url-utils'
import { axiosInstance, logAndThrowError, parse } from './utils'
import { formatDateToDateInputStr } from '../utils/date-utils'
import { EndringAarsak, aktivtForslagSchema } from './data/forslag'

export const forlengDeltakelseForslag = (
  deltakerId: string,
  sluttDato: Date,
  begrunnelse: string
): AxiosPromise => {
  return postForslag(deltakerId, 'forleng', {
    sluttdato: formatDateToDateInputStr(sluttDato),
    begrunnelse: begrunnelse
  })
}

export const ikkeAktuellForslag = (
  deltakerId: string,
  aarsak: EndringAarsak,
  begrunnelse?: string
): AxiosPromise => {
  return postForslag(deltakerId, 'ikke-aktuell', {
    aarsak: aarsak,
    begrunnelse: begrunnelse ?? null
  })
}

export const postAvsluttDeltakelse = (
  deltakerId: string,
  harFullfort: boolean | null,
  harDeltatt: boolean | null,
  aarsak?: EndringAarsak,
  sluttdato?: Date | null,
  begrunnelse?: string
): AxiosPromise => {
  return postForslag(deltakerId, 'avslutt', {
    sluttdato: sluttdato ? formatDateToDateInputStr(sluttdato) : null,
    aarsak: aarsak ?? null,
    harDeltatt: harDeltatt,
    harFullfort: harFullfort,
    begrunnelse: begrunnelse ?? null
  })
}

export const deltakelsesmengdeForslag = (
  deltakerId: string,
  deltakelsesprosent: number,
  dagerPerUke: number | undefined,
  gyldigFra: Date,
  begrunnelse: string
): AxiosPromise => {
  return postForslag(deltakerId, 'deltakelsesmengde', {
    deltakelsesprosent: deltakelsesprosent,
    dagerPerUke: dagerPerUke ?? null,
    gyldigFra: formatDateToDateInputStr(gyldigFra),
    begrunnelse: begrunnelse
  })
}

export const endreSluttdatoForslag = (
  deltakerId: string,
  sluttdato: Date,
  begrunnelse: string
): AxiosPromise => {
  return postForslag(deltakerId, 'sluttdato', {
    sluttdato: formatDateToDateInputStr(sluttdato),
    begrunnelse: begrunnelse
  })
}

export const endreStartdatoForslag = (
  deltakerId: string,
  startdato: Date,
  sluttdato: Date | undefined,
  begrunnelse: string
): AxiosPromise => {
  return postForslag(deltakerId, 'startdato', {
    startdato: formatDateToDateInputStr(startdato),
    sluttdato: sluttdato ? formatDateToDateInputStr(sluttdato) : null,
    begrunnelse: begrunnelse
  })
}

export const endreSluttarsakForslag = (
  deltakerId: string,
  aarsak: EndringAarsak,
  begrunnelse?: string
): AxiosPromise => {
  return postForslag(deltakerId, 'sluttarsak', {
    aarsak: aarsak,
    begrunnelse: begrunnelse
  })
}

export const fjernOppstartsdatoForslag = (
  deltakerId: string,
  begrunnelse: string
): AxiosPromise => {
  return postForslag(deltakerId, 'fjern-oppstartsdato', {
    begrunnelse: begrunnelse
  })
}

export const tilbakekallForslag = (
  deltakerId: string,
  forslagId: string
): AxiosPromise => {
  const url = appUrl(
    `/amt-tiltaksarrangor-bff/tiltaksarrangor/deltaker/${deltakerId}/forslag/${forslagId}/tilbakekall`
  )
  return axiosInstance.post(url).catch((err) => logAndThrowError(err, url))
}

function postForslag<T>(
  deltakerId: string,
  endepunkt: string,
  body: T
): AxiosPromise {
  const url = appUrl(
    `/amt-tiltaksarrangor-bff/tiltaksarrangor/deltaker/${deltakerId}/forslag/${endepunkt}`
  )
  return axiosInstance
    .post(url, body)
    .then(parse(aktivtForslagSchema))
    .catch((err) => logAndThrowError(err, url))
}
