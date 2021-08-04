import React from 'react';
import { Sidetittel } from 'nav-frontend-typografi';
import './Header.less';

function Header() {
	return (
		<header className="header">
			<Sidetittel>Tiltaksoversikt</Sidetittel>
		</header>
	);
}

export default Header;