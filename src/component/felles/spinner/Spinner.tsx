import NavFrontendSpinner from 'nav-frontend-spinner';
import React from 'react';

import styles from './Spinner.module.less';

export const Spinner = () => {
	return (
		<div className={styles.spinner}>
			<NavFrontendSpinner type="XL" />
		</div>
	);
};
