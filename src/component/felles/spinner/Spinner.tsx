import React from 'react';
import NavFrontendSpinner from 'nav-frontend-spinner';
import './Spinner.less';

export function Spinner() {
	return (
		<div className="app-spinner">
			<NavFrontendSpinner type="XL" />
		</div>
	);
}
