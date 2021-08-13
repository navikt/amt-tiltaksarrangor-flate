
export const lagBrukerNavn = (fornavn: string, etternavn: string): string => {
	const manglerFornavn = fornavn === '';
	const manglerEtternavn = etternavn === '';

	if (manglerFornavn && manglerEtternavn) {
		return '';
	} else if (manglerFornavn || manglerEtternavn) {
		// Skal egentlig ikke skje, men hvis ett av navnene mangler så trenger vi ikke å separere med ","
		return etternavn + fornavn;
	}

	return etternavn + ', ' + fornavn;
}

export const randBetween = (from: number, to: number): number => {
	return Math.round(Math.random() * (to - from) + from);
}
