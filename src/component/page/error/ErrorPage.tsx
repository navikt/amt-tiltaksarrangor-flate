import { AlertStripeFeil } from 'nav-frontend-alertstriper'
import React from 'react'

export const ErrorPage = (): React.ReactElement => {
	return (
		<AlertStripeFeil>
			Uff da, her skjedde det noe feil. Prøv å laste inn nettsiden på nytt eller ta kontakt hvis feilen vedvarer.
		</AlertStripeFeil>
	)
}