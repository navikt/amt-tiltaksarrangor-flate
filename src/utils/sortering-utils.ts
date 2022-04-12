
export type SorteringRetning = 'ascending' | 'descending'

export interface Sortering {
	orderBy: string,
	direction: SorteringRetning
}

export const DEFAULT_SORTERING_RETNING = 'ascending'

export const finnNesteSortering = (sortKey: string | undefined, prevSort: Sortering | undefined): Sortering | undefined => {
	if (!sortKey) {
		return undefined
	}

	const sammeKolonne = prevSort?.orderBy === sortKey

	if (!sammeKolonne) {
		return { orderBy: sortKey, direction: DEFAULT_SORTERING_RETNING }
	}

	const retning = finnNesteSorteringRetning(prevSort?.direction)

	if (!retning) {
		return undefined
	}

	return { orderBy: sortKey, direction: retning }
}

const finnNesteSorteringRetning = (retning: SorteringRetning | undefined): SorteringRetning | undefined => {
	switch (retning) {
		case 'ascending':
			return 'descending'
		case 'descending':
			return undefined
		default:
			return DEFAULT_SORTERING_RETNING
	}
}

export const sortAlphabeticAsc = (s1: string, s2: string): number => {
	const s1Lower = s1.toLowerCase()
	const s2Lower = s2.toLowerCase()

	if (s1Lower < s2Lower) {
		return -1
	}

	if (s2Lower < s1Lower) {
		return 1
	}

	return 0
}

export function compareAsc<Type>(a: Type, b: Type): number {
	if (a === b) return 0
	if (!a || a < b) return -1
	if (a > b) return 1
	return 0
}
