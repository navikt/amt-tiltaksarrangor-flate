import dayjs from 'dayjs';
import { OrNothing } from './types/or-nothing';

export const formatDateStr = (dateStr: string) => {
	return dayjs(dateStr).format('DD. MMM YYYY');
}

export const formatDateInputStr = (dateStr: OrNothing<string>) : string => {
	return dateStr ? dayjs(dateStr).format('YYYY-MM-DD') : '';
}

export const stringToDate = (dateStr: string) : Date => dayjs(dateStr, 'YYYY-MM-DD').toDate();

