export const lagKommaSeparertBrukerNavn = (fornavn: string, etternavn: string): string => `${etternavn}, ${fornavn}`

export const lagBrukerNavn = (fornavn: string, etternavn: string): string => `${fornavn} ${etternavn}`

export const formaterTelefonnummer = (telefonnummer: string | null | undefined): string => {
	const cleanTelefonnummer = telefonnummer?.replace(/ /g, '')

	if (!cleanTelefonnummer) {
		return ''
	}

	// Norskt telefonnummer
	if (cleanTelefonnummer.length === 8) {
		return `${cleanTelefonnummer.substring(0, 3)} ${cleanTelefonnummer.substring(3, 5)} ${cleanTelefonnummer.substring(5, 8)}`
	}

	return telefonnummer as string
}