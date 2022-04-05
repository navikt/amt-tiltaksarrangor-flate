import { Nullable } from './types/or-nothing'

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
export const lagKommaSeparertBrukerNavn = (fornavn: string, mellomnavn: Nullable<string>, etternavn: string): string => {
	return [
		formaterNavnCasing(etternavn) + ',',
		formaterNavnCasing(fornavn),
		mellomnavn ? formaterNavnCasing(mellomnavn) : undefined
	].filter(navn => !!navn).join(' ')
}

// Lager navn på format: <fornavn> <mellomnavn> <etternavn>
export const lagBrukerNavn = (fornavn: string, mellomnavn: Nullable<string>, etternavn: string): string => {
	return [
		formaterNavnCasing(fornavn),
		mellomnavn ? formaterNavnCasing(mellomnavn) : undefined,
		formaterNavnCasing(etternavn)
	].filter(navn => !!navn).join(' ')
}

export const formaterTelefonnummer = (telefonnummer: Nullable<string>): string => {
	if (!telefonnummer) {
		return ''
	}

	if (telefonnummer.startsWith('+47')) {
		telefonnummer = telefonnummer.replace('+47', '')
	}

	if(telefonnummer.startsWith('47') && telefonnummer.length === 10) {
		telefonnummer = telefonnummer.replace('47', '')
	}

	if(telefonnummer.startsWith('0047') && telefonnummer.length === 12) {
		telefonnummer = telefonnummer.replace('0047', '')
	}

	telefonnummer = telefonnummer.trim()

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
