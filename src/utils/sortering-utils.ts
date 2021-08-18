export enum SorteringType {
	ASCENDING = 'ascending',
	DESCENDING = 'descending',
	NONE = 'none',
}

export const mapSortDirectionToText = (sorteringType: SorteringType): string => {
	switch (sorteringType) {
		case SorteringType.ASCENDING:
			return 'stigende';
		case SorteringType.DESCENDING:
			return 'synkende';
		default:
			return '';
	}
};

export const mapSortDirectionToClassName = (sorteringType: SorteringType): string => {
	switch (sorteringType) {
		case SorteringType.ASCENDING:
			return 'tabell__th--sortert-asc';
		case SorteringType.DESCENDING:
			return 'tabell__th--sortert-desc';
		default:
			return '';
	}
};

export const finnNesteSorteringType = (sorteringType: SorteringType): SorteringType => {
	switch (sorteringType) {
		case SorteringType.ASCENDING:
			return SorteringType.DESCENDING;
		case SorteringType.DESCENDING:
			return SorteringType.NONE;
		default:
			// This will be the default sort direction
			return SorteringType.ASCENDING;
	}
};
