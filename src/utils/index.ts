
export const lagKommaSeparertBrukerNavn = (fornavn: string, etternavn: string): string =>
	`${etternavn}, ${fornavn}`;

export const lagBrukerNavn = (fornavn: string, etternavn: string): string =>
	`${fornavn} ${etternavn}`;

export const reverseSort = <T extends any>(sorter: (t1: T, t2: T) => number) => {
	return (t1: T, t2: T): number => {
		return sorter(t1, t2) * -1;
	}
}