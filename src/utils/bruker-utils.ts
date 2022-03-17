export const lagKommaSeparertBrukerNavn = (fornavn: string, etternavn: string, mellomnavn: string | undefined): string => `${etternavn}, ${fornavn} ${mellomnavn?? '' }`

export const lagBrukerNavn = (fornavn: string, mellomnavn: string | undefined, etternavn: string): string => `${fornavn} ${mellomnavn?? '' } ${etternavn}`

export const formaterTelefonnummer = (telefonnummer: string | null | undefined): string => {
	if (!telefonnummer) {
		return ''
	}

	// Fjern norsk landskode. Noen telefonnumer har ikke mellomrom mellom landskode og nummer,
	// i disse tilfellene så ønsker vi ikke å formatere nummerene
	if (telefonnummer.startsWith('+47 ')) {
		telefonnummer = telefonnummer.replace('+47 ', '')
	}

	if (telefonnummer.length === 8) {
		// Formater telefonnummer til f.eks: 11 22 33 44
		return `${telefonnummer.substring(0, 2)} ${telefonnummer.substring(2, 4)} ${telefonnummer.substring(4, 6)} ${telefonnummer.substring(6, 8)}`
	}

	return telefonnummer
}

export const hentFodselsdato = (fnr: string): string => {
	return fnr.substring(0, 6)
}

export const hentPersonnummer = (fnr: string): string => {
	return fnr.substring(6)
}
