import { AxiosError, AxiosPromise } from 'axios'

import { appUrl } from '../utils/url-utils'
import { Rolle } from './data/ansatt'
import {
  Deltaker,
  deltakerlisteVeilederSchema,
  deltakerSchema,
  KoordinatorsDeltakerliste,
  koordinatorsDeltakerlisteSchema,
  MineDeltakerlister,
  mineDeltakerlisterSchema,
  VeiledersDeltaker,
  Vurderingstype
} from './data/deltaker'
import { AdminDeltakerliste, adminDeltakerlisterSchema } from './data/tiltak'
import {
  tilgjengeligeVeiledereSchema,
  TilgjengeligVeileder,
  Veileder
} from './data/veileder'
import { axiosInstance, logAndThrowError, parse } from './utils'

export const fetchMineRoller = (): AxiosPromise<Rolle[]> => {
  const url = appUrl('/amt-tiltaksarrangor-bff/tiltaksarrangor/meg/roller')
  return axiosInstance.get(url).catch((err) => {

    return logAndThrowError(err, url)
  })
}

export const fetchAlleDeltakerlister = (): AxiosPromise<
  AdminDeltakerliste[]
> => {
  const url = appUrl(
    '/amt-tiltaksarrangor-bff/tiltaksarrangor/koordinator/admin/deltakerlister'
  )
  return axiosInstance
    .get(url)
    .then(parse(adminDeltakerlisterSchema))
    .catch((err) => logAndThrowError(err, url))
}

export const leggTilDeltakerliste = (deltakerlisteId: string): AxiosPromise => {
  const url = appUrl(
    `/amt-tiltaksarrangor-bff/tiltaksarrangor/koordinator/admin/deltakerliste/${deltakerlisteId}`
  )
  return axiosInstance.post(url).catch((err) => logAndThrowError(err, url))
}

export const fjernDeltakerliste = (deltakerlisteId: string): AxiosPromise => {
  const url = appUrl(
    `/amt-tiltaksarrangor-bff/tiltaksarrangor/koordinator/admin/deltakerliste/${deltakerlisteId}`
  )
  return axiosInstance.delete(url).catch((err) => logAndThrowError(err, url))
}

export const fetchKoordinatorsDeltakerliste = (
  deltakerlisteId: string
): AxiosPromise<KoordinatorsDeltakerliste> => {
  const url = appUrl(
    `/amt-tiltaksarrangor-bff/tiltaksarrangor/koordinator/deltakerliste/${deltakerlisteId}`
  )
  return axiosInstance
    .get(url)
    .then(parse(koordinatorsDeltakerlisteSchema))
    .catch((err) => logAndThrowError(err, url))
}

export const fetchDeltakeroversikt = (): AxiosPromise<MineDeltakerlister> => {
  const url = appUrl(
    '/amt-tiltaksarrangor-bff/tiltaksarrangor/koordinator/mine-deltakerlister'
  )
  return axiosInstance
    .get(url)
    .then(parse(mineDeltakerlisterSchema))
    .catch((err) => {
      // Ikke logg 403-feil til sentry
      if ((err as AxiosError).response?.status === 403) {
        throw err
      }

      return logAndThrowError(err, url)
    })
}

export const fetchMineDeltakere = (): AxiosPromise<VeiledersDeltaker[]> => {
  const url = appUrl(
    '/amt-tiltaksarrangor-bff/tiltaksarrangor/veileder/mine-deltakere'
  )
  return axiosInstance
    .get(url)
    .then(parse(deltakerlisteVeilederSchema))
    .catch((err) => logAndThrowError(err, url))
}

export const fetchDeltaker = (deltakerId: string): AxiosPromise<Deltaker> => {
  const url = appUrl(
    `/amt-tiltaksarrangor-bff/tiltaksarrangor/deltaker/${deltakerId}`
  )
  return axiosInstance
    .get(url)
    .then(parse(deltakerSchema))
    .catch((err) => logAndThrowError(err, url))
}

export const skjulDeltaker = (deltakerId: string): AxiosPromise => {
  const url = appUrl(
    `/amt-tiltaksarrangor-bff/tiltaksarrangor/deltaker/${deltakerId}`
  )
  return axiosInstance.delete(url).catch((err) => logAndThrowError(err, url))
}

export const hentTilgjengeligeVeiledere = (
  deltakerlisteId: string
): AxiosPromise<TilgjengeligVeileder[]> => {
  const url = appUrl(
    `/amt-tiltaksarrangor-bff/tiltaksarrangor/koordinator/${deltakerlisteId}/veiledere`
  )
  return axiosInstance
    .get(url)
    .then(parse(tilgjengeligeVeiledereSchema))
    .catch((err) => logAndThrowError(err, url))
}

export const tildelVeilederForDeltaker = (
  deltakerId: string,
  veiledere: Veileder[]
): AxiosPromise => {
  const url = appUrl(
    `/amt-tiltaksarrangor-bff/tiltaksarrangor/koordinator/veiledere?deltakerId=${deltakerId}`
  )
  return axiosInstance
    .post(url, {
      veiledere: veiledere.map((v) => {
        return { ansattId: v.ansattId, erMedveileder: v.erMedveileder }
      })
    })
    .catch((err) => logAndThrowError(err, url))
}

export const postDeltakerVurderingOppfyllerKravene = (
  deltakerId: string
): AxiosPromise => {
  const url = appUrl(
    `/amt-tiltaksarrangor-bff/tiltaksarrangor/deltaker/${deltakerId}/vurdering`
  )
  return axiosInstance
    .post(url, { vurderingstype: Vurderingstype.OPPFYLLER_KRAVENE })
    .catch((err) => logAndThrowError(err, url))
}

export const postDeltakerVurderingOppfyllerIkkeKravene = (
  deltakerId: string,
  begrunnelse: string
): AxiosPromise => {
  const url = appUrl(
    `/amt-tiltaksarrangor-bff/tiltaksarrangor/deltaker/${deltakerId}/vurdering`
  )
  return axiosInstance
    .post(url, {
      vurderingstype: Vurderingstype.OPPFYLLER_IKKE_KRAVENE,
      begrunnelse
    })
    .catch((err) => logAndThrowError(err, url))
}
