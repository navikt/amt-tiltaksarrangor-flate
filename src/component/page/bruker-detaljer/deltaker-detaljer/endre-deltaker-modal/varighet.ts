export enum VarighetValg {
  IKKE_VALGT,
  ANNET,
  FIRE_UKER,
  SEKS_UKER,
  ATTE_UKER,
  TRE_MANEDER,
  SEKS_MANEDER,
  TOLV_MANEDER,
}

export interface Varighet {
  antall: number
  tidsenhet: 'day' | 'week' | 'month' | 'year'
}

type Varigheter = {
  [valg in VarighetValg]: Varighet | null
}

export const varigheter: Varigheter = {
	[VarighetValg.IKKE_VALGT]: null,
	[VarighetValg.ANNET]: null,
	[VarighetValg.FIRE_UKER]: { antall: 4, tidsenhet: 'week' },
	[VarighetValg.SEKS_UKER]: { antall: 6, tidsenhet: 'week' },
	[VarighetValg.ATTE_UKER]: { antall: 8, tidsenhet: 'week' },
	[VarighetValg.TRE_MANEDER]: { antall: 3, tidsenhet: 'month' },
	[VarighetValg.SEKS_MANEDER]: { antall: 6, tidsenhet: 'month' },
	[VarighetValg.TOLV_MANEDER]: { antall: 12, tidsenhet: 'month' },
}
