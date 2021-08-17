import { Bruker } from '../api/data/bruker';
import { BrukerSokParams } from '../api/data/request-types';
import { sortDateNullsFirst } from '../utils/date-utils';
import { reverseSort } from '../utils';
import { SortDirection, TableHeaderName } from '../component/page/tiltaksoversikt/bruker-oversikt/TabellHeader';

export const mockBrukerSok = (brukere: Bruker[], params: BrukerSokParams): Bruker[] => {
	const filtrerteBrukere = filtrerBrukere(brukere, params);
	const sorterteBrukere = sorterBrukere(filtrerteBrukere, params);

	return paginerBrukere(sorterteBrukere, params);
};

const filtrerBrukere = (brukere: Bruker[], params: BrukerSokParams): Bruker[] => {
	return brukere.filter((bruker) => {
		const { navnFnrSok, tiltakStatuser, tiltakTyper } = params.filter;
		if (navnFnrSok?.trim()) {
			const matcherFornavn = bruker.fornavn.toLowerCase().includes(navnFnrSok || '');
			const matcherEtternavn = bruker.etternavn.toLowerCase().includes(navnFnrSok || '');

			if (!matcherFornavn && !matcherEtternavn) {
				return false;
			}
		}

		if (tiltakStatuser.length > 0) {
			if (!tiltakStatuser.includes(bruker.tiltak.status)) {
				return false;
			}
		}

		if (tiltakTyper.length > 0) {
			if (!tiltakTyper.includes(bruker.tiltak.type)) {
				return false;
			}
		}

		return true;
	});
};

const paginerBrukere = (brukere: Bruker[], params: BrukerSokParams): Bruker[] => {
	// TODO: Implement later
	return brukere;
};

const sorterBrukere = (brukere: Bruker[], params: BrukerSokParams): Bruker[] => {
	if (!params.sort || params.sort.sortDirection === SortDirection.NONE) {
		return brukere;
	}

	const { name, sortDirection } = params.sort;

	const ascendingSort = getAscendingSort(name);
	const sort = sortDirection === SortDirection.ASCENDING ? ascendingSort : reverseSort(ascendingSort);

	return brukere.sort(sort);
};

const getAscendingSort = (name: TableHeaderName): (b1: Bruker, b2: Bruker) => number => {
	return (b1, b2) => {
		switch (name) {
			case TableHeaderName.NAVN:
				return b1.etternavn.localeCompare(b2.etternavn);
			case TableHeaderName.FODSELSDATO:
				return b1.fodselsdato.localeCompare(b2.fodselsdato);
			case TableHeaderName.TILTAK:
				return b1.tiltak.navn.localeCompare(b2.tiltak.navn);
			case TableHeaderName.TILTAKSTYPE:
				return b1.tiltak.type.localeCompare(b2.tiltak.type);
			case TableHeaderName.STATUS:
				return b1.tiltak.status.localeCompare(b2.tiltak.status);
			case TableHeaderName.START:
				return sortDateNullsFirst(b1.tiltak.startdato, b2.tiltak.startdato);
			case TableHeaderName.SLUTT:
				return sortDateNullsFirst(b1.tiltak.sluttdato, b2.tiltak.sluttdato);
			default:
				return 0;
		}
	};
};
