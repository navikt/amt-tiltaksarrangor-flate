export const lagKommaSeparertBrukerNavn = (fornavn: string, etternavn: string, mellomnavn: string | undefined): string => `${etternavn}, ${fornavn} ${mellomnavn?? '' }`

export const lagBrukerNavn = (fornavn: string, mellomnavn: string | undefined, etternavn: string): string => `${fornavn} ${mellomnavn?? '' } ${etternavn}`

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

export const hentFodselsdato = (fnr: string): string => {
	return fnr.substring(0, 6)
}

export const hentPersonnummer = (fnr: string): string => {
	return fnr.substring(6)
}
