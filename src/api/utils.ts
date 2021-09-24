import axios from 'axios';

import { APP_NAME } from '../utils/constants';

export const axiosInstance = axios.create({
	withCredentials: true,
	headers: { 'Nav-Consumer-Id': APP_NAME },
});
