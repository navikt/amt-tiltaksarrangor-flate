import { AnsattRolle, InnloggetAnsatt, Virksomhet } from '../../api/data/ansatt';
import { randomUuid } from '../utils/faker';

export const mockInnloggetAnsattVirksomheter: Virksomhet[] = [
	{
		id: randomUuid(),
		organsisasjonsnavn: 'Muligheter Org',
		organsisasjonsnummer: '750863842',
		virksomhetsnavn: 'Muligheter AS',
		virksomhetsnummer: '123456789',
		roller: [AnsattRolle.KOORDINATOR, AnsattRolle.VEILEDER]
	},
	{
		id: randomUuid(),
		organsisasjonsnavn: 'Tiltak Org',
		organsisasjonsnummer: '137603847',
		virksomhetsnavn: 'Tiltak til alle AS',
		virksomhetsnummer: '987654321',
		roller: [AnsattRolle.VEILEDER]
	}
];

export const mockInnloggetAnsatt: InnloggetAnsatt = {
	id: randomUuid(),
	fornavn: 'Karoline',
	mellomnavn: undefined,
	etternavn: 'Koordinatorsen',
	virksomheter: mockInnloggetAnsattVirksomheter
};
