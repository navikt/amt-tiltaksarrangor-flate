import React from 'react';
import { Sidetittel } from 'nav-frontend-typografi';
import './Header.less';

export const Header = () => {
	return (
		<header className="header">
			<Sidetittel>Tiltaksoversikt</Sidetittel>
		</header>
	);
}
