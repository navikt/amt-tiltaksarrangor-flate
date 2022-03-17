const formaterNavnCasing = (navn: string): string => {
	let nyttNavn = ''
	let nextCharIsUppercase = true

	for (let i = 0; i < navn.length; i++) {
		const curChar = navn.charAt(i)

		if (nextCharIsUppercase) {
			nyttNavn += curChar.toUpperCase()
			nextCharIsUppercase = false
		} else {
			nyttNavn += curChar.toLowerCase()
		}

		if (curChar === '-' || curChar === ' ') {
			nextCharIsUppercase = true
		}
	}

	return nyttNavn
}

// Lager navn på format: <etternavn>, <fornavn> <mellomnavn>
export const lagKommaSeparertBrukerNavn = (fornavn: string, mellomnavn: string | undefined, etternavn: string): string => {
	return [
		formaterNavnCasing(etternavn) + ',',
		formaterNavnCasing(fornavn),
		mellomnavn ? formaterNavnCasing(mellomnavn) : undefined
	].filter(navn => !!navn).join(' ')
}

// Lager navn på format: <fornavn> <mellomnavn> <etternavn>
export const lagBrukerNavn = (fornavn: string, mellomnavn: string | undefined, etternavn: string): string => {
	return [
		formaterNavnCasing(fornavn),
		mellomnavn ? formaterNavnCasing(mellomnavn) : undefined,
		formaterNavnCasing(etternavn)
	].filter(navn => !!navn).join(' ')
}

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
