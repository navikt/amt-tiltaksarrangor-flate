import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper'
import React from 'react'

export const DemoBanner = () => {
	return (
		<AlertStripeAdvarsel>
			<b>Dette er en demo-tjeneste som er under utvikling</b>
			<br />
			Her eksperimenterer vi med ny funksjonalitet.
			Demoen inneholder ikke ekte data og kan til tider være ustabil.
		</AlertStripeAdvarsel>
	)
}