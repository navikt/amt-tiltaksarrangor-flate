import { Kolonnenavn } from '../component/page/tiltakinstans-detaljer/bruker-oversikt/types';
import { reverseSort } from '../utils';
import { sortDateNullsFirst } from '../utils/date-utils';
import { SorteringType } from '../utils/sortering-utils';
import { TiltakDeltagerDto } from '../api/data/deltager';

export interface BrukerSokParams {
	filter: {
		navnFnrSok: string | undefined;
	};
	sortering?: {
		kolonnenavn: Kolonnenavn;
		sorteringType: SorteringType;
	};
}

const sorterBrukere = (brukere: TiltakDeltagerDto[], params: BrukerSokParams): TiltakDeltagerDto[] => {
	if (!params.sortering || params.sortering.sorteringType === SorteringType.NONE) {
		return brukere;
	}

	const { kolonnenavn, sorteringType } = params.sortering;

	const ascendingSort = getAscendingSort(kolonnenavn);
	const sort = sorteringType === SorteringType.ASCENDING ? ascendingSort : reverseSort(ascendingSort);

	return brukere.sort(sort);
};

const getAscendingSort = (name: Kolonnenavn): ((b1: TiltakDeltagerDto, b2: TiltakDeltagerDto) => number) => {
	return (b1, b2) => {
		switch (name) {
			case Kolonnenavn.NAVN:
				return b1.etternavn.localeCompare(b2.etternavn);
			case Kolonnenavn.FODSELSNUMMER:
				return 0;
			case Kolonnenavn.STATUS:
				return b1.status.localeCompare(b2.status);
			case Kolonnenavn.START:
				return sortDateNullsFirst(b1.startdato, b2.startdato);
			case Kolonnenavn.SLUTT:
				return sortDateNullsFirst(b1.sluttdato, b2.sluttdato);
			default:
				return 0;
		}
	};
};
