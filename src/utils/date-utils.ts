import dayjs from 'dayjs';

export const formatDateStr = (dateStr: string) => {
	return dayjs(dateStr).format('DD. MMM YYYY');
}

