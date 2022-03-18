import axios, { AxiosResponse } from 'axios'
import dayjs from 'dayjs'
import { z, ZodType } from 'zod'

import { APP_NAME } from '../utils/constants'

export const axiosInstance = axios.create({
	withCredentials: true,
	headers: { 'Nav-Consumer-Id': APP_NAME },
})

export const dateSchema = z.preprocess((arg) => {
	if (typeof arg == 'string') return dayjs(arg).toDate()
}, z.date())

export const nullableDateSchema = z.preprocess((arg) => {
	if (!arg) return null
	if (typeof arg == 'string') return dayjs(arg).toDate()
}, z.date().nullable())

export function parse<T>(schema: ZodType<T>): (r: AxiosResponse) => AxiosResponse<T> {
	return (res: AxiosResponse) => ({ ...res, data: schema.parse(res.data) })
}