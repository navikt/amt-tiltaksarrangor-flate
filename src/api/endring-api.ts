import { AxiosPromise } from 'axios'
import { appUrl } from '../utils/url-utils'
import { axiosInstance, logAndThrowError, parse } from './utils'
import { formatDateToDateInputStr } from '../utils/date-utils'
import { deltakerSchema } from './data/deltaker'

export const leggTilOppstartsdatoFraArrangor = (
  deltakerId: string,
  startdato: Date,
  sluttdato: Date | undefined
): AxiosPromise => {
  return postEndring(deltakerId, 'legg-til-oppstartsdato', {
    startdato: formatDateToDateInputStr(startdato),
    sluttdato: sluttdato ? formatDateToDateInputStr(sluttdato) : null
  })
}

function postEndring<T>(
  deltakerId: string,
  endepunkt: string,
  body: T
): AxiosPromise {
  const url = appUrl(
    `/amt-tiltaksarrangor-bff/tiltaksarrangor/deltaker/${deltakerId}/endring/${endepunkt}`
  )
  return axiosInstance
    .post(url, body)
    .then(parse(deltakerSchema))
    .catch((err) => logAndThrowError(err, url))
}

export function settSvarFraNavSomLest(
  deltakerId: string,
  ulestEndringId: string,
): AxiosPromise {
  const url = appUrl(
    `/amt-tiltaksarrangor-bff/tiltaksarrangor/deltaker/${deltakerId}/ulest-endring/${ulestEndringId}/marker-som-lest`
  )
  return axiosInstance
    .post(url)
    .catch((err) => logAndThrowError(err, url))
}
