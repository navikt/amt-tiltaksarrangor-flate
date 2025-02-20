import axios, { AxiosResponse, AxiosError } from 'axios'
import dayjs from 'dayjs'
import { z, ZodType } from 'zod'

import { APP_NAME } from '../utils/constants'
import { captureError } from '../utils/sentry-utils'

export const axiosInstance = axios.create({
  withCredentials: true,
  headers: { 'Nav-Consumer-Id': APP_NAME }
})

export const dateSchema = z.preprocess((arg) => {
  if (typeof arg == 'string') return dayjs(arg).toDate()
}, z.date())

export const nullableDateSchema = z.preprocess((arg) => {
  if (!arg) return null
  if (typeof arg == 'string') return dayjs(arg).toDate()
}, z.date().nullable())

export function parse<T>(
  schema: ZodType<T>
): (r: AxiosResponse) => AxiosResponse<T> {
  return (res: AxiosResponse) => ({ ...res, data: schema.parse(res.data) })
}

export function logAndThrowError<E = Error>(err: E, url: string): E {
  console.error(`Request to ${url} failed: ${JSON.stringify(err)}`)

  // Ikke logg 401 feil til sentry
  if ((err as AxiosError).response?.status !== 401) {
    captureError(err)
  }

  throw err
}
