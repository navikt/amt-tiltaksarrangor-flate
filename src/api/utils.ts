import axios, { AxiosError, AxiosPromise, AxiosResponse } from 'axios';
import { APP_NAME } from '../utils/constants';

export const axiosInstance = axios.create({
	withCredentials: true,
	headers: { 'Nav-Consumer-Id': APP_NAME }
});

export function isAnyLoading(...fetchers: { loading: boolean }[]): boolean {
	return fetchers.some(f => f.loading);
}

export function isAnyLoadingOrNotStarted(...fetchers: { data?: any; error?: any; loading: boolean }[]): boolean {
	return fetchers.some(f => f.loading || (!f.error && !f.data));
}

export function hasAnyFailed(...fetchers: { error?: AxiosError }[]): boolean {
	return fetchers.some(f => f.error);
}

export function ifResponseHasData<T>(callback: (data: T) => void): (res: AxiosResponse<T>) => AxiosPromise<T> {
	return (res: AxiosResponse<T>) => {
		if (res.status < 300 && res.data) {
			callback(res.data);
		}
		return Promise.resolve(res);
	};
}