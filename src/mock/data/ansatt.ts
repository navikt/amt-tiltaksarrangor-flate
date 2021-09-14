import { AnsattRolle, InnloggetAnsatt, Virksomhet } from '../../api/data/ansatt';

export const mockInnloggetAnsattVirksomheter: Virksomhet[] = [
	{
		id: 'a474079d-8214-4da0-acf2-906eab146ac3',
		virksomhetsnavn: 'Muligheter AS',
		virksomhetsnummer: '123456789',
		roller: [AnsattRolle.KOORDINATOR, AnsattRolle.VEILEDER]
	},
	{
		id: '1d485ec2-8d98-4b96-8c0a-e6038cfdc57c',
		virksomhetsnavn: 'Tiltak til alle AS',
		virksomhetsnummer: '987654321',
		roller: [AnsattRolle.VEILEDER]
	}
];

export const mockInnloggetAnsatt: InnloggetAnsatt = {
	id: 'dad1f44c-b6d9-4a2e-8690-18c13ab22833',
	fornavn: 'Karoline',
	mellomnavn: undefined,
	etternavn: 'Koordinatorsen',
	virksomheter: mockInnloggetAnsattVirksomheter
};
