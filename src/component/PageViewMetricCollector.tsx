import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { logSidevisning } from '../utils/amplitude-utils';

export const PageViewMetricCollector = () => {
	const location = useLocation();

	useEffect(() => {
		logSidevisning(location.pathname);
	}, [location]);

	return null;
};