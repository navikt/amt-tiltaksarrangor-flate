import { AxiosError, AxiosPromise } from 'axios'
import { appUrl } from '../utils/url-utils'
import { axiosInstance, logAndThrowError, parse } from './utils'
import { DeltakerHistorikkListe, deltakerHistorikkListeSchema } from './data/historikk'

export const fetchDeltakerHistorikk = (deltakerId: string): AxiosPromise<DeltakerHistorikkListe> => {
    const url = appUrl(
        `/amt-tiltaksarrangor-bff/tiltaksarrangor/deltaker/${deltakerId}/historikk`
    )
    return axiosInstance
        .get(url)
        .then(parse(deltakerHistorikkListeSchema))
        .catch((err) => {
            // Ikke logg 403-feil til sentry
            if ((err as AxiosError).response?.status === 403) {
                throw err
            }

            return logAndThrowError(err, url)
        })
}