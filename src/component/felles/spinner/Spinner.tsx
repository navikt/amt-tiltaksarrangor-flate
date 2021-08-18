import React from 'react';
import NavFrontendSpinner from 'nav-frontend-spinner';
import styles from './Spinner.module.less';

export const Spinner = () => {
	return (
		<div className={styles.spinner}>
			<NavFrontendSpinner type="XL" />
		</div>
	);
};
