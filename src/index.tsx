import 'dayjs/locale/nb';

import './index.less';

import dayjs from 'dayjs';
import React from 'react';
import ReactDOM from 'react-dom';

import { App } from './App';
import env from './utils/environment';
import { ErrorBoundary } from './component/felles/ErrorBoundry';
import { ErrorPage } from './component/page/error/ErrorPage';

dayjs.locale('nb');

if (env.isDevelopment) {
	require('./mock');
}

ReactDOM.render(
	<React.StrictMode>
		<ErrorBoundary renderOnError={() => <ErrorPage />}>
			<App />
		</ErrorBoundary>
	</React.StrictMode>,
	document.getElementById('root')
);
