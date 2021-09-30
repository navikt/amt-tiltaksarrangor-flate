import { InnloggetAnsattDTO, VirksomhetDTO } from '../../api/data/ansatt';
import { randomUuid } from '../utils/faker';

export const mockInnloggetAnsattVirksomheter: VirksomhetDTO[] = [
	{
		id: randomUuid(),
		organisasjonsnavn: 'Muligheter Org',
		organisasjonsnummer: '750863842',
		virksomhetsnavn: 'Muligheter AS',
		virksomhetsnummer: '123456789',
		roller: ["KOORDINATOR", "VEILEDER"]
	},
	{
		id: randomUuid(),
		organisasjonsnavn: 'Tiltak Org',
		organisasjonsnummer: '137603847',
		virksomhetsnavn: 'Tiltak til alle AS',
		virksomhetsnummer: '987654321',
		roller: ["VEILEDER"]
	}
];

export const mockInnloggetAnsatt: InnloggetAnsattDTO = {
	id: randomUuid(),
	fornavn: 'Karoline',
	mellomnavn: undefined,
	etternavn: 'Koordinatorsen',
	virksomheter: mockInnloggetAnsattVirksomheter
};
