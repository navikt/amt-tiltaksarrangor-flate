import { Sidetittel } from 'nav-frontend-typografi';
import React from 'react';

import styles from './Header.module.less';

export const Header = () => {
	return (
		<header className={styles.header}>
			<Sidetittel>Tiltaksoversikt</Sidetittel>
		</header>
	);
};
