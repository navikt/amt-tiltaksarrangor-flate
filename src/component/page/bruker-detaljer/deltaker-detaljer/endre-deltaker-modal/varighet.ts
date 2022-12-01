export enum VarighetValg {
	IKKE_VALGT,
	ANNET,
	FIRE_UKER,
	SEKS_UKER,
	ATTE_UKER,
	TOLV_UKER,
	TRE_MANEDER,
	SEKS_MANEDER,
	TOLV_MANEDER,
}

export interface Varighet {
	antall: number
	tidsenhet: 'day' | 'week' | 'month' | 'year'
	navn: string
}

type Varigheter = {
	[valg: number]: Varighet 
}

export const varigheter: Varigheter = {
	[VarighetValg.FIRE_UKER]: { antall: 4, tidsenhet: 'week', navn: '4 uker' },
	[VarighetValg.SEKS_UKER]: { antall: 6, tidsenhet: 'week', navn: '6 uker' },
	[VarighetValg.ATTE_UKER]: { antall: 8, tidsenhet: 'week', navn: '8 uker' },
	[VarighetValg.TOLV_UKER]: { antall: 12, tidsenhet: 'week', navn: '12 uker' },
	[VarighetValg.TRE_MANEDER]: { antall: 3, tidsenhet: 'month', navn: '3 måneder' },
	[VarighetValg.SEKS_MANEDER]: { antall: 6, tidsenhet: 'month', navn: '6 måneder' },
	[VarighetValg.TOLV_MANEDER]: { antall: 12, tidsenhet: 'month', navn: '12 måneder' },
}


export const varighetValgForType = (tiltakstype: string): VarighetValg[] => {
	switch (tiltakstype) {
		case 'ARBFORB': return [
			VarighetValg.TRE_MANEDER,
			VarighetValg.SEKS_MANEDER,
			VarighetValg.TOLV_MANEDER,
		]
		case 'ARBRRHDAG': return [
			VarighetValg.SEKS_UKER,
			VarighetValg.TOLV_UKER,
		]
		case 'AVKLARAG': return [
			VarighetValg.FIRE_UKER,
			VarighetValg.ATTE_UKER,
		]
		case 'INDOPPFAG': return [
			VarighetValg.TRE_MANEDER,
			VarighetValg.SEKS_MANEDER,
		]
		case 'DIGIOPPARB':
		case 'GRUFAGYRKE':
		case 'VASV':
		default: return [
			VarighetValg.FIRE_UKER,
			VarighetValg.SEKS_UKER,
			VarighetValg.ATTE_UKER,
			VarighetValg.TOLV_UKER,
			VarighetValg.TRE_MANEDER,
			VarighetValg.SEKS_MANEDER,
			VarighetValg.TOLV_MANEDER,
		]
	}
}
