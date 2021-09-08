import { Bruker } from '../api/data/bruker';
import { BrukerSokParams } from '../api/data/request-types';
import { Kolonnenavn } from '../component/page/tiltakinstans-detaljer/bruker-oversikt/types';
import { reverseSort } from '../utils';
import { sortDateNullsFirst } from '../utils/date-utils';
import { SorteringType } from '../utils/sortering-utils';

const sorterBrukere = (brukere: Bruker[], params: BrukerSokParams): Bruker[] => {
	if (!params.sortering || params.sortering.sorteringType === SorteringType.NONE) {
		return brukere;
	}

	const { kolonnenavn, sorteringType } = params.sortering;

	const ascendingSort = getAscendingSort(kolonnenavn);
	const sort = sorteringType === SorteringType.ASCENDING ? ascendingSort : reverseSort(ascendingSort);

	return brukere.sort(sort);
};

const getAscendingSort = (name: Kolonnenavn): ((b1: Bruker, b2: Bruker) => number) => {
	return (b1, b2) => {
		switch (name) {
			case Kolonnenavn.NAVN:
				return b1.etternavn.localeCompare(b2.etternavn);
			case Kolonnenavn.FODSELSDATO:
				return b1.fodselsdato.localeCompare(b2.fodselsdato);
			case Kolonnenavn.TILTAK:
				return b1.tiltak.navn.localeCompare(b2.tiltak.navn);
			case Kolonnenavn.TILTAKSTYPE:
				return b1.tiltak.type.localeCompare(b2.tiltak.type);
			case Kolonnenavn.STATUS:
				return b1.tiltak.status.localeCompare(b2.tiltak.status);
			case Kolonnenavn.START:
				return sortDateNullsFirst(b1.tiltak.startdato, b2.tiltak.startdato);
			case Kolonnenavn.SLUTT:
				return sortDateNullsFirst(b1.tiltak.sluttdato, b2.tiltak.sluttdato);
			default:
				return 0;
		}
	};
};
