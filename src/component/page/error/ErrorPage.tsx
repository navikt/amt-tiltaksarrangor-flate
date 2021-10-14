import React from 'react';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';

export const ErrorPage = () => {
	return (
		<AlertStripeFeil>
			Uff da, her skjedde det noe feil. Prøv å laste inn nettsiden på nytt eller ta kontakt hvis feilen vedvarer.
		</AlertStripeFeil>
	);
}